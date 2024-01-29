#!/bin/bash

if [ $# -eq 0 ]; then
    echo "Usage: $0 <argument>"
    exit 1
fi

version=$1
echo "Building Community Operator UI -> $version"

docker rmi rdpds/tiocps-community-operator-ui:latest
docker build -t rdpds/tiocps-community-operator-ui .
docker tag rdpds/tiocps-community-operator-ui rdpds/tiocps-community-operator-ui:latest
docker tag rdpds/tiocps-community-operator-ui rdpds/tiocps-community-operator-ui:$version
docker push --all-tags rdpds/tiocps-community-operator-ui

