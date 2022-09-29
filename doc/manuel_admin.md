# Manuel d'utilisation du site destiné à la modération et l'administration

## Sommaire

<ol type="I">
<li> Accueil et interface globale
    <ol type="1">
        <li>Bannière</li>
        <li>Corps de page</li>
        <li>Bas de page</li>
    </ol>
</li>

<li>Création de compte et connexion</li>
    <ol type="1">
        <li>Créer un compte</li>
        <li>Se connecter/déconnecter</li>
        <li>Identifiant perdu et modification des informations</li>
    </ol>
</li>

<li>Billetterie</li>
    <ol type="1">
        <li>Vue globale</li>
        <li>Vue en détail d'un billetterie</li>
        <li>Création d'une billetterie</li>
        <li>Modification/Suppression d'une billetterie</li>
        <li>Mise en vente et fin de vente d'une billetterie</li>
        <li>Gestion des places d'une billetterie</li>
    </ol>
</li>

<li>Calendrier</li>
    <ol type="1">
        <li>Vue globale du calendrier</li>
        <li>Vue détaillée du évènement (hors billetterie)</li>
        <li>Création d'un évènement (hors billetterie)</li>
        <li>Modification/Suppression d'un évènement (hors billetterie)</li>
    </ol>
</li>

<li>L'équipe</li>
    <ol type="1">
        <li>Vue globale</li>
        <li>Vue détaillée d'un pôle</li>
    </ol>
</li>

<li>Masterclass</li>
    <ol type="1">
        <li>Vue globale</li>
    </ol>
</li>

<li>Remarques d'ordre générales</li>
    
</li>

</ol>


_______

## I. Accueil et interface globale

Cette section discuter de l'interface visible lors du lancement du site

### 1. Bannière

La bannière contient actuellement logo, titre du site, un composant indiquant l'état de connextion de l'utilisateur et une barre de navigation qui permet de se diriger vers l'ensemble des pages du site.

Dans cette barre de navigation vous trouverez notamment un bouton Administration qui ne fera que vous rediriger vers la page d'authentification étant donné que le simple fait d'avoir un compte administrateur est suffisant pour avoir tous les droits sur le site. Pas de double authentification comme sur l'ancien site.

#### Comming soon :
* Une barre de navigation plus personnalisée au BDA actuellement en place
* Une gestion interne du stockage d'image utilisateur, en effet certains utilisateurs n'auront surement pas leur photo s'affichant lors de leur connexion du faire que le site continue à aller chercher les informations sur le portail des élèves.

### 2. Corps de page

