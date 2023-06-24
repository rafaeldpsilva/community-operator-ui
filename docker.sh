#!/bin/bash

docker rmi rdpds/tiocps-community-operator-ui:latest
docker build -t rdpds/tiocps-community-operator-ui .
id=$(docker images | grep 'rdpds/tiocps-community*' | head -1 | awk '{print $3}')
echo "ID: $id"
docker tag $id rdpds/tiocps-community-operator-ui:latest
docker push --all-tags rdpds/tiocps-community-operator-ui