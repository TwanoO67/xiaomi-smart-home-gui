# Xiaomi Smart Home - GUI

![Timeline](https://raw.githubusercontent.com/TwanoO67/xiaomi-smart-home-gui/master/docs/timeline.png)

## Lancer le projet avec Docker

Vous pouvez lancer l'application entierement via docker, pour cela :

Remplacer mon_disk/mon_dossier par le dossier ou vous souhaitez sauvegarder votre base de donnée

**./bin/docker-start.sh**

L'appli est ensuite disponible sur le port 3000 et créera automatiquement une base mongodb dans un sous-dossier du projet
(modifier le script docker-start.sh si vous souhaitez modifier son emplacement)

## Lancement du projet sans Docker

### Prérequis
Vous devez avoir node > 5 et une base mongoDb disponible sur le port 27017 (sinon changer cela dans le fichier api/mongo_connexion.js)

### Installer les dependances
``` ./install.sh ```

### Lancer le serveur
``` ./start.sh ```


## Developpement

Si vous souhaitez modifier la gui
modifier le contenu du dossier gui/src
puis tester vos modifier avec le serveur de Developpement
``` npm start ```
ou compilez avec
```npm run build```

## Principe de fonctionnement

1) il faut mettre sa box "Xiaomi Smart Home" en mode LAN, ainsi elle enverra les push Zigbee en broadcast sur le réseau local
(voir tuto ici en chinois, a traduire http://bbs.xiaomi.cn/t-13198850 )

2) le logger en nodejs capture les trames sur le réseau local et les insères dans une base mongodb

3) L'API donne accés depuis un service REST au contenu de la base mongodb

4) Le GUI en angular2  offre une visualisation de ces données

## Observation
La detection de mouvement est trés rapide (ordre de la seconde)
par contre la detection de la fin du mouvement ne génére un evenement "report" qu'au bout d'1min

Le clic et double-clic sur un bouton sont rapide (ordre de la seconde)

## Source
Logger: fork de [homebridge-aquara](https://github.com/snOOrz/homebridge-aqara)
API: basé sur [koaRestMongoose](https://github.com/t3chnoboy/koa-mongo-rest)
Serveur Static: basé sur [koa-static](https://github.com/koajs/static)
GUI: fork de [TwanoO67/ng2-admin-lte](https://github.com/TwanoO67/ng2-admin-lte)
Commande xiaomi https://louiszl.gitbooks.io/lumi-gateway-local-api/content/plug.html (CN)

## Outils de debug

Pour verifier le contenu de la base mongo, vous pouvez utiliser: [mongo-express](https://github.com/mongo-express/mongo-express)

## Support on Beerpay
Hey dude! Help me out for a couple of :beers:!

[![Beerpay](https://beerpay.io/TwanoO67/xiaomi-smart-home-gui/badge.svg?style=beer-square)](https://beerpay.io/TwanoO67/xiaomi-smart-home-gui)  [![Beerpay](https://beerpay.io/TwanoO67/xiaomi-smart-home-gui/make-wish.svg?style=flat-square)](https://beerpay.io/TwanoO67/xiaomi-smart-home-gui?focus=wish)