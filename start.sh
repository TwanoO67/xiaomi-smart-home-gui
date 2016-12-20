#!/bin/bash

#Lancement de l'API
node api/index.js &

#Lancement du logger
node logger/index.js
