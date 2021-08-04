
# Enregistrement

L'enregistrement concerne toute la procédure de création d'un compte par un résident de la Meuh. Cette étape n'est donc **pas à réaliser par le Rézal**, c'est d'ailleurs un des objectifs de ce site.

Cette procédure permet donc à un résident de renseigner ses informations, d'accèder à la charte d'utilisation du réseau et de l'accepter, puis de créer son compte. Cela correspond au 1er sous-composant : form. Le second sous-composant concerne lui la partie de vérification d'une adresse email. Le site est fait de telle sorte à ce que **la vérifiation d'une adresse mail soit obligatoire pour accéder à son compte et pour que ce dernier soit approuvée**. Autrement dit: pas d'adresse mail, pas de WiFi. Cela est important pour la procédure de vérification de mot de passe et pour pouvoir contacter tout cotisant.
Nous allons étudier les deux sous-composants en détails

## Form

Ce composant est donc un formulaire qui invite le futur utilisateur du réseau à entrer ses coordoonnées:
- Prénom
- Nom
- Adresse email
- Chambre à la Meuh (ou PAM)
- Ecole (Mines / Ponts / ENSTA / Ete / Autre)
- Promotion (Si Mines)
- Acceptation de la charte d'utilisation du réseau

Une fois le formulaire remplit, la personne peut valider les informations et le front transmet la requête au backend, si le compte est créé sans problème, le front montre une page à l'utilisateur. Cette page contient les instructions relatives à la vérification de l'email et la procédure pour se connecter au réseau, il dispose enfin d'un bouton pour accèder à ses informations de connexion (login / MdP). Lorsqu'il clique dessus, ces informations lui sont montrées et il peut les noter avant de se diriger vers l'onglet de connexion.
Lorsque le back créé le compte, il envoie un email pour vérifier l'adresse mail que l'utilisateur a renseigné dans le formulaire, comme prévenu celui-ci **ne pourra accéder à son compte et au réseau tant que l'adresse transmise n'est pas vérifiée**.

## Verify Email

Ce composant est appelé par le router lorsque celui-ci reçoit une demande de la forme : "recover/new-password/:token", token indiquant alors une variable. Cette forme est exactement celle du lien qui est présent dans le mail de demande de récupération de mot de passe, token étant alors une chaine de caractère qui encode un objet JSON contenant le code unique de demande de vérification d'adresse email.
Si le backend arrive à décoder ce token et modifier la base de données pour indiquer que l'adresse email a bien été vérifiée, il renvoie un message au front qui redirige alors l'utilisateur vers le formulaire de connexion.
