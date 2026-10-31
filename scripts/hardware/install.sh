#!/bin/bash

set -euxo pipefail

# -----------------------------------------------------------------------------
# Script to install and configure systemctl service to disable
# specific BD PROCHOT flag.
# -----------------------------------------------------------------------------

sudo pacman -S --needed --noconfirm msr-tools

SCRIPT_DIR="$(dirname "$(readlink -f "$0")")"

sudo cp "$SCRIPT_DIR/disable-bd-prochot.sh" /usr/local/bin/disable-bd-prochot.sh
sudo chmod +x /usr/local/bin/disable-bd-prochot.sh

sudo cp "$SCRIPT_DIR/no-battery-fix.service" /etc/systemd/system/no-battery-fix.service


sudo systemctl daemon-reload
sudo systemctl enable --now no-battery-fix.service
