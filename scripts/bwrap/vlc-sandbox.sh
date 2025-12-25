#!/bin/bash


file="$1"

if [ -z "$file" ]; then
    echo "Usage: $0 <file or directory>"
    exit 1
fi

FILE=$(realpath "$file")
FILEDIR=$(dirname "$file")

ARGS=(
  --unshare-pid
  --unshare-ipc
  --unshare-net
  --new-session
  --dev-bind /dev /dev
  --dev-bind /dev/snd /dev/snd
  --dev-bind /dev/dri /dev/dri
  --bind /dev/shm /dev/shm
  --bind "$XDG_RUNTIME_DIR" "$XDG_RUNTIME_DIR"
  --setenv XDG_RUNTIME_DIR "$XDG_RUNTIME_DIR"
  --setenv DBUS_SESSION_BUS_ADDRESS "$DBUS_SESSION_BUS_ADDRESS"
  --setenv WAYLAND_DISPLAY "$WAYLAND_DISPLAY"
  --setenv DISPLAY "$DISPLAY"
  --bind "$HOME/.config" "$HOME/.config"
  --bind "$HOME/.local/share" "$HOME/.local/share"
  --ro-bind /usr /usr
  --ro-bind /bin /bin
  --ro-bind /lib /lib
  --ro-bind /lib64 /lib64
  --ro-bind /etc /etc
  --tmpfs /tmp
  --bind "$FILE" "$FILE"
  --setenv XDG_CURRENT_DESKTOP "$XDG_CURRENT_DESKTOP"
  --setenv QT_QPA_PLATFORMTHEME "$QT_QPA_PLATFORMTHEME"
)

#for dev in /dev/nvidia0 /dev/nvidiactl /dev/nvidia-uvm /dev/nvidia-uvm-tools; do
#  [ -e "$dev" ] && ARGS+=( --dev-bind "$dev" "$dev" )
#done

bwrap "${ARGS[@]}" /usr/bin/vlc --avcodec-hw none "$FILE"


#bwrap \
#--unshare-all \
#--new-session \
#--dev /dev \
#--dev-bind /dev/snd /dev/snd \
#--dev-bind /dev/dri /dev/dri \
#--dev-bind /dev/nvidia0 /dev/nvidia0 \
#--dev-bind /dev/nvidiactl /dev/nvidiactl \
#--dev-bind /dev/nvidia-uvm /dev/nvidia-uvm \
#--dev-bind /dev/nvidia-uvm-tools /dev/nvidia-uvm-tools \
#--bind /dev/shm /dev/shm \
#--ro-bind "$XDG_RUNTIME_DIR" "$XDG_RUNTIME_DIR" \
#--bind "$HOME/.config/vlc" "$HOME/.config/vlc" \
#--setenv XDG_RUNTIME_DIR "$XDG_RUNTIME_DIR" \
#--setenv DISPLAY "$DISPLAY" \
#--setenv QT_QPA_PLATFORMTHEME "qt6ct" \
#--setenv XDG_CURRENT_DESKTOP "$XDG_CURRENT_DESKTOP" \
#--tmpfs /tmp \
#--ro-bind /usr /usr \
#--ro-bind /bin /bin \
#--ro-bind /lib /lib \
#--ro-bind /lib64 /lib64 \
#--ro-bind /etc /etc \
#--ro-bind "$filedir" "$filedir" \
#/usr/bin/vlc "$file"
