#!/bin/bash

echo "

██████╗  ██████╗ ████████╗███████╗██╗██╗     ███████╗███████╗
██╔══██╗██╔═══██╗╚══██╔══╝██╔════╝██║██║     ██╔════╝██╔════╝
██║  ██║██║   ██║   ██║   █████╗  ██║██║     █████╗  ███████╗
██║  ██║██║   ██║   ██║   ██╔══╝  ██║██║     ██╔══╝  ╚════██║
██████╔╝╚██████╔╝   ██║   ██║     ██║███████╗███████╗███████║
╚═════╝  ╚═════╝    ╚═╝   ╚═╝     ╚═╝╚══════╝╚══════╝╚══════╝
                                                            
"




echo "Installing packages..."
sudo pacman -S --noconfirm --needed  $(awk '!/^#|^$/ {print $1}' PKGS)

#USER=$(grep home /etc/passwd|cut -d: -f1)

echo "compile"
make
echo "stow test"
stow . -t ~/.config
# AUR

#mkdir -p ~/AUR
#cd ~/AUR
# ags
#git clone https://aur.archlinux.org/aylurs-gtk-shell-git.git
#makepkg -s


# swww
#git clone https://aur.archlinux.org/swww.git
#chown -R $USER swww
#cd swww

#sudo -u $USER $SHELL -c 'makepkg -s'
#pacman -U "$(find . -type f -name "*tar.zst")" --noconfirm --needed
