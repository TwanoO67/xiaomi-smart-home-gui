# Xiaomi Smart Home - GUI

construction du docker

```docker build -t myuser/containername```


lancement du logger

```docker run -v /mydiskdata/store:/mihome/db -d --net host --name xiaomi_logger myuser/containername```


## Principe de fonctionnement

1) il faut mettre sa "Xiaomi Smart Home" en mode LAN, ainsi elle enverra les push Zigbee, en broadcast sur le réseau local
2) le logger en nodejs capture les trames sur le réseau local et les insères dans une base SQLite (un seul fichier simple a backupé)
3) L'API donne accés depuis un service REST en php au contenu de la base SQLite
4) Le GUI en angular2 (fork de ng2-admin-lte) offre une visualisation de ces données (WAF friendly)

## Source
Logger: fork de [homebridge-aquara](https://github.com/snOOrz/homebridge-aqara)
API: fork de [mevdschee/php-crud-api](https://github.com/mevdschee/php-crud-api) et de [alexpls/cart_rest_example](https://github.com/alexpls/cart_rest_example)
GUI: fork de [TwanoO67/ng2-admin-lte](https://github.com/TwanoO67/ng2-admin-lte)
Commande xiaomi https://louiszl.gitbooks.io/lumi-gateway-local-api/content/plug.html (CN)

## Outils de debug

Pour verifier le contenu de la DB SQLite, vous pouvez utiliser: http://sqlitebrowser.org/
