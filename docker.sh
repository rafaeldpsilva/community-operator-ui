#!/bin/bash
# Input version
input_version=$(docker images | grep 'v0*' | awk '{print $2}')

echo "Original version: $input_version"
input_version=$(echo "$input_version" | tr -d '\n')
input_version=${input_version#v}

# Extract major and minor version numbers
major_version=$(echo "$input_version" | cut -d. -f1)
minor_version=$(echo "$input_version" | cut -d. -f2)

# Convert minor version to a floating-point number
minor_version_float=$(echo "scale=1; $minor_version + 1" | bc)

# Format the new version number
new_version="v${major_version}.${minor_version_float}"

echo "Updated version: $new_version"

docker rmi rdpds/tiocps-community-operator-ui:latest
docker rmi rdpds/tiocps-community-operator-ui:v$input_version
docker build -t rdpds/tiocps-community-operator-ui .
#id=$(docker images | grep 'rdpds/tiocps-community*' | head -1 | awk '{print $3}')
#echo "ID: $id"
#docker tag $id rdpds/tiocps-community-operator-ui:$new_version
#docker tag $id rdpds/tiocps-community-operator-ui:latest
#docker push --all-tags rdpds/tiocps-community-operator-ui