#!/bin/bash

#Lancement de l'API
node api/api.js &

#Lancement du logger
node api/logger.js
