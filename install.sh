#! /bin/sh

echo "

██████╗  ██████╗ ████████╗███████╗██╗██╗     ███████╗███████╗
██╔══██╗██╔═══██╗╚══██╔══╝██╔════╝██║██║     ██╔════╝██╔════╝
██║  ██║██║   ██║   ██║   █████╗  ██║██║     █████╗  ███████╗
██║  ██║██║   ██║   ██║   ██╔══╝  ██║██║     ██╔══╝  ╚════██║
██████╔╝╚██████╔╝   ██║   ██║     ██║███████╗███████╗███████║
╚═════╝  ╚═════╝    ╚═╝   ╚═╝     ╚═╝╚══════╝╚══════╝╚══════╝
                                                            
"


if [ ! -d "/home/$(logname)/.local/bin" ]
then
    mkdir -p /home/$(logname)/.local/bin
fi


echo "Installing packages..."
sudo pacman -S --noconfirm --needed  $(awk '!/^#|^$/ {print $1}' PKGS)

# Works for now
USER=$(grep home /etc/passwd|cut -d: -f1)


echo "stow test"
stow . -t ~/.config
# AUR
#git clone https://aur.archlinux.org/swww.git
#chown -R $USER swww
#cd swww

#sudo -u $USER $SHELL -c 'makepkg -s'
#pacman -U "$(find . -type f -name "*tar.zst")" --noconfirm --needed
