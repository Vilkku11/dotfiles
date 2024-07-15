sudo cp /etc/pacman.d/mirrorlist /etc/pacman.d/mirrorlist.backup

sudo reflector --latest 20 --age 12 --protocol https --sort rate --verbose --save /etc/pacman.d/mirrorlist