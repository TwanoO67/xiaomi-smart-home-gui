#!/bin/bash

echo "Pour marcher vous devez lancer ce script depuis la home du projet avec ./bin/docker-rebuild"
docker rmi twanoo/mihome
docker build -t twanoo/mihome .
echo "Le docker est recréé, peut-etre faut-il le pusher? ;)"