Le corps de page contient les éléments à venir (tous les évènements de l'instant t du chargement du site à $+\infty$ ). Un passage de la souris sur ces éléments vous permet de voir la descritpion en plus du titre. L'image affichées est celle rentrée lors de la création de l'évènement. Un clic sur l'évènement vous fera accéder à sa page de détail (voir III. 2. et IV. 2.).

#### Comming soon :
* Une meilleure adaptivité aux différents formats d'écran (notamment téléphone)
* Un dimensionnement d'image plus judicieux et moins lourd à charger

### 3. Bas de page

Vous trouvez en bas de la page le lien vers notre partenaire, la page facebook du BDA en place et le portail des élèves ainsi qu'un moyen de nous contacter. Cette page de contact permet notamment de faire remonter des bugs ou des suggestions et offres commerciales directement sur une adresse gmail donc les codes sont détenus par le respo RSI.

________

## II. Création de compte et connexion

### 1. Création de compte

Dans la bannière, en haut à droite vous trouverez le bouton permettant de créer un compte si vous n'êtes pas déjà connecté. Vous pourez aussi accéder à la création de compte dans le menu de connexion en dessous des barres de saisi de champs.

La connexion vous promose un formulaire où toutes les cases doivent être remplies. Les informations fournies sur cette page sont stockées sur la base de donnée du BDA et le mot de passe n'est jamais transmis en clair : il est hashé dès son saisi et envoyé au serveur du BDA de façon hashée.

Le champ de mot de passe répond à des critères, le mot de passe doit : 
* faire au minimum 8 lettres de long,
* Contenir au moins une majuscule,
* Contenir au moins un chiffre

Sans ces condition, un message d'erreur s'affiche et l'utilisateur ne peut créer son compte.

### 2. Se connecter/déconnecter

En fonction de votre état de connexion, l'option pour se connecter ou déconnecter est toujours disponible en haut à droite de votre écran. "Se connecter" vous redirigera vers une page où vous pourrez rentrer vos identifiants, précédemment renseignés.

En cas de fermeture du site sans déconnexion, votre compte reste actif 2h à compté de l'authentification. Si vous ne souhaitez pas rester connecter durant ces 2h, il faut cliquer sur le bouton de déconnexion.

### 3. Identifiant perdu et modification des informations

En cas de perte du mot de passe, celui-ci peut être retrouvé dans l'onglet connexion en cliquant sur "mot de passe perdu". Celui ci sera alors envoyé par message à condition de rentrer les bonnes informations de connexion. En cas de soucis merci de contacter un administrateur. 

En cas de perte de login il faudra également contacter un administrateur.

Vous pourrez également changer les informations de votre compte une fois connecté dans l'onglet "mon compte" (dans le composant tout en haut à droite). Notez toutefois que vous ne pourrez modifier votre login de cette façon.

#### 4. Comming soon 

* La gestion de la perte de login
* La gestion de la modification de login dans les modifications d'informations

_____________

## III. Billetterie

Les développeurs du site ont considéré la définition d'une billetterie comme étant un évènement à place plus ou moins limitées devant être réservé par la demande d'un billet auprès des administrateurs. Ainsi tout évènement ne nécessitant pas de prendre un billet disponible en quantité plus ou moins limité n'est pas concerné par cette appélation mais sera un évènement dit "hors billetterie" disponible par exemple dans le calendrier. Dans cette section nous ne discutterons que des évènements de la billetterie.

### 1. Vue globale

Après avoir accédé à la billetterie dans le menu de navigation vous pourrez vous tous les évènements de billetterie disponibles dans la futur ( les évènements commençants après l'instant t de chargement de la page). Ces évènements laisse apparaitre leur image, titre et tout ou partie de leur description en fonction de la taille de cette dernière, en cliquant dessus vous accèderez aux détails de cette billetterie.

#### Comming soon :
* Améliorations graphique de l'interface et de son adaptation aux écrans

### 2. Vue en détail d'une billetterie

Après avoir cliqué sur la billetterie dans l'onblet billetterie, calendrier ou sur la pge d'accueil, vous pourrez accéder aux détails de cette évènement. Toutes les informations renseignées lors de la création de l'évènement y sont renseignées. 

Vous trouverez également en bas à droite les boutons afin de réserver/déréserver un billet si vous êtes connecté et les dates d'ouverture et fermeture prévu des billetterie. ATTENTION : l'ouverture et la billetterie se fait pour l'instant manuellement par le créateur de la billetterie, le point sera abordé de nouveau dans la section suivante.

Si vous êtes connecté sur un compte administrateur vous trouverez en haut à gauche les boutons vous permettant de modifier la billetterie,de gérer les places reservées de cette billetterie et afin d'ouvrir et fermer la billetterie à la vente.

#### Comming soon :
* Améliorations graphique de l'interface et de son adaptation aux écrans

### 3. Créer une billetterie

Dans l'onglet billetterie, si vous êtes connecté sur un compte administrateur vous trouverez un bouton de création d'évènement redirigeant vers un form. Seul le champ de date de fin de l'évènement n'est pas obligatoire (mais fortement recommendé pour des raisons d'affichage dans le calendrier). L'image fournie doit être au format .jpeg, .jpg ou .png et dans un ratio proche de 4/3 pour des raisons de rendu graphique.

ATTENTION comme énoncé précédemment les dates de mise en vente et fin de vente des billetteries sont purement indicatives pour l'instant. Il est de la responsabilité du créateur de la billetterie et la mettre et retirer de vente. Nous savons que cela est très embêtant et alors pourquoi demander les dates ? Heureusement pour vous :

#### Comming soon :
* Gestino automatique de la mise en vente et fin de vente des billetterie.
* Amélioration du système d'envoie des images au serveur

### 4. Modification/Suppression d'une billetterie

Comme énoncé plus haut dans la vue détaillée d'une billetterie vous pourrez accéder à un bouton, si connecté sur un compte administrateur, afin de modifier celle-ci. La modification est un form pré-complété, ne modifiez que ce qui vous intéresse. Notez que si la date de fin n'a pas été renseignée alors elle sera mise par défaut sur une date avant le 1e janvier 2000 (système D). Laissez là à l'identique si vous ne souhaitez pas modifier ce champ.

Si vous le souhaitez, la modification d'une billetterie peut engendrer une émission de mails à destination des personnes ayant pris une place et de son créateur. Le mail informe juste du changement de la billetterie mais ne donne pas de détails.

Vous trouverez également dans l'onglet de modification de la billetterie l'option de la supprimer définitivement ainsi que les places étant prises sur cette dernière. Notez que la suppression est irrémédiable et qu'aucune copie n'est faite. La suppresion engage automatiquement un mail aux personnes ayant prise une place mais encore une fois le mail informe simplement de la suppression d'une billetterie sans préciser laquelle.

#### Comming soon :
* Amélioration du système de dates dans le cas où aucune information n'a été rentrée,
* Amélioratin du système de mail envoyant un résumé des modifications aux utilisateurs et du nom de la billetterie dans le cas d'une suppression
* Création d'une copie temporaire des billetteries et places lors d'une suppression afin de pouvoir la retrouver en cas de fausse manipulation


### 5. Mise en vente et fin de vente d'une billetterie

Nous préférons le rappeler : la mise en vente et fin de vente d'une billetterie est encore manuelle. Personne n'aime attendre 30 minutes un PAPS prévu à un instant t car un administrateur a oublié d'allumer son ordinateur alors merci d'être ponctuel. De notre côté nous nous efforcerons de remédier à ce désagrément
le plus rapidement possible dans une version 1.1 du site dont le développement commencera dès la rentrée.

Comme déjà énoncé, la mise en vente et fin de vente des billetteries se fait dans l'onglet détails de la billetterie par un bouton en haut à gauche de l'écran lorsque vous êtes connecté sur un compte administrateur.

#### Comming soon :
* Automatisation de la mise en vente et fin de vente des billetteries

### 6. Gestion des places d'une billetterie

Une fois que l'utilisateur a pris sa place, il la voit apparaître dans l'onglet compte accessible depuis le composant en à droite de la bannière. Celui-ci affiche ses places et donne leur statut : refusée, en attente de traitement ou acceptée. Ce choix vient plus ou moins directement de l'administrateur.

Après la fermeture d'une billetterie (voir III. 5.) un onglet apparait en bas à droite de la page détails de la billetterie et montre le résultat du semi-PAPS (qui fonctionne sur un classement par point puis par PAPS). L'administrateur peut alors donner ou refuser la place aux personnes, le but principal étant de vérifier à ce qu'il n'y ait aps de problème. L'utilisateur sait alors qu'il a été pris depuis son compte. Afin d'être payé il est pour l'instant du devoir de l'administrateur de se débrouiller, par exemple en envoyant un mail aux personnes prises une fois la séléction terminée, afin de s'assurer qu'elles sont en connaissance de la validation de leur place et leur donner les indications de paiement.

#### Comming Soon :
* Acceptation du billet automatiquement envoyée par mail à l'utilisateur
* Paiement en ligne
* Amélioration de l'interface de gestion

________________

## IV. Calendrier

### 1. Vue globale du calendrier

Dans la barre de navigation vous pouvez accéder au calendrier. Celui ci permet un affichage temporel des évènements à venir billetteries incluses (non pas leur date de mise en vente mais date de l'évènement en question). Dans l'onglet mois vous pourrez accéder aux détails d'un jour en cliquant dessus. Les évènements sont repérés par une pastille de couleur correspondant au pôle ayant émis l'évènement. Les évènements sont cliquables et renvoient vers leurs détails (le cas des billetterie ayant été énoncé partie III. 2. et le cas non billetterie est abordé dans la partie suivante).

#### Comming soon :
* Amélioration graphiques des polices de caractères et des couleurs de pastilles des évènements, notamment dans les onglets semaine et jour où elles ne sont presque pas utilisées
* Mise en place d'une légende des vignettes

### 2. Vue en détail d'un évènement (hors billetterie)

La vue d'un évènement hors billetterie repose sur le même template qu'une billetterie (voir III. 2.) aux exceptions suivantes :
* Seul les informations rentrées lors de la création de l'évènement sont affichées
* La gestion de l'aspect de vente n'ayant pas d'intêret par définition n'est pas présent


### 3. Création d'un évènement (hors billetterie)

En bas à gauche de l'onglet calendrier vous trouverez, si vous êtes connecté sur un compte administrateur, un bouton permettant de créer les évènements, ici seul le titre, descritpion, date, lieu de début et image de l'évènement sont obligatoire et la date de fin vivement conseillée. Les autres éléments sont optionnels et varient en fonction de l'évènement. Le choix a été de laisser disponnible la possiblité de mettre des prix même cotisants et non cotisants en cas par exemple d'un partenariat avec un structure proposant des tarifs réduits aux cotisants mais en nombre de place illimité.

### 4. Modification/suppression d'un évènement (hors billetterie)

Comme pour les billetteries (voir III. 4) on accède à la modification par la vue en détail de l'évènement et les informations sont prérentrées. Ici aussi le système D des dates non reiseignées remplacées par des dates avant 2000 est appliqué. Merci de ne pas y toucher si vous ne souhaitez pas la modifier.
L'option d'envoie de mail n'est ici pas présente car la notion de place reservée n'a pas de sens.

La suppression est possible par un bouton en haut de la page et est un fois de plus irréversible.

#### Comming soon :
* Amélioration du système de dates dans le cas où aucune information n'a été rentrée,
* Création d'une copie temporaire des billetteries et places lors d'une suppression afin de pouvoir la retrouver en cas de fausse manipulation

_____________

## V. L'équipe

L'onglet d'équipe permet d'afficher pôles, nom, prénom, rôle et photo des membres du BDA ainsi qu'une description des pôles et du rôle de chacun dans ces derniers.

### 1. Vue globale

L'onglet s'ouvre sur une série de menu déroulants sur lequel seul un résumé de chaque pôle est donné par son titre et les photos de ses membres. Un clic sur le menu permet de voir le détail d'un pôle.

#### Comming soon :
* Amélioration de l'adaptation aux écrans notamment dans le cas des prénoms et noms long (qui ont tendance, au sein d'une promotion, à être attirés par le BDA).
* Correction d'un bug faisant que parfois il est nécessaire de recharger la page pour pouvoir ouvrir le menu déroulant.

### 2. Vue en détail d'un pôle

Lorsque vous cliquez sur le menu déroulant, celui-ci s'ouvre pour donner accès aux détails du pôle et de ses membres. A gauche vous retrouvez une description du pôle faite par le respo. A coté de chaque membre, en plus de sa description rapide déjà visible dans la vue globale, vous trouverez une rapide description de ces derniers s'ils en ont rentré une.

Pour modifier ces informations, mise à part nom et prénom, il est nécessaire de faire appel à un administrateur RSI afin qu'il modifie directement en base de donnée les informations.

#### Comming soon :
* Modification en ligne de la description de pôle par son respo
* Modification en ligne de la description personnel par le membre du BDA en question

_______________

## VI. Masterclass

### 1. Vue globale

L'onglet masterclass permet de s'informer sur les cours proposés par le BDA aux élèves. Le contenu de la page est réalisé par le responsable des masterclass et envoyée à un administrateur RSI afin de la modifier.
Le fichier affiché est simplement un fichier markdown donc pour gagner du temps le reponsable masterclass peut directement founir au RSI un fichier markdown pour remplacer l'ancien.

#### Comming soon :
* Modification en ligne du fichier
* Améliorations graphiques de la page

_________________

## VII. Remarque globales

Au RSI nous sommes bien conscients que le site précédent était plus beau, plus fonctionnel et plus robuste. Ce nouveau site est encore remplis d'erreurs et de bugs ainsi que de défauts en plus de ne pas être très personnalisé au BDA en poste ni même beau tout court. Toutefois il représente pour le RSI un investissement, à long terme rentable, sur la gestin du site en facilitant la structure de la base de données, la structure du code et surtout en ouvrant de nombreuses perxpéctives d'évolutions que l'ancien site ne permettait pas. Nous ne souhaitions pas attendre une version finale du site pour la publier car une transition en cours d'année aurait été quasiement impossible ou colossale et la mise ne service prématurée nous permettra de trouver tôt les failles plutôt que d'attendre une version finale plus complexe et donc plus difficile à débugger.

Au RSI nous sommes persuadés que, malgré la gêne occasionnée par ce nouveau site, avec des efforts, du temps et du travail ce site dépassera rapidement l'ancien et pourra devenir une interface très fonctionnelle pour les utilisateurs. Comme vous avez pu le lire dans ce manuel, les améliorations déjà envisagées sont nombreuses et concerneront une bonne partie du début d'année en priorisant dans cet ordre :

1. les corrections du bug et failles de sécurité
2. l'amélioration de la fiabilité 
3. l'améliroation de l'expérience utilisateur
4. l'améliroation de l'expérience administrateur
5. l'amélioration de l'esthétique globale du site
6. l'amélioration de l'utilisation pour l'équipe RSI


Merci donc de votre compréhension et bonne utilisation,

Antoine Servolin, Respo RSI P19
Thibaut Caillierez, Respo RSI P20