/* Méthodes de réponse + exercices au format de l'annale (conception = ex.1, théorie = ex.3).
   IDs neufs (préfixes cg_, cx_, tx_) : ne jamais renommer, la progression y est attachée. */

/* =====================================================================
   SCHÉMAS ENTITÉ-ASSOCIATION (dessinés par app.js -> chenSVG)
   ents: {CLE:{x,y,attrs,id}}  rels: {a,b,label,ca,cb,attrs,off}
   ca = cardinalité côté a, cb = côté b
   ===================================================================== */
window.DIAG = {
A23:{w:960,h:580,ents:{
  CONDUCTEUR:{x:300,y:75,attrs:["id_conducteur","nom","telephone","adresse"],id:1},
  BUS:{x:300,y:290,attrs:["num_bus"],id:1},
  MODELE:{x:80,y:290,attrs:["id_modele","libelle"],id:1},
  ITINERAIRE:{x:620,y:290,attrs:["id_itineraire","nom","distance"],id:1},
  ARRET:{x:620,y:75,attrs:["id_arret","nom"],id:1},
  HORAIRE:{x:875,y:290,attrs:["id_horaire","jour_semaine","heure_depart"],id:1},
  OPERATION:{x:300,y:500,attrs:["id_operation","date_operation","commentaire"],id:1},
  TYPE_OPERATION:{x:620,y:500,attrs:["id_type","libelle"],id:1}},
 rels:[
  {a:"BUS",b:"MODELE",label:"est de",ca:"1,1",cb:"0,n"},
  {a:"CONDUCTEUR",b:"BUS",label:"affecté à",ca:"0,n",cb:"1,n",attrs:["date_debut","date_fin"]},
  {a:"BUS",b:"ITINERAIRE",label:"suit",ca:"1,1",cb:"0,n"},
  {a:"ITINERAIRE",b:"ARRET",label:"dessert",ca:"1,n",cb:"1,n",attrs:["rang"]},
  {a:"HORAIRE",b:"ITINERAIRE",label:"concerne",ca:"1,1",cb:"0,n"},
  {a:"OPERATION",b:"BUS",label:"porte sur",ca:"1,1",cb:"0,n"},
  {a:"OPERATION",b:"TYPE_OPERATION",label:"est de type",ca:"1,1",cb:"0,n"}]},
B1:{w:860,h:450,ents:{
  TYPE_DOCUMENT:{x:95,y:110,attrs:["id_type","libelle"],id:1},
  DOCUMENT:{x:400,y:110,attrs:["cote","titre","annee"],id:1},
  AUTEUR:{x:720,y:110,attrs:["id_auteur","nom","nationalite"],id:1},
  EXEMPLAIRE:{x:400,y:350,attrs:["num_exemplaire","etat"],id:1},
  ADHERENT:{x:720,y:350,attrs:["num_adherent","nom","adresse","email","date_adhesion"],id:1}},
 rels:[
  {a:"DOCUMENT",b:"TYPE_DOCUMENT",label:"est de type",ca:"1,1",cb:"0,n"},
  {a:"DOCUMENT",b:"AUTEUR",label:"écrit par",ca:"1,n",cb:"1,n"},
  {a:"EXEMPLAIRE",b:"DOCUMENT",label:"exemplaire de",ca:"1,1",cb:"1,n"},
  {a:"ADHERENT",b:"EXEMPLAIRE",label:"emprunte",ca:"0,n",cb:"0,n",attrs:["date_emprunt","date_retour_prevue","date_retour_effective"]}]},
B2:{w:860,h:470,ents:{
  PROPRIETAIRE:{x:100,y:110,attrs:["id_proprietaire","nom","telephone","adresse"],id:1},
  ANIMAL:{x:420,y:110,attrs:["id_animal","nom","date_naissance"],id:1},
  ESPECE:{x:740,y:110,attrs:["id_espece","libelle"],id:1},
  VETERINAIRE:{x:100,y:370,attrs:["id_veto","nom","specialite"],id:1},
  CONSULTATION:{x:420,y:370,attrs:["id_consultation","date","motif","prix"],id:1},
  MEDICAMENT:{x:740,y:370,attrs:["reference","nom","laboratoire"],id:1}},
 rels:[
  {a:"ANIMAL",b:"PROPRIETAIRE",label:"appartient à",ca:"1,1",cb:"1,n"},
  {a:"ANIMAL",b:"ESPECE",label:"est de",ca:"1,1",cb:"0,n"},
  {a:"CONSULTATION",b:"ANIMAL",label:"concerne",ca:"1,1",cb:"0,n"},
  {a:"CONSULTATION",b:"VETERINAIRE",label:"réalisée par",ca:"1,1",cb:"0,n"},
  {a:"CONSULTATION",b:"MEDICAMENT",label:"prescrit",ca:"0,n",cb:"0,n",attrs:["posologie"]}]},
B3:{w:1120,h:860,ents:{
  TYPE_ABONNEMENT:{x:100,y:80,attrs:["id_type_abo","libelle","prix"],id:1},
  ABONNE:{x:430,y:80,attrs:["id_abonne","nom","email"],id:1},
  LOCATION:{x:430,y:320,attrs:["id_location","heure_depart","heure_arrivee"],id:1},
  STATION:{x:780,y:320,attrs:["id_station","nom","adresse","nb_places"],id:1},
  VELO:{x:430,y:560,attrs:["num_velo","etat"],id:1},
  MODELE:{x:100,y:560,attrs:["id_modele","libelle","autonomie"],id:1},
  INTERVENTION:{x:780,y:560,attrs:["id_intervention","date"],id:1},
  TECHNICIEN:{x:1020,y:430,attrs:["id_technicien","nom"],id:1},
  TYPE_INTERVENTION:{x:780,y:780,attrs:["id_type","libelle"],id:1}},
 rels:[
  {a:"ABONNE",b:"TYPE_ABONNEMENT",label:"a souscrit",ca:"1,1",cb:"0,n"},
  {a:"LOCATION",b:"ABONNE",label:"par",ca:"1,1",cb:"0,n"},
  {a:"LOCATION",b:"STATION",label:"part de",ca:"1,1",cb:"0,n",off:-38},
  {a:"LOCATION",b:"STATION",label:"arrive à",ca:"0,1",cb:"0,n",off:38},
  {a:"LOCATION",b:"VELO",label:"de",ca:"1,1",cb:"0,n"},
  {a:"VELO",b:"MODELE",label:"est de",ca:"1,1",cb:"0,n"},
  {a:"INTERVENTION",b:"VELO",label:"sur",ca:"1,1",cb:"0,n"},
  {a:"INTERVENTION",b:"TECHNICIEN",label:"par",ca:"1,1",cb:"0,n"},
  {a:"INTERVENTION",b:"TYPE_INTERVENTION",label:"de type",ca:"1,1",cb:"0,n"}]},
LIVRAISON:{w:880,h:450,ents:{
  SERVICE:{x:100,y:100,attrs:["id_service","nom"],id:1},
  EMPLOYE:{x:430,y:100,attrs:["code","nom","prenom","adresse"],id:1},
  CLIENT:{x:100,y:340,attrs:["code","nom","prenom","adresse","telephone"],id:1},
  LIVRAISON:{x:430,y:340,attrs:["numero","date","quantite"],id:1},
  VOITURE:{x:760,y:340,attrs:["numero","puissance","annee"],id:1}},
 rels:[
  {a:"EMPLOYE",b:"SERVICE",label:"appartient à",ca:"1,1",cb:"1,n"},
  {a:"LIVRAISON",b:"EMPLOYE",label:"assurée par",ca:"1,1",cb:"0,n"},
  {a:"LIVRAISON",b:"CLIENT",label:"pour",ca:"1,1",cb:"0,n"},
  {a:"LIVRAISON",b:"VOITURE",label:"utilise",ca:"1,1",cb:"0,n"}]},
ZERODEFO:{w:880,h:470,ents:{
  MODELE:{x:100,y:110,attrs:["code","nom","date_mise_marche"],id:1},
  PRODUIT:{x:420,y:110,attrs:["num_serie","num_produit","annee_production"],id:2},
  FAUTE:{x:760,y:110,attrs:["code","titre","date_detection","commentaire","date_reparation"],id:1},
  SOUS_CATEGORIE:{x:760,y:370,attrs:["id_sous_cat","nom","description"],id:1},
  CATEGORIE:{x:420,y:370,attrs:["id_categorie","nom","description"],id:1}},
 rels:[
  {a:"PRODUIT",b:"MODELE",label:"basé sur",ca:"1,1",cb:"0,n"},
  {a:"FAUTE",b:"PRODUIT",label:"concerne",ca:"1,1",cb:"0,n"},
  {a:"FAUTE",b:"SOUS_CATEGORIE",label:"classée dans",ca:"1,n",cb:"0,n"},
  {a:"SOUS_CATEGORIE",b:"CATEGORIE",label:"fait partie de",ca:"1,1",cb:"1,n"}]},
STIM:{w:960,h:320,ents:{
  UTILISATEUR:{x:150,y:210,attrs:["identifiant","email","hash_mot_de_passe","date_inscription"],id:1},
  JEU:{x:520,y:210,attrs:["id_jeu","titre","prix"],id:1},
  GENRE:{x:850,y:210,attrs:["id_genre","libelle"],id:1}},
 rels:[
  {a:"UTILISATEUR",b:"UTILISATEUR",label:"est ami avec",ca:"0,n",cb:"0,n"},
  {a:"UTILISATEUR",b:"JEU",label:"achète",ca:"0,n",cb:"0,n",attrs:["date_achat","prix_paye"]},
  {a:"JEU",b:"GENRE",label:"est de",ca:"1,1",cb:"0,n"}]},
FESTIVAL:{w:1120,h:640,ents:{
  ARTISTE:{x:420,y:80,attrs:["id_artiste","nom","pays"],id:1},
  GENRE:{x:780,y:80,attrs:["id_genre","libelle"],id:1},
  SCENE:{x:100,y:310,attrs:["id_scene","nom","capacite"],id:1},
  CONCERT:{x:420,y:310,attrs:["id_concert","date_heure","duree"],id:1},
  EDITION:{x:780,y:310,attrs:["annee","date_debut","date_fin","theme"],id:1},
  FESTIVALIER:{x:420,y:550,attrs:["id_festivalier","nom","email"],id:1},
  BILLET:{x:780,y:550,attrs:["num_billet","date_achat"],id:1},
  TYPE_BILLET:{x:1030,y:420,attrs:["id_type","libelle","prix"],id:1}},
 rels:[
  {a:"ARTISTE",b:"GENRE",label:"joue du",ca:"1,n",cb:"0,n"},
  {a:"CONCERT",b:"ARTISTE",label:"donné par",ca:"1,1",cb:"1,n"},
  {a:"CONCERT",b:"SCENE",label:"a lieu sur",ca:"1,1",cb:"0,n"},
  {a:"CONCERT",b:"EDITION",label:"pendant",ca:"1,1",cb:"1,n"},
  {a:"BILLET",b:"EDITION",label:"valable pour",ca:"1,1",cb:"0,n"},
  {a:"BILLET",b:"FESTIVALIER",label:"acheté par",ca:"1,1",cb:"1,n"},
  {a:"BILLET",b:"TYPE_BILLET",label:"est de type",ca:"1,1",cb:"0,n"}]},
SPORT:{w:940,h:660,ents:{
  FORMULE:{x:110,y:90,attrs:["id_formule","nom","prix_mensuel"],id:1},
  SALLE:{x:470,y:90,attrs:["id_salle","ville","adresse"],id:1},
  ADHERENT:{x:110,y:340,attrs:["id_adherent","nom","date_naissance","email"],id:1},
  SEANCE:{x:470,y:340,attrs:["id_seance","date","heure"],id:1},
  COACH:{x:820,y:340,attrs:["id_coach","nom","specialite"],id:1},
  COURS:{x:470,y:580,attrs:["id_cours","nom","niveau"],id:1}},
 rels:[
  {a:"ADHERENT",b:"FORMULE",label:"a choisi",ca:"1,1",cb:"0,n"},
  {a:"ADHERENT",b:"SALLE",label:"inscrit à",ca:"1,1",cb:"0,n"},
  {a:"ADHERENT",b:"SEANCE",label:"réserve",ca:"0,n",cb:"0,n",attrs:["date_reservation","present"]},
  {a:"SEANCE",b:"SALLE",label:"a lieu dans",ca:"1,1",cb:"0,n"},
  {a:"SEANCE",b:"COACH",label:"animée par",ca:"1,1",cb:"0,n"},
  {a:"COACH",b:"SALLE",label:"travaille dans",ca:"1,n",cb:"0,n"},
  {a:"SEANCE",b:"COURS",label:"de",ca:"1,1",cb:"0,n"}]}
};

