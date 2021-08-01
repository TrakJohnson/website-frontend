# Frontend

## Installer les compostants nécessaires

Installer nodejs (https://nodejs.org/en/download/)

Installer npm en allant dans le dossier website-frontend puis en terminal `npm install`.

Installer les packages suivants avec la commande : npm install [nom du package] (--force si npm est rétissent) :
* @angular/cli
* bootstrap
* @ng-bootstrap/ng-bootstrap
* carousel
* (peut-être angular-responsive-carousel mais pas certain)

## Lancer le frontend sur une machine

En terminal taper `ng serve` avec comme argument `--open` por l'ouvrir directement sur le navigateur par défaut, sinon il sera accessible à l'adresse : `localhost:4200`.

## Lancer le frontend sur le réseau local

Pour pouvoir ouvrir le même frontend sur plusieurs PC :
1) S'assurer que les PC sont connectés au même réseau local
2) Sur le PC serveur ouvrir le port 4200 (sous windows : pare-feu -> paramètres avancés -> règles entrantes -> nouvelle règle, sous linux : sudo iptables -I INPUT -p tcp --dport 4000 --syn -j ACCEPT)
3) Sur le PC serveur en terminal, récupérer l'adresse locale avec `ipconfig` : l'adresse IPv4 est souvent de la forme `192.168.x.x`.
4) Sur le PC serveur en terminal dans le dossier `website-frontend/` : `ng serve --host 0.0.0.0` pour lancer le serveur local.
5) Pour s'y connecter depuis n'importe quel PC du réseau local : dans le navigateur entrer d'adresse : `192.168.x.x:4200` (adresse locale de la machine serveur).

Attention : cette fonctionnalité peut potentiellement représenter une faile de sécurité, préféré son utilisation sur un réseau de confiance.