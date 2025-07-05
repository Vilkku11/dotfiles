#!/bin/bash

PACKAGES="cups system-config-printer ghostscript"

sudo pacman -S --noconfirm --needed $PACKAGES

sudo systemctl start cups