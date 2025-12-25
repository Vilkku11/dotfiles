#!/bin/bash
set -e

NS_NAME="npmnet"
NETNS_PATH="/var/run/netns/$NS_NAME"

PROJECT_DIR=$PWD