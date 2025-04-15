#!/bin/bash

LOGFILE="$HOME/wifi_monitor_$(date +%Y%m%d_%H%M%S).log"

echo "Monitoring Wi-Fi drops and driver issues..."
echo "Logging to: $LOGFILE"
echo "Press Ctrl+C to stop."

# Use journalctl follow mode and grep relevant stuff
journalctl -f -o short-iso -k | \
grep --line-buffered -Ei 'wl|wlp5s0|disconnect|deauth|tx_power|error|NetworkManager.*(down|up|state change|disconnec)' | \
while read -r line; do
    timestamp=$(date '+%Y-%m-%d %H:%M:%S')
    echo "[$timestamp] $line" | tee -a "$LOGFILE"
done