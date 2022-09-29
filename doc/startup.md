# Configuration

Installer `nodejs` (https://nodejs.org/en/download/)

Dans le dossier `website-frontend/`, 
- exécuter `yarn` (si vous avez réussi à l'installer)
- ou exécuter `npm install`

pour télécharger toutes les librairies associées. Cela peut prendre un peu de temps (et d'espace).

Enfin, exécuter `npm run start`, et le site sera à l'adresse `localhost:4200`

---

### Lancer le frontend sur le réseau local

Pour pouvoir ouvrir le même frontend sur plusieurs PC :
1) S'assurer que les PC sont connectés au même réseau local
2) Sur le PC serveur ouvrir le port 4200 (sous windows : pare-feu -> paramètres avancés -> règles entrantes -> nouvelle règle, sous linux : sudo iptables -I INPUT -p tcp --dport 4000 --syn -j ACCEPT)
3) Sur le PC serveur en terminal, récupérer l'adresse locale avec `ipconfig` : l'adresse IPv4 est souvent de la forme `192.168.x.x`.
4) Sur le PC serveur en terminal dans le dossier `website-frontend/` : `ng serve --host 0.0.0.0` pour lancer le serveur local.
5) Pour s'y connecter depuis n'importe quel PC du réseau local : dans le navigateur entrer d'adresse : `192.168.x.x:4200` (adresse locale de la machine serveur).

Attention : cette fonctionnalité peut potentiellement représenter une faile de sécurité, préféré son utilisation sur un réseau de confiance.
