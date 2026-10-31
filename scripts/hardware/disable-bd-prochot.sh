#!/bin/bash

set -euxo pipefail

MSR_REG="0x1FC"
EXPECTED_VALUE_LOCKED="24005d"
TARGET_VALUE_UNLOCKED="24005c"

CURRENT_VALUE=$(/usr/bin/rdmsr "$MSR_REG" 2>/dev/null)

if [ "$CURRENT_VALUE" = "$EXPECTED_VALUE_LOCKED" ]; then
    echo "CPU lock flag set, unsetting..."
    /usr/bin/wrmsr "$MSR_REG" "0x$TARGET_VALUE_UNLOCKED"
elif [ "$CURRENT_VALUE" = "$TARGET_VALUE_UNLOCKED" ]; then
    echo "CPU lock flag in already open state"
else
    echo "Warning: registry value is unexpected ($CURRENT_VALUE)"
fi
