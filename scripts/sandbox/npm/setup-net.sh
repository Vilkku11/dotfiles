#!/bin/bash
set -e

NS_NAME="npmnet"
VETH_HOST="npm-veth1"
VETH_NS="npm-veth0"

SUBNET="10.10.0.0/24"
HOST_IP="10.10.0.1/24"
NS_IP="10.10.0.2/24"

echo "[+] Checking namespace..."
if sudo up netns list | grep -q "^${NS_NAME}\b"; then
    echo "  Namespace already exists."
    exit 1
fi

echo "  Creating namespace ${NS_NAME}"
sudo ip netns add "${NS_NAME}"

echo "[+] Checking veth pair..."
if ip link show "${VETH_HOST}" >/dev/null 2>&1; then
    echo "  veth pair already exists"
    exit 1
fi

echo "Creating veth pair"
sudo ip link add "${VETH_NS}" type veth peer name "${VETH_HOST}"
sudo ip link set "${VETH_NS}" netns "${NS_NAME}"


echo "[+] Configuring host side..."
sudo ip addr show "${VETH_HOST}" | grep -q "${HOST_IP}" || \
    sudo ip addr add "${HOST_IP}" dev "${VETH_HOST}"
sudo ip link set "${VETH_HOST}" up

echo "[+] Configuring namespace side..."
sudo ip netns exec "${NS_NAME}" ip addr show "${VETH_NS}" | grep -q "${NS_IP}" || \
    sudo ip netns exec "${NS_NAME}" ip addr add "${NS_IP}" dev "${VETH_NS}"
sudo ip netns exec "${NS_NAME}" ip link set "${VETH_NS}" up
sudo ip netns exec "${NS_NAME}" ip link set lo up


echo "[+] Setting default route..."
if ! sudo ip netns exec "${NS_NAME}" ip route | grep -q "default via 10.10.0.1"; then
    sudo ip netns exec "${NS_NAME}" ip route add default via 10.10.0.1 || true
fi

echo "[+] Ensuring DNS..."
sudo mkdir -p /etc/netns/${NS_NAME}
sudo cp /etc/resolv.conf /etc/netns/${NS_NAME}/resolv.conf

# -------------------------------
# NAT + Forwarding via UFW
# -------------------------------
# detect default outbound interface
DEFAULT_IF=$(ip route show default | awk '{print $5}')
echo "[+] Detected default interface: $DEFAULT_IF"

# add MASQUERADE rule if not exists
if ! sudo iptables -t nat -C POSTROUTING -s ${SUBNET} -o "$DEFAULT_IF" -j MASQUERADE 2>/dev/null; then
    echo "[+] Adding MASQUERADE NAT for namespace subnet via $DEFAULT_IF"
    sudo iptables -t nat -A POSTROUTING -s ${SUBNET} -o "$DEFAULT_IF" -j MASQUERADE
else
    echo "    NAT rule already exists."
fi

# allow forwarding for namespace subnet if not already
if ! sudo iptables -C FORWARD -s ${SUBNET} -j ACCEPT 2>/dev/null; then
    echo "[+] Allowing FORWARD from namespace subnet"
    sudo iptables -A FORWARD -s ${SUBNET} -j ACCEPT
fi
if ! sudo iptables -C FORWARD -d ${SUBNET} -j ACCEPT 2>/dev/null; then
    echo "[+] Allowing FORWARD to namespace subnet"
    sudo iptables -A FORWARD -d ${SUBNET} -j ACCEPT
fi



echo "[+] Enabling IP forwarding..."
sudo sysctl -w net.ipv4.ip_forward=1 >/dev/null

echo "-------------------------------------------------"
echo "[✔] Namespace ready: ${NS_NAME}"
sudo ip netns list