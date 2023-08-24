#!/bin/sh

chosen=$(printf "Power Off\nRestart\nLog Out" | rofi -dmenu -i)

case "$chosen" in
    "Power Off") poweroff ;;
    "Restart") reboot ;;
    "Log Out") loginctl terminate-user $USER ;;
    *) exit 1 ;;
esac