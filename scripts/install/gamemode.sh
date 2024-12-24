#!/bin/bash

PACKAGES="gamemode lib32-gamemode"
CURRENT_USER=$USER

sudo pacman -S --noconfirm --needed $PACKAGES

sudo usermod -aG gamemode $CURRENT_USER