/* =====================================================================
   CONCEPTION (exercice 1)
   ===================================================================== */
window.CONCEPTION_REPONDRE = `
<h3>Comment rendre ta copie (ce que le correcteur regarde)</h3>
<ol>
<li><b>Écris la notation en haut</b> : « Notation : Chen ». C'est demandé explicitement dans l'énoncé — l'oublier = points perdus bêtement.</li>
<li><b>Fais un brouillon en 3 listes</b> avant de dessiner : ENTITÉS (noms communs) / ASSOCIATIONS (verbes) / ATTRIBUTS. Coche chaque phrase de l'énoncé une fois traitée : rien ne doit être oublié.</li>
<li><b>Dessine au propre</b> : entités au centre de la feuille, les plus reliées au milieu. Rectangle = entité, losange = association (un verbe), ovale = attribut, identifiant <u>souligné</u>.</li>
<li><b>Mets les cardinalités sur CHAQUE trait</b> (0,1 / 1,1 / 0,n / 1,n). Lis-les à voix haute : « un bus suit <b>1 et 1 seul</b> itinéraire ; un itinéraire est suivi par <b>0 à n</b> bus ».</li>
<li><b>Attributs d'association</b> : date, quantité, note, rang, prix payé… s'ils dépendent du couple, ils vont <b>sur le losange</b>.</li>
<li><b>Bonus qui rassure le correcteur</b> : 3-4 lignes de schéma relationnel déduit (tables, clés primaires soulignées, #clés étrangères) et 1 phrase par choix discutable (« je garde l'historique car l'énoncé dit <i>au fil du temps</i> »).</li>
</ol>
<h3>Mots de l'énoncé → réflexe</h3>
<table class="mini">
<tr><th>Dans l'énoncé</th><th>Réflexe</th></tr>
<tr><td>« identifié par », « numéro unique », « code »</td><td>Identifiant (souligné)</td></tr>
<tr><td>« de différents types / modèles / catégories »</td><td>Entité séparée (TYPE_…) reliée en 1:N</td></tr>
<tr><td>« plusieurs … » des deux côtés</td><td>Association N:N (deviendra une table de jointure)</td></tr>
<tr><td>« au fil du temps », « historique », « registre »</td><td>Association ou entité datée (date_debut, date_fin)</td></tr>
<tr><td>une liste (« des points d'arrêt », « des auteurs »)</td><td>Jamais un attribut : une entité + une association</td></tr>
<tr><td>« éventuellement », « peut avoir »</td><td>Cardinalité minimale 0</td></tr>
<tr><td>« toujours », « au moins un »</td><td>Cardinalité minimale 1</td></tr>
<tr><td>deux rôles vers la même chose (départ / arrivée)</td><td>Deux associations distinctes</td></tr>
</table>
<h3>Barème probable (7 pts) — vérifie-toi</h3>
<ul><li>Entités pertinentes et complètes (~2 pts) · Associations correctes (~2 pts) · Cardinalités (~2 pts) · Attributs/identifiants + notation (~1 pt).</li></ul>`;

