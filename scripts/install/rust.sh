#!/bin/bash

PACKAGES="rustup"

sudo pacman -S --noconfirm --needed $PACKAGES

rustup default stable