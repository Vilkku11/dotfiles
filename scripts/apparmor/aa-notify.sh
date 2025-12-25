#!/bin/bash
# -----------------------------------------------------------------------------
# Script to configure AppArmor desktop notifications (aa-notify) on Arch Linux
# Assumes AppArmor is already installed and enabled
# -----------------------------------------------------------------------------

PACKAGES="audit python-notify2 tk python-psutil"
USER_NAME="${SUDO_USER:-$USER}"
AUTOSTART_DIR="/home/${USER_NAME}/.config/autostart"
DESKTOP_FILE="${AUTOSTART_DIR}/apparmor-notify.desktop"
AUDIT_TMPFILES_CONF="/etc/tmpfiles.d/audit.conf"

echo "Starting AppArmor notification setup for user: $USER_NAME"

# -------------------------------
# Install dependencies, enable auditd and configure groups
# -------------------------------
sudo pacman -S --needed --noconfirm $PACKAGES

echo "Enabling and starting auditd service..."
sudo systemctl enable auditd

echo "Adding user '$USER_NAME' to 'audit' group..."
sudo groupadd -f -r audit
sudo gpasswd -a "$USER_NAME" audit

# -------------------------------
# Configure audit log access
# -------------------------------
echo "Configuring /var/log/audit permissions..."

sudo sed -i '/^log_group/ d' /etc/audit/auditd.conf
echo "log_group = audit" | sudo tee -a /etc/audit/auditd.conf > /dev/null

if [ -f "$AUDIT_TMPFILES_CONF" ]; then
    sudo cp "$AUDIT_TMPFILES_CONF" "${AUDIT_TMPFILES_CONF}.bak"
fi

sudo tee -a "$AUDIT_TMPFILES_CONF" > /dev/null <<'EOF'
z /var/log/audit 750 root audit - -
EOF

# -------------------------------
# Create desktop autostart entry
# -------------------------------
echo "Creating aa-notify autostart desktop entry..."

mkdir -p "$AUTOSTART_DIR"

cat > "$DESKTOP_FILE" << EOF
[Desktop Entry]
Type=Application
Name=AppArmor Notify
Comment=Receive on screen notifications of AppArmor denials
TryExec=aa-notify
Exec=aa-notify -p -s 1 -w 60 -f /var/log/audit/audit.log
StartupNotify=false
NoDisplay=true
EOF