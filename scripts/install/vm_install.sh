#!/bin/bash

PACKAGES="qemu-full virt-manager virt-viewer dnsmasq vde2 bridge-utils"

sudo pacman -S --noconfirm --needed $PACKAGES

sudo systemctl enable libvirtd.service
sudo usermod -aG libvirt $USER

echo "#firewall_backend = "nftables" -> firewall_backend = "iptables" in /etc/libvirt/network.conf"
sudo sed -i 's/#firewall_backend = "nftables"/firewall_backend = "iptables"/' /etc/libvirt/network.conf

echo "Done! Reboot or log back in!!!"