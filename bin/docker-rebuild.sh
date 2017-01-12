#!/bin/bash

echo "Pour marcher vous devez lancer ce script depuis la home du projet avec ./bin/docker-rebuild"
echo "suppression des containers"
docker stop mihome
docker rm mihome
echo "suppression des images"
docker rmi twanoo/mihome
echo "build de l'image"
docker build -t twanoo/mihome .
echo "Le docker est recréé, peut-etre faut-il le pusher? ;)"
