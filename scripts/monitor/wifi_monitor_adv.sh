#!/bin/bash

LOGFILE="$HOME/wifi_monitor_$(date +%Y%m%d_%H%M%S).log"
INTERFACE="wlp5s0"  # Replace if your interface name differs

echo "Monitoring Wi-Fi signal + driver logs on $INTERFACE"
echo "Logging to: $LOGFILE"
echo "Press Ctrl+C to stop."

# Function to log signal quality
log_signal() {
    local timestamp=$(date '+%Y-%m-%d %H:%M:%S')
    local signal_info
    signal_info=$(nmcli -t -f active,ssid,signal dev wifi | grep '^yes')
    
    if [ -n "$signal_info" ]; then
        local ssid=$(echo "$signal_info" | cut -d: -f2)
        local signal=$(echo "$signal_info" | cut -d: -f3)
        echo "[$timestamp] SIGNAL: SSID=\"$ssid\" Signal Strength=${signal}%" | tee -a "$LOGFILE"
    else
        echo "[$timestamp] SIGNAL: Not connected or unable to retrieve signal info" | tee -a "$LOGFILE"
    fi
}

# Start logging kernel and NM messages in background
journalctl -f -o short-iso -k | \
grep --line-buffered -Ei "wl|$INTERFACE|disconnect|deauth|tx_power|error|NetworkManager.*(down|up|state change|disconnec)" | \
while read -r line; do
    timestamp=$(date '+%Y-%m-%d %H:%M:%S')
    echo "[$timestamp] $line" | tee -a "$LOGFILE"
done &

JOURNAL_PID=$!

# Poll signal quality every 5 seconds
while true; do
    log_signal
    sleep 5
done

# Cleanup
trap "kill $JOURNAL_PID; exit" INT TERM
