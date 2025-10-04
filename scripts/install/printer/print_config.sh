#!/bin/bash

PACKAGES="cups system-config-printer ghostscript python-pyqt5 gscan2pdf djvulibre pdftk"

sudo pacman -S --noconfirm --needed $PACKAGES

sudo systemctl start cups