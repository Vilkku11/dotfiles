PACKAGES="docker nvidia-container-toolkit"

sudo pacman -S --noconfirm --needed $PACKAGES

sudo systemctl enable docker.socket