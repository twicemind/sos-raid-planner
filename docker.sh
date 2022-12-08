#!/bin/bash

docker stop raidar || :
docker rm raidar || :

docker run --name raidar \
--env TZ="Europe/Berlin" \
-v /Users/herfortt/git/private/twicemind/sos-raid-planner/config.json:/app/config.json \
-v /etc/localtime:/etc/localtime:ro \
--restart=unless-stopped \
-d raidar:alpine-1.0.0