#!/bin/bash

PACKAGES="docker nvidia-container-toolkit"

sudo pacman -S --noconfirm --needed $PACKAGES

sudo nvidia-ctk runtime configure --runtime=docker
sudo systemctl enable docker.socket
