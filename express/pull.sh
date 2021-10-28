#!/bin/bash
SCRIPT=$(readlink -f "$0")
SCRIPTPATH=$(dirname "$SCRIPT")

git pull
docker run --rm -v $SCRIPTPATH:/app -w /app node:lts yarn install --network-timeout 100000

if [ -f "${SCRIPTPATH}/pull_after.sh" ]; then
    bash ${SCRIPTPATH}/pull_after.sh
fi