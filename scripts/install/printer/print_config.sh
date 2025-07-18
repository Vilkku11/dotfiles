#!/bin/bash

PACKAGES="cups system-config-printer ghostscript python-pyqt5"

sudo pacman -S --noconfirm --needed $PACKAGES

sudo systemctl start cups