#!/bin/bash

docker build -t rdpds/caravels-community-ui .
docker tag rdpds/caravels-community-ui rdpds/caravels-community-ui:latest
docker tag rdpds/caravels-community-ui rdpds/caravels-community-ui:v0.0.16
docker push --all-tags rdpds/caravels-community-ui

