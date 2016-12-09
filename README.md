# Xiaomi Smart Home - GUI

construction du docker
`docker build -t myuser/containername`

lancement du logger
`docker run -v /mydiskdata/store:/mihome/db -d --net host --name xiaomi_logger myuser/containername`

## Principe de fonctionnement

1) il faut mettre sa "Xiaomi Smart Home" en mode LAN, ainsi elle enverra les push Zigbee, en broadcast sur le réseau local
2) le logger en nodejs capture les trames sur le réseau local (fork de homebridge-aquara) et les insères dans une base SQLite (un seul fichier simple a backupé)
3) L'API donne accés depuis un service REST en php au contenu de la base SQLite (fork de php_crud_api)
3) Le GUI en angular2 (fork de ng2-admin-lte) offre une visualisation de ces données (WAF friendly)
