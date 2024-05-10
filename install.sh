#!/bin/bash

echo "

██████╗  ██████╗ ████████╗███████╗██╗██╗     ███████╗███████╗
██╔══██╗██╔═══██╗╚══██╔══╝██╔════╝██║██║     ██╔════╝██╔════╝
██║  ██║██║   ██║   ██║   █████╗  ██║██║     █████╗  ███████╗
██║  ██║██║   ██║   ██║   ██╔══╝  ██║██║     ██╔══╝  ╚════██║
██████╔╝╚██████╔╝   ██║   ██║     ██║███████╗███████╗███████║
╚═════╝  ╚═════╝    ╚═╝   ╚═╝     ╚═╝╚══════╝╚══════╝╚══════╝
                                                            
"

symlink_folder() {
    local src="$1"
    local target="$2"

    if [ ! -d "$src" ]; then
        echo "Source dir '$src' not existing"
        return 1
    fi

    if [ ! -d "$target" ]; then
        echo "Target dir '$target' not existing"
        return 1
    fi

    for file in "$src"/*; do

        if [ -d "$file" ]; then
            echo "Symlinking $(realpath "$file") -> $target/$(basename "$file")" 
            ln -sfn "$(realpath "$file")" "$target/$(basename "$file")"
        elif [ -f "$file" ]; then
            echo "Symlinking $(realpath "$file") -> $target/$(basename "$file")"        
            ln -sf "$(realpath "$file")" "$target/$(basename "$file")"
        fi

    done
}


symlink_folder "config" "$HOME/.config"
ln -sf "$(realpath .zshrc)" "$HOME/.zshrc"

echo "Installing packages..."
sudo pacman -S --noconfirm --needed  $(awk '!/^#|^$/ {print $1}' PKGS)

#USER=$(grep home /etc/passwd|cut -d: -f1)

echo "compile"
make
#echo "stow test"
#stow . -t ~/.config
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