window.CONCEPTION_GUIDE = {id:"cg_liv", titre:"Exercice guidé pas à pas — Société de livraison (TD7 ex.2)",
 enonce:`<p>Une société fabrique un seul type de produit qu'elle livre à ses clients. Parmi ses services : l'administration, la livraison, la production… Chaque <b>employé</b> (administrateur, livreur, ouvrier…) appartient à un seul <b>service</b> et est identifié par un code, un nom, un prénom, une adresse et le service auquel il appartient. Chaque <b>client</b> est identifié par un code, un nom, un prénom, une adresse et un numéro de téléphone. Une <b>livraison</b>, identifiée par un numéro et faite à une date donnée, est assurée par un livreur en utilisant une <b>voiture</b> de la société. Elle concerne la totalité de la quantité demandée par un client. Chaque voiture est identifiée par un numéro, une puissance et une année de fabrication.</p>`,
 etapes:[
  {q:"Étape 1 — Souligne les noms communs : quelles sont les ENTITÉS ?", r:`<p><b>SERVICE, EMPLOYE, CLIENT, LIVRAISON, VOITURE.</b></p><p>Pièges : « produit » n'est <b>pas</b> une entité (un seul type de produit → rien à distinguer) ; « livreur » n'est pas une entité à part : c'est un EMPLOYE du service livraison.</p>`},
  {q:"Étape 2 — Pour chaque entité, liste ses attributs et souligne l'identifiant.", r:`<pre>SERVICE(<u>id_service</u>, nom)
EMPLOYE(<u>code</u>, nom, prenom, adresse)        ← pas d'attribut « service » : c'est une association !
CLIENT(<u>code</u>, nom, prenom, adresse, telephone)
LIVRAISON(<u>numero</u>, date, quantite)
VOITURE(<u>numero</u>, puissance, annee)</pre><p>Piège : « identifié par… le service auquel il appartient » → le service n'est pas un attribut d'EMPLOYE, c'est un lien vers SERVICE.</p>`},
  {q:"Étape 3 — Repère les verbes : quelles ASSOCIATIONS, entre quelles entités ?", r:`<ul><li>EMPLOYE <i>appartient à</i> SERVICE</li><li>LIVRAISON <i>assurée par</i> EMPLOYE (le livreur)</li><li>LIVRAISON <i>pour</i> CLIENT</li><li>LIVRAISON <i>utilise</i> VOITURE</li></ul>`},
  {q:"Étape 4 — Donne les CARDINALITÉS de chaque association (dans les deux sens).", r:`<table class="mini"><tr><th>Association</th><th>Côté 1</th><th>Côté 2</th></tr>
<tr><td>appartient à</td><td>un employé → <b>1,1</b> service</td><td>un service → <b>1,n</b> employés</td></tr>
<tr><td>assurée par</td><td>une livraison → <b>1,1</b> livreur</td><td>un employé → <b>0,n</b> livraisons (un administrateur n'en fait aucune)</td></tr>
<tr><td>pour</td><td>une livraison → <b>1,1</b> client</td><td>un client → <b>0,n</b> livraisons</td></tr>
<tr><td>utilise</td><td>une livraison → <b>1,1</b> voiture</td><td>une voiture → <b>0,n</b> livraisons</td></tr></table>`},
  {q:"Étape 5 — Dessine le schéma complet (notation Chen) puis compare.", r:"__DIAG__LIVRAISON", schema:`service(<u>id_service</u>, nom)
employe(<u>code</u>, nom, prenom, adresse, #id_service)
client(<u>code</u>, nom, prenom, adresse, telephone)
voiture(<u>numero</u>, puissance, annee)
livraison(<u>numero</u>, date, quantite, #code_employe, #code_client, #num_voiture)`}
 ]};

window.CONCEPTION_EXOS = [
{id:"cx_zero", titre:"ZéroDéfo — fautes de production (TD7 ex.3)", diag:"ZERODEFO",
 enonce:`<p>L'entreprise ZéroDéfo veut répertorier ses fautes de production (défaut constaté sur une pièce en fin de chaîne) et les associer aux produits concernés. Chaque produit est basé sur un <b>modèle</b> (code de 8 caractères, nom, date de mise sur le marché). Pour chaque <b>produit</b> : le modèle associé, le numéro de série (6 chiffres), le numéro de produit (4 caractères max) et l'année de production. Plusieurs produits partagent le même numéro de série, et deux produits peuvent avoir le même numéro de produit dans des séries différentes. Une <b>faute</b> concerne toujours un produit ; elle a un code unique, un titre, une date de détection, éventuellement un commentaire et une date de réparation. Les fautes sont classées dans des <b>sous-catégories</b> (au moins une, parfois plusieurs), chaque sous-catégorie faisant partie d'une <b>catégorie</b>. Catégories et sous-catégories ont un nom et optionnellement une description.</p><p><b>Proposer un diagramme entité-association (Chen ou UML).</b></p>`,
 corrige:`<p>Le point difficile : l'<b>identifiant de PRODUIT est composé</b> (num_serie, num_produit) — ni l'un ni l'autre n'est unique seul.</p>`,
 schema:`modele(<u>code</u>, nom, date_mise_marche)
produit(<u>num_serie, num_produit</u>, annee_production, #code_modele)
faute(<u>code</u>, titre, date_detection, commentaire, date_reparation, #num_serie, #num_produit)
categorie(<u>id_categorie</u>, nom, description)
sous_categorie(<u>id_sous_cat</u>, nom, description, #id_categorie)
classification(<u>#code_faute, #id_sous_cat</u>)`,
 points:["Notation indiquée","Identifiant composé de PRODUIT (num_serie + num_produit)","FAUTE–SOUS_CATEGORIE en N:N avec cardinalité 1,n côté faute","SOUS_CATEGORIE–CATEGORIE en 1:N","commentaire / date_reparation identifiés comme optionnels","Cardinalités sur toutes les associations"]},
{id:"cx_stim", titre:"Stim — normaliser puis modéliser (TD7 ex.4)", diag:"STIM",
 enonce:`<p>La plateforme de jeux dématérialisés Stim utilise la table :</p><pre>utilisateur(identifiant, email, mot_de_passe, date_inscription, jeux, genre_jeux, depense_totale)
1 | a@b.com | abc | 01/01/2019 | The Witcher (50€), DOTA 2 (30€), Rocket League (5€) | RPG, MOBA, Sport | 85</pre><p>a) Que pouvez-vous dire de la normalisation de cette base ? b) Proposez un modèle entité-association. c) Transposez-le en schéma de base de données.</p>`,
 corrige:`<p><b>a)</b> Pas en <b>1NF</b> : jeux et genre_jeux contiennent des listes (et le prix est mélangé au titre). depense_totale est <b>calculable</b> (somme des achats) → redondance (problème de 3NF). Le mot de passe est stocké <b>en clair</b> → il faut stocker son empreinte (hachage). La colonne « amis » de l'énoncé est aussi une liste → association réflexive.</p>`,
 schema:`utilisateur(<u>identifiant</u>, email, hash_mot_de_passe, date_inscription)
genre(<u>id_genre</u>, libelle)
jeu(<u>id_jeu</u>, titre, prix, #id_genre)
achat(<u>#identifiant, #id_jeu</u>, date_achat, prix_paye)
amitie(<u>#identifiant_1, #identifiant_2</u>)
-- depense_totale : SELECT SUM(prix_paye) FROM achat WHERE identifiant = 1;`,
 points:["Violation 1NF expliquée (listes)","depense_totale identifiée comme calculable","Mot de passe en clair signalé","Achat = N:N avec date et prix payé","Association réflexive pour les amis","Schéma relationnel avec PK/FK"]},
{id:"cx_fest", titre:"Festival de musique (inédit)", diag:"FESTIVAL",
 enonce:`<p>Un festival de musique a lieu chaque année : chaque <b>édition</b> a une année, des dates de début et de fin et un thème. Le festival dispose de plusieurs <b>scènes</b> (nom, capacité). Des <b>artistes</b> (nom, pays) pratiquent un ou plusieurs <b>genres musicaux</b>. Un <b>concert</b> est donné par un artiste, sur une scène, pendant une édition, à une date-heure et pour une durée données ; un artiste peut jouer plusieurs fois. Des <b>festivaliers</b> (nom, email) achètent des <b>billets</b> (numéro, date d'achat) valables pour une édition ; chaque billet est d'un <b>type</b> (pass 1 jour, pass 3 jours, VIP) qui a un prix.</p><p><b>Dessiner le schéma entité-association</b> (indiquer la notation).</p>`,
 corrige:`<p>Choix clé : <b>CONCERT est une entité</b> (il a un identifiant, une date-heure, une durée et 3 liens). On pourrait aussi faire une association ternaire ARTISTE–SCENE–EDITION, mais l'entité est plus simple à lire et à traduire.</p>`,
 schema:`edition(<u>annee</u>, date_debut, date_fin, theme)
scene(<u>id_scene</u>, nom, capacite)
artiste(<u>id_artiste</u>, nom, pays)
genre(<u>id_genre</u>, libelle)
pratique(<u>#id_artiste, #id_genre</u>)
concert(<u>id_concert</u>, date_heure, duree, #id_artiste, #id_scene, #annee)
festivalier(<u>id_festivalier</u>, nom, email)
type_billet(<u>id_type</u>, libelle, prix)
billet(<u>num_billet</u>, date_achat, #id_festivalier, #annee, #id_type)`,
 points:["Notation indiquée","CONCERT en entité (ou ternaire justifiée)","ARTISTE–GENRE en N:N","TYPE_BILLET séparé (le prix dépend du type)","BILLET relié à EDITION et FESTIVALIER","Cardinalités complètes"]},
{id:"cx_sport", titre:"Chaîne de salles de sport (inédit)", diag:"SPORT",
 enonce:`<p>Une chaîne de <b>salles de sport</b> (ville, adresse) gère ses <b>adhérents</b> (nom, date de naissance, email), chacun inscrit dans une salle principale et ayant choisi une <b>formule</b> d'abonnement (nom, prix mensuel). Des <b>cours collectifs</b> (nom, niveau) sont programmés en <b>séances</b> (date, heure) dans une salle, chaque séance étant animée par un <b>coach</b> (nom, spécialité). Un coach peut travailler dans plusieurs salles. Les adhérents <b>réservent</b> des séances : on garde la date de réservation et si l'adhérent était présent.</p><p><b>Dessiner le schéma entité-association</b> (indiquer la notation).</p>`,
 corrige:`<p>Piège : distinguer le <b>COURS</b> (le type d'activité, ex. « Yoga débutant ») de la <b>SEANCE</b> (une occurrence datée). La réservation porte sur la séance, avec deux attributs d'association.</p>`,
 schema:`formule(<u>id_formule</u>, nom, prix_mensuel)
salle(<u>id_salle</u>, ville, adresse)
adherent(<u>id_adherent</u>, nom, date_naissance, email, #id_salle, #id_formule)
coach(<u>id_coach</u>, nom, specialite)
travaille(<u>#id_coach, #id_salle</u>)
cours(<u>id_cours</u>, nom, niveau)
seance(<u>id_seance</u>, date, heure, #id_cours, #id_salle, #id_coach)
reservation(<u>#id_adherent, #id_seance</u>, date_reservation, present)`,
 points:["Notation indiquée","COURS et SEANCE distingués","Réservation N:N avec date_reservation et present","COACH–SALLE en N:N","Cardinalités complètes"]}
];

/* =====================================================================
   THÉORIE (exercice 3)
   ===================================================================== */
window.THEORIE_REPONDRE = `
<p>À l'annale, l'exercice 3 ne contient <b>aucun QCM</b> : ce sont des <b>questions ouvertes</b> où il faut <b>expliquer, justifier et écrire du SQL</b>. Voici un modèle de réponse pour chaque type de question.</p>
<h3>Type 1 — « Le schéma est-il normalisé ? Expliquer, corriger. »</h3>
<p><b>Plan :</b> vérifier les formes normales <b>dans l'ordre</b>, une phrase chacune, puis conclure et corriger.</p>
<pre>1NF : toutes les valeurs sont-elles atomiques (pas de liste) ?           → oui / non car …
2NF : la clé est-elle composée ? Si oui, une colonne dépend-elle
      d'une PARTIE seulement de la clé ?                                → oui / non car …
      (clé simple ⇒ 2NF automatiquement)
3NF : une colonne non clé dépend-elle d'une autre colonne non clé
      (ou est-elle calculable) ?                                        → oui / non car …
Conclusion : « Le schéma est / n'est pas en 3NF. »
Correction : décomposer — table(clé, …) + table(clé, …) avec #FK.</pre>
<p class="tip">Toujours nommer la <b>dépendance fonctionnelle</b> qui pose problème : « id_client → nom_client ». Si le schéma EST normalisé (cas de l'annale !), dis-le et justifie quand même les 3 niveaux, puis ajoute une amélioration (FK vers une table de référence).</p>
<h3>Type 2 — « Suggérer N stratégies d'optimisation, SQL, impacts + et − »</h3>
<p><b>Plan pour CHAQUE stratégie</b> (4 lignes) :</p>
<pre>Stratégie n : NOM — pourquoi elle aide CETTE requête (filtre ? GROUP BY ? texte ? date ?)
SQL : CREATE INDEX … / ALTER TABLE … PARTITION BY … / CREATE TABLE … + TRIGGER
(+) gain concret (lecture d'une partition, O(log n), lecture instantanée…)
(−) coût concret (espace, INSERT plus lents, redondance, administration…)</pre>
<table class="mini"><tr><th>Stratégie</th><th>Quand la proposer</th><th>+</th><th>−</th></tr>
<tr><td>Index (simple/composite)</td><td>WHERE, JOIN, GROUP BY, ORDER BY sur une colonne</td><td>O(n) → O(log n)</td><td>espace, écritures plus lentes</td></tr>
<tr><td>Index couvrant</td><td>agrégat sur une colonne groupé par une autre</td><td>la table n'est même pas lue</td><td>index plus gros</td></tr>
<tr><td>FULLTEXT</td><td>recherche d'un mot dans un texte (LIKE '%mot%')</td><td>recherche rapide (MATCH … AGAINST)</td><td>index volumineux</td></tr>
<tr><td>Partitionnement</td><td>grosse table filtrée par date / catégorie, purge des vieilles données</td><td>1 partition lue, DROP PARTITION</td><td>administration, clé de partition dans la PK</td></tr>
<tr><td>Table d'agrégats + trigger</td><td>mêmes statistiques demandées très souvent</td><td>lecture instantanée</td><td>redondance, coût à chaque INSERT</td></tr>
<tr><td>Historisation / archive</td><td>vieilles données rarement lues</td><td>table principale plus petite</td><td>UNION ALL pour tout lire</td></tr>
<tr><td>Réécrire la requête</td><td>SELECT *, sous-requêtes, CROSS JOIN, requêtes en boucle</td><td>moins de données traitées</td><td>—</td></tr></table>
<p class="tip">Les 3 stratégies doivent être <b>différentes</b> (pas « index sur A, index sur B, index sur C »). Combo sûr : <b>index + partitionnement + table d'agrégats</b>.</p>
<h3>Type 3 — « Procédure, fonction, déclencheur ou événement ? Pourquoi ? »</h3>
<table class="mini"><tr><th>Si l'action est…</th><th>Réponse</th><th>Appel / déclenchement</th></tr>
<tr><td>lancée <b>à la demande</b>, sans valeur à renvoyer</td><td><b>Procédure</b></td><td><code>CALL p();</code></td></tr>
<tr><td>un <b>calcul</b> qui renvoie une valeur utilisable dans une requête</td><td><b>Fonction</b></td><td><code>SELECT f(x);</code></td></tr>
<tr><td>une <b>réaction</b> à un INSERT / UPDATE / DELETE</td><td><b>Déclencheur</b> (trigger)</td><td>automatique, NEW. / OLD.</td></tr>
<tr><td><b>périodique</b> ou à une date donnée</td><td><b>Événement</b></td><td><code>ON SCHEDULE EVERY 1 DAY</code></td></tr></table>
<p><b>Plan :</b> 1) la réponse, 2) la justification <b>par élimination</b> des trois autres (une phrase chacun), 3) le code.</p>
<pre>DELIMITER $$
CREATE PROCEDURE nom()            | CREATE FUNCTION f(x INT) RETURNS FLOAT
BEGIN                             | BEGIN  DECLARE r FLOAT;
  …;                              |   SELECT … INTO r FROM …;  RETURN r;
END$$                             | END$$
CREATE TRIGGER t AFTER INSERT ON table FOR EACH ROW BEGIN … NEW.col … END$$
DELIMITER ;
SET GLOBAL event_scheduler = ON;
CREATE EVENT e ON SCHEDULE EVERY 1 DAY DO CALL nom();</pre>
<h3>Type 4 — Transactions, droits, sécurité</h3>
<ul><li>« garantir qu'on ne perd rien / tout ou rien » → <b>transaction</b> : <code>START TRANSACTION; … COMMIT;</code> (ou <code>ROLLBACK;</code>) + citer l'<b>atomicité</b> (ACID).</li>
<li>« qui a le droit de… » → <b>GRANT / REVOKE</b> + principe du <b>moindre privilège</b>.</li>
<li>mots de passe → stocker une <b>empreinte (hachage)</b>, jamais en clair.</li></ul>
<h3>Gestion du temps (6 pts ≈ 25 min)</h3>
<ul><li>Normalisation ≈ 5 min · 3 stratégies ≈ 12 min · procédure/événement ≈ 8 min.</li><li>Même incomplet, écris toujours <b>la réponse + 1 justification</b> : c'est là que sont la majorité des points.</li></ul>`;

window.THEORIE_EXOS = [
/* --- Normalisation --- */
{id:"tx_n1",th:"Normalisation",titre:"Inscriptions avec infos redondantes",
 enonce:`<pre>inscription(<u>id_etudiant, id_uv</u>, note, nom_etudiant, titre_uv)</pre>`,
 q:"Le schéma est-il normalisé ? Expliquer pourquoi et proposer une correction.",
 r:`<p>1NF : oui (valeurs atomiques). 2NF : <b>non</b>. La clé est composée (id_etudiant, id_uv) ; or <b>nom_etudiant ne dépend que de id_etudiant</b> et <b>titre_uv ne dépend que de id_uv</b> : ce sont des dépendances partielles. Seule note dépend de toute la clé. Donc pas en 2NF, donc pas en 3NF.</p><pre>etudiant(<u>id_etudiant</u>, nom)
uv(<u>id_uv</u>, titre)
inscription(<u>#id_etudiant, #id_uv</u>, note)</pre>`,
 points:["1NF vérifiée","Dépendances partielles nommées (id_etudiant → nom_etudiant, id_uv → titre_uv)","Conclusion « pas en 2NF »","Décomposition en 3 tables avec FK"]},
{id:"tx_n2",th:"Normalisation",titre:"Livres et éditeurs",
 enonce:`<pre>livre(<u>isbn</u>, titre, id_auteur, nom_auteur, nationalite_auteur, id_editeur, nom_editeur, ville_editeur)</pre><p>(un livre a un seul auteur dans ce système)</p>`,
 q:"Le schéma est-il normalisé ? Expliquer et corriger.",
 r:`<p>1NF : oui. 2NF : oui, la clé (isbn) est simple. 3NF : <b>non</b> — dépendances transitives : isbn → id_auteur → nom_auteur, nationalite_auteur et isbn → id_editeur → nom_editeur, ville_editeur. Ces colonnes non clé dépendent d'autres colonnes non clé : redondance (le nom de l'éditeur est répété pour chaque livre) et anomalies de mise à jour.</p><pre>auteur(<u>id_auteur</u>, nom, nationalite)
editeur(<u>id_editeur</u>, nom, ville)
livre(<u>isbn</u>, titre, #id_auteur, #id_editeur)</pre>`,
 points:["1NF et 2NF justifiées (clé simple)","Dépendances transitives nommées","Conclusion « pas en 3NF »","Décomposition avec FK"]},
{id:"tx_n3",th:"Normalisation",titre:"Réservations de vols",
 enonce:`<pre>reservation(<u>id_client, id_vol</u>, siege, nom_client, email_client, ville_depart, ville_arrivee, date_vol)</pre>`,
 q:"Le schéma est-il normalisé ? Expliquer et corriger.",
 r:`<p>1NF : oui. 2NF : <b>non</b> — clé composée (id_client, id_vol) : nom_client, email_client ne dépendent que de id_client ; ville_depart, ville_arrivee, date_vol ne dépendent que de id_vol. Seul siege dépend de toute la clé.</p><pre>client(<u>id_client</u>, nom, email)
vol(<u>id_vol</u>, ville_depart, ville_arrivee, date_vol)
reservation(<u>#id_client, #id_vol</u>, siege)</pre>`,
 points:["Clé composée repérée","2 groupes de dépendances partielles","Pas en 2NF","Décomposition"]},
{id:"tx_n4",th:"Normalisation",titre:"Le piège : schéma déjà correct",
 enonce:`<pre>releve(<u>id</u>, horodatage, valeur, #id_capteur)
capteur(<u>id_capteur</u>, nom, emplacement)</pre>`,
 q:"Ce schéma est-il normalisé ? Expliquer.",
 r:`<p><b>Oui, il est en 3NF</b> (comme dans l'annale A23). 1NF : valeurs atomiques. 2NF : les deux clés primaires sont simples → aucune dépendance partielle possible. 3NF : dans releve, horodatage, valeur et id_capteur ne dépendent que de id ; les infos du capteur sont bien dans une table séparée référencée par clé étrangère. Il n'y a rien à corriger.</p><p class="tip">Le piège est de vouloir absolument trouver une erreur. Justifie les 3 niveaux et conclus clairement.</p>`,
 points:["Conclusion « oui, 3NF »","Justification des 3 niveaux","Rôle de la FK id_capteur mentionné"]},
{id:"tx_n5",th:"Normalisation",titre:"Lignes de facture",
 enonce:`<pre>ligne(<u>facture_id, article_id</u>, quantite, prix_unitaire, total, libelle_article)</pre>`,
 q:"Le schéma est-il normalisé ? Expliquer et corriger.",
 r:`<p>1NF : oui. 2NF : <b>non</b> — libelle_article (et en général prix_unitaire catalogue) ne dépend que de article_id. 3NF : <b>non</b> — total se déduit de quantite × prix_unitaire (colonnes non clé) : le supprimer (cours).</p><pre>article(<u>article_id</u>, libelle, prix_catalogue)
ligne(<u>#facture_id, #article_id</u>, quantite, prix_unitaire)   -- prix au moment de la vente
-- total : SELECT quantite * prix_unitaire FROM ligne;</pre>`,
 points:["Dépendance partielle libelle_article","total calculable → violation 3NF","Suppression de total","Décomposition"]},
{id:"tx_n6",th:"Normalisation",titre:"Marques et modèles (cours)",
 enonce:`<pre>voiture(<u>id</u>, immatriculation, modele, marque)</pre><p>Exemples : (1, AB-123-CD, 208, Peugeot), (2, EF-456-GH, 308, Peugeot), (3, IJ-789-KL, Clio, Renault)…</p>`,
 q:"Le schéma est-il normalisé ? Expliquer et corriger.",
 r:`<p>1NF, 2NF : oui (clé simple). 3NF : <b>non</b> — dépendance fonctionnelle <b>modele → marque</b> entre deux colonnes non clé (le modèle détermine la marque) → redondance « Peugeot » répété.</p><pre>marque(<u>id_marque</u>, nom)
modele(<u>id_modele</u>, nom, #id_marque)
voiture(<u>id</u>, immatriculation, #id_modele)</pre>`,
 points:["DF modele → marque identifiée","Pas en 3NF","Décomposition en marque / modele / voiture"]},
/* --- Optimisation --- */
{id:"tx_o1",th:"Optimisation",titre:"Ventes d'une chaîne de magasins",
 enonce:`<pre>vente(<u>id</u>, date_vente, montant, #id_magasin)</pre><p>50 millions de lignes. Requête principale : chiffre d'affaires <b>par magasin et par mois</b> sur l'année en cours. Aucune optimisation n'a été faite.</p>`,
 q:"Suggérer 3 stratégies différentes d'optimisation de la structure ; écrire le SQL ; donner les impacts positifs et négatifs.",
 r:`<ol><li><b>Index composite couvrant</b> : <pre>CREATE INDEX idx_vente ON vente(id_magasin, date_vente, montant);</pre>(+) filtre sur la date et regroupement par magasin sans lire la table. (−) espace disque, chaque INSERT met l'index à jour.</li>
<li><b>Partitionnement par date</b> : <pre>ALTER TABLE vente PARTITION BY RANGE (YEAR(date_vente)) (
  PARTITION p2025 VALUES LESS THAN (2026),
  PARTITION p2026 VALUES LESS THAN (2027),
  PARTITION pmax  VALUES LESS THAN MAXVALUE);</pre>(+) la requête « année en cours » ne lit qu'une partition ; archivage par DROP PARTITION. (−) administration, la clé de partition doit être dans la PK (PRIMARY KEY(id, date_vente)).</li>
<li><b>Table d'agrégats</b> ca_mensuel(id_magasin, mois, total) alimentée par un trigger AFTER INSERT (ou un événement nocturne) : (+) lecture instantanée. (−) redondance, coût sur chaque vente, données à recalculer si une vente est modifiée.</li></ol>`,
 points:["3 stratégies différentes","SQL pour chacune","(+) ET (−) pour chacune","Lien avec « par magasin et par mois »"]},
{id:"tx_o2",th:"Optimisation",titre:"Recherche dans des articles de blog",
 enonce:`<pre>article(<u>id</u>, titre, contenu TEXT, date_publication, #id_auteur)</pre><p>Requête fréquente et lente : <code>SELECT * FROM article WHERE contenu LIKE '%base de données%';</code></p>`,
 q:"Pourquoi la requête est-elle lente ? Proposer et écrire 2 optimisations.",
 r:`<p>Le joker <code>%</code> en <b>début</b> de motif empêche d'utiliser un index classique : MySQL doit lire tout le texte de chaque ligne (O(n)). En plus, <code>SELECT *</code> renvoie de gros textes inutiles.</p><ol><li><b>Index FULLTEXT</b> + réécriture : <pre>ALTER TABLE article ADD FULLTEXT idx_contenu (contenu);
SELECT id, titre FROM article WHERE MATCH(contenu) AGAINST('base de données');</pre>(+) recherche très rapide, tri par pertinence. (−) index volumineux, insertions plus lentes.</li>
<li><b>Projection + limite</b> : ne sélectionner que id, titre et paginer avec <code>LIMIT 10</code> (cours : ne récupérer que les champs et lignes nécessaires).</li></ol>`,
 points:["Explication du % en début de motif","FULLTEXT + MATCH … AGAINST","Réécriture (pas de SELECT *, LIMIT)","+ / − cités"]},
{id:"tx_o3",th:"Optimisation",titre:"Journal de connexions",
 enonce:`<pre>connexion(<u>id</u>, horodatage, ip, #id_utilisateur)</pre><p>La table grossit sans fin. Requête fréquente : les 20 dernières connexions d'un utilisateur. Les connexions de plus d'un an ne sont jamais lues mais doivent être conservées (archives légales).</p>`,
 q:"Proposer 3 stratégies (SQL, + et −).",
 r:`<ol><li><b>Index composite</b> <code>CREATE INDEX idx_user_date ON connexion(id_utilisateur, horodatage);</code> : (+) les 20 dernières se lisent directement dans l'ordre de l'index. (−) écritures plus lentes.</li>
<li><b>Historisation</b> : table connexion_archive + événement mensuel qui déplace les lignes de plus d'un an dans une <b>transaction</b> (INSERT … SELECT puis DELETE) : (+) table principale petite et rapide. (−) lire tout l'historique demande un <code>UNION ALL</code>.</li>
<li><b>Partitionnement RANGE par mois/année</b> sur horodatage : (+) les vieilles partitions ne sont jamais lues, archivage facile. (−) administration, PK (id, horodatage).</li></ol>`,
 points:["Index composite (id_utilisateur, horodatage)","Archive + UNION ALL","Partitionnement ou événement","+ / − pour chaque"]},
{id:"tx_o4",th:"Optimisation",titre:"Réécrire une requête lente",
 enonce:`<pre>SELECT * FROM commande c, client cl
WHERE c.id_client = cl.id
AND c.id_client IN (SELECT id FROM client WHERE ville = 'Belfort');</pre><p>On veut seulement le numéro et la date des commandes des clients de Belfort.</p>`,
 q:"Quels problèmes ? Proposer une requête et une structure plus efficaces.",
 r:`<p>Problèmes (règles du cours) : <code>SELECT *</code> (projection inutile), produit cartésien écrit avec une virgule, sous-requête inutile (la jointure suffit), pas d'index sur ville.</p><pre>CREATE INDEX idx_client_ville ON client(ville);
SELECT c.id, c.date_commande
FROM commande c INNER JOIN client cl ON c.id_client = cl.id
WHERE cl.ville = 'Belfort';</pre><p>Ordre conseillé : projection (2 colonnes), sélection (ville), puis jointure. La FK id_client est déjà indexée.</p>`,
 points:["SELECT * remplacé par les colonnes utiles","Sous-requête supprimée","INNER JOIN explicite","Index sur ville"]},
/* --- Automatisation --- */
{id:"tx_a1",th:"Automatisation",titre:"Recalcul des stocks à la demande",
 enonce:`<p>Tables : produit(<u>id</u>, nom, stock), mouvement(<u>id</u>, #id_produit, quantite) (quantité positive = entrée, négative = sortie). Le gestionnaire veut pouvoir <b>recalculer tous les stocks quand il le décide</b>.</p>`,
 q:"Procédure, fonction, déclencheur ou événement ? Pourquoi ? Écrire le code.",
 r:`<p><b>Procédure stockée</b> : action déclenchée manuellement (CALL), qui modifie des données sans renvoyer de valeur. Pas une fonction (doit retourner une valeur, s'utilise dans une requête), pas un déclencheur (réagit à une modification, pas à une demande), pas un événement (déclenché par le temps).</p><pre>DELIMITER $$
CREATE PROCEDURE recalcul_stocks()
BEGIN
  UPDATE produit p
  SET stock = (SELECT COALESCE(SUM(m.quantite), 0) FROM mouvement m WHERE m.id_produit = p.id);
END$$
DELIMITER ;
CALL recalcul_stocks();</pre>`,
 points:["Réponse : procédure","Élimination des 3 autres","Code CREATE PROCEDURE + DELIMITER","Appel CALL"]},
{id:"tx_a2",th:"Automatisation",titre:"Paniers abandonnés",
 enonce:`<p>Table panier(<u>id</u>, #id_client, date_creation, valide). Chaque nuit à 2h, on veut supprimer les paniers non validés de plus de 7 jours.</p>`,
 q:"Quel outil ? Pourquoi ? Écrire le code.",
 r:`<p><b>Événement</b> : traitement <b>périodique</b>, sans intervention humaine.</p><pre>SET GLOBAL event_scheduler = ON;
CREATE EVENT ev_purge_paniers
ON SCHEDULE EVERY 1 DAY STARTS '2026-11-21 02:00:00'
DO DELETE FROM panier WHERE valide = 0 AND date_creation < NOW() - INTERVAL 7 DAY;</pre><p>Variante appréciée : mettre le DELETE dans une procédure et faire <code>DO CALL purge_paniers();</code> (réutilisable à la main).</p>`,
 points:["Réponse : événement","EVERY 1 DAY + STARTS 02:00","INTERVAL 7 DAY","event_scheduler = ON"]},
{id:"tx_a3",th:"Automatisation",titre:"Décrémenter le stock à chaque commande",
 enonce:`<p>Tables : produit(<u>id</u>, nom, stock), ligne_commande(<u>#id_commande, #id_produit</u>, quantite). À chaque ligne de commande ajoutée, le stock du produit doit baisser automatiquement.</p>`,
 q:"Quel outil ? Pourquoi ? Écrire le code.",
 r:`<p><b>Déclencheur (trigger) AFTER INSERT</b> sur ligne_commande : il réagit automatiquement à chaque insertion.</p><pre>DELIMITER $$
CREATE TRIGGER trg_stock AFTER INSERT ON ligne_commande
FOR EACH ROW
BEGIN
  UPDATE produit SET stock = stock - NEW.quantite WHERE id = NEW.id_produit;
END$$
DELIMITER ;</pre><p>NEW désigne la ligne qui vient d'être insérée. Pour refuser une commande si le stock est insuffisant, on utiliserait un trigger <b>BEFORE</b> INSERT.</p>`,
 points:["Réponse : trigger","AFTER INSERT ON ligne_commande FOR EACH ROW","Utilisation de NEW","DELIMITER"]},
{id:"tx_a4",th:"Automatisation",titre:"Prix TTC dans les requêtes",
 enonce:`<p>Table produit(<u>id</u>, titre, prix_ht, taux_tva). On veut écrire <code>SELECT titre, prix_ttc(id) FROM produit;</code></p>`,
 q:"Quel outil ? Écrire le code.",
 r:`<p><b>Fonction</b> : elle calcule et <b>renvoie une valeur</b> utilisée dans un SELECT.</p><pre>DELIMITER $$
CREATE FUNCTION prix_ttc(p_id INT) RETURNS DECIMAL(10,2)
BEGIN
  DECLARE r DECIMAL(10,2);
  SELECT prix_ht * (1 + taux_tva) INTO r FROM produit WHERE id = p_id;
  RETURN r;
END$$
DELIMITER ;
SELECT titre, prix_ttc(id) FROM produit;</pre>`,
 points:["Réponse : fonction","RETURNS + RETURN","SELECT … INTO","Appel dans un SELECT"]},
{id:"tx_a5",th:"Automatisation",titre:"Historique des salaires",
 enonce:`<p>Table employe(<u>id</u>, nom, salaire). On veut garder automatiquement l'historique de chaque changement de salaire (ancien, nouveau, date).</p>`,
 q:"Créer la table d'historique et le mécanisme qui l'alimente.",
 r:`<pre>CREATE TABLE historique_salaire (
  id INT PRIMARY KEY AUTO_INCREMENT,
  id_employe INT NOT NULL,
  ancien DECIMAL(10,2), nouveau DECIMAL(10,2),
  date_changement DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_employe) REFERENCES employe(id)
);
DELIMITER $$
CREATE TRIGGER trg_hist_salaire AFTER UPDATE ON employe
FOR EACH ROW
BEGIN
  IF NOT (NEW.salaire <=> OLD.salaire) THEN
    INSERT INTO historique_salaire (id_employe, ancien, nouveau)
    VALUES (NEW.id, OLD.salaire, NEW.salaire);
  END IF;
END$$
DELIMITER ;</pre><p>Même principe que le TD Automatisation ex.3 (historisation). <code><=></code> gère les NULL ; le IF évite d'historiser un UPDATE qui ne touche pas au salaire.</p>`,
 points:["Table d'historique avec FK et date par défaut","Trigger AFTER UPDATE","OLD et NEW utilisés","Test du changement (IF)"]},
{id:"tx_a6",th:"Automatisation",titre:"Virement bancaire",
 enonce:`<p>Table compte(<u>id</u>, titulaire, solde). Un virement de 100 € du compte 1 vers le compte 2 se fait en deux UPDATE.</p>`,
 q:"Que se passe-t-il si le serveur tombe entre les deux UPDATE ? Comment l'éviter ? Écrire le SQL.",
 r:`<p>Sans précaution, le compte 1 est débité mais le 2 n'est jamais crédité : 100 € disparaissent. Il faut une <b>transaction</b> : <b>atomicité</b> (tout ou rien) et <b>durabilité</b> une fois validée (ACID).</p><pre>START TRANSACTION;
UPDATE compte SET solde = solde - 100 WHERE id = 1;
UPDATE compte SET solde = solde + 100 WHERE id = 2;
COMMIT;      -- en cas d'erreur : ROLLBACK;</pre>`,
 points:["Problème expliqué (incohérence)","Transaction START / COMMIT / ROLLBACK","Atomicité (ACID) citée"]},
{id:"tx_a7",th:"Automatisation",titre:"Droits d'accès",
 enonce:`<p>Base boutique. L'application web (serveur 10.0.0.5) doit lire et modifier les données mais pas la structure. Un analyste doit seulement consulter, depuis le poste local. Plus tard, l'analyste ne doit plus voir la table client.</p>`,
 q:"Écrire les requêtes de gestion des droits et nommer le principe appliqué.",
 r:`<pre>GRANT SELECT, INSERT, UPDATE, DELETE ON boutique.* TO 'appli'@'10.0.0.5';
GRANT SELECT ON boutique.* TO 'analyste'@'localhost';
REVOKE SELECT ON boutique.* FROM 'analyste'@'localhost';
GRANT SELECT ON boutique.produit TO 'analyste'@'localhost';   -- puis table par table, sauf client</pre><p>Principe du <b>moindre privilège</b> : chacun n'a que les droits nécessaires, la connexion est limitée par IP, seul l'administrateur modifie la structure (pas de CREATE/ALTER/DROP pour l'appli).</p><p class="tip">En MySQL on ne peut pas « soustraire » une table d'un droit donné sur <code>boutique.*</code> : on retire le droit global puis on donne table par table.</p>`,
 points:["GRANT avec utilisateur@hôte","Pas de droits de structure pour l'appli","REVOKE","Moindre privilège cité"]}
];
