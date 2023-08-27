#!/bin/sh

theme_dir="$HOME/.config/rofi/config.rasi"



chosen=$(printf "Power Off\nRestart\nLog Out" | rofi -dmenu -p "Helloo ${USER}" -i -theme ${theme_dir})

case "$chosen" in
    "Power Off") poweroff ;;
    "Restart") reboot ;;
    "Log Out") loginctl terminate-user $USER ;;
    *) exit 1 ;;
esac