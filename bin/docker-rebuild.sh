#!/bin/bash
cd ..
pwd
docker rmi twanoo/mihome
docker built -t twanoo/mihome .
echo "Le docker est recréé, peut-etre faut-il le pusher? ;)"
