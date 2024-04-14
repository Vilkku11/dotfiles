#!/bin/bash

UTC_OFFSET=$((3*3600))
DAY=$((24*3600))

while true; do
    echo $(date "+%d.%m.%Y")
    sleep_time=$((DAY - ($(date '+%s') + UTC_OFFSET) % DAY))
    sleep $sleep_time
done