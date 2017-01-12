#!/bin/bash
DIR="$(pwd)"
echo "stopping containers"
docker stop mihome
docker stop mongomihome
echo "removing containers"
docker rm mihome
docker rm mongomihome
echo "launching new containers"
docker run -v $DIR/mongodb:/data/db -d -p 27017:27017 --name mongomihome mongo
#docker run -v $DIR/mongodb:/data/db -d --net host --name mihome twanoo/mihome
docker run -d --net host --name mihome -p 3000:3000 twanoo/mihome
