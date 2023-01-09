#!/bin/bash

docker stop raidar || :
docker rm raidar || :

docker run --name raidar \
--env TZ="Europe/Berlin" \
-v %your_config_location%/config.js:/app/src/config.js \
-v %your_config_location%/config.deploy.js:/app/src/config.deploy.js \
-v /etc/localtime:/etc/localtime:ro \
--restart=unless-stopped \
-d raraesh/raidar:alpine-latest