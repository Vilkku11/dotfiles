#!/bin/bash

CONFIG_PATH=".config/kitty/kitty.conf"
current_opacity=$(grep "background_opacity" $CONFIG_PATH | awk '{print $2}')

if [ "$current_opacity" = "1" ]; then
    new_opacity="0.5"
else
    new_opacity="1"
fi

sed -i "s/background_opacity $current_opacity/background_opacity $new_opacity/" $CONFIG_PATH
kill -SIGUSR1 $(pgrep kitty)