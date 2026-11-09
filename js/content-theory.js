/* QCM théorie (exercice 3 de l'annale), conception (exercice 1), sujets blancs. */
window.QCM = [
/* --- Familles SQL --- */
{id:"q01",th:"Langage SQL",q:"<code>CREATE TABLE</code>, <code>ALTER TABLE</code>, <code>DROP TABLE</code> appartiennent au…",o:["DML (Data Manipulation Language)","DDL (Data Definition Language)","DCL (Data Control Language)","TCL (Transaction Control Language)"],a:1,e:"DDL = définir la <b>structure</b>. DML = SELECT/INSERT/UPDATE/DELETE (les données). DCL = GRANT/REVOKE (droits). TCL = START TRANSACTION/COMMIT/ROLLBACK."},
{id:"q02",th:"Langage SQL",q:"<code>GRANT</code> et <code>REVOKE</code> appartiennent au…",o:["DDL","DML","DCL","TCL"],a:2,e:"DCL : gestion des droits. <code>GRANT SELECT ON ma_table TO 'mark'@'localhost';</code> / <code>REVOKE UPDATE ON ma_table FROM 'mark'@'localhost';</code>"},
{id:"q03",th:"Langage SQL",q:"Quelle est la différence entre WHERE et HAVING ?",o:["Aucune, ce sont des synonymes","WHERE filtre les lignes avant le regroupement, HAVING filtre les groupes après le GROUP BY","HAVING s'utilise seulement avec ORDER BY","WHERE ne fonctionne qu'avec les nombres"],a:1,e:"Une condition qui contient un agrégat (COUNT, SUM…) va dans HAVING."},
{id:"q04",th:"Langage SQL",q:"Comment tester qu'une colonne n'a pas de valeur ?",o:["col = NULL","col == ''","col IS NULL","col = 0"],a:2,e:"NULL n'est égal à rien (même pas à NULL) : seul <code>IS NULL</code> fonctionne."},
{id:"q05",th:"Langage SQL",q:"Que renvoie un LEFT JOIN par rapport à un INNER JOIN ?",o:["Moins de lignes","Les mêmes lignes + les lignes de la table de gauche sans correspondance (complétées par NULL)","Uniquement les lignes sans correspondance","Le produit cartésien"],a:1,e:"Typique pour « les clients qui n'ont jamais commandé » : LEFT JOIN puis WHERE f.id IS NULL."},
/* --- Contraintes --- */
{id:"q06",th:"Contraintes",q:"Quelle contrainte garantit qu'une colonne référence une ligne existante d'une autre table ?",o:["UNIQUE","CHECK","FOREIGN KEY … REFERENCES","NOT NULL"],a:2,e:"La clé étrangère assure l'intégrité référentielle."},
{id:"q07",th:"Contraintes",q:"Que fait <code>ON DELETE CASCADE</code> sur une clé étrangère factures.client_id ?",o:["Empêche de supprimer un client","Supprime automatiquement les factures du client supprimé","Met client_id à NULL","Supprime la table factures"],a:1,e:"ON DELETE SET NULL mettrait la référence à NULL ; sans option, la suppression du client est refusée s'il a des factures."},
{id:"q08",th:"Contraintes",q:"Clé primaire vs clé candidate :",o:["C'est la même chose","Une clé candidate est un ensemble de colonnes sans doublon ; la clé primaire est celle qu'on choisit parmi les candidates","La clé primaire peut contenir des doublons","Une table a plusieurs clés primaires"],a:1,e:"Définitions du cours (règles de conception)."},
/* --- Normalisation --- */
{id:"q09",th:"Normalisation",q:"Une colonne <code>produits</code> contient « 1, 2, 3 ». Quelle forme normale est violée ?",o:["1NF","2NF","3NF","BCNF"],a:0,e:"1NF : une seule valeur (atomique) par case, jamais une liste. Correction : une table de jointure facture_produit."},
{id:"q10",th:"Normalisation",q:"Table (<u>etudiant, uv</u>, note, date_naissance). date_naissance ne dépend que de etudiant. Quelle forme normale est violée ?",o:["1NF","2NF","3NF","Aucune"],a:1,e:"2NF : chaque colonne non clé dépend de <b>toute</b> la clé. date_naissance dépend d'une partie de la clé → dépendance partielle. On sort (etudiant, date_naissance) dans une autre table."},
{id:"q11",th:"Normalisation",q:"Table (<u>facture_id, article_id</u>, quantite, prix_unitaire, total). Quelle forme normale est violée ?",o:["1NF","2NF","3NF","Aucune"],a:2,e:"total se déduit de quantite × prix_unitaire (attributs non clé) → dépendance transitive → pas 3NF. Solution : supprimer total (le calculer dans la requête)."},
{id:"q12",th:"Normalisation",q:"Une table dont la clé primaire est <b>une seule colonne</b> et qui respecte la 1NF est forcément…",o:["en 2NF","en 3NF","en BCNF","non normalisée"],a:0,e:"La 2NF ne concerne que les clés composées : avec une clé simple, aucune dépendance « partielle » n'est possible. Il faut ensuite vérifier la 3NF (pas de dépendance entre colonnes non clé)."},
{id:"q13",th:"Normalisation",q:"Table commande(<u>id</u>, date, id_client, nom_client, ville_client). Problème ?",o:["Pas en 1NF","Pas en 2NF","Pas en 3NF : nom_client et ville_client dépendent de id_client (non clé)","Elle est parfaitement normalisée"],a:2,e:"Dépendance transitive id → id_client → nom_client. On crée client(<u>id_client</u>, nom, ville) et commande garde #id_client."},
{id:"q14",th:"Normalisation",q:"Pourquoi stocker l'âge d'une personne est une mauvaise idée ?",o:["Ça prend trop de place","Il faut mettre à jour la base à chaque anniversaire ; stocker la date de naissance","L'âge n'est pas un nombre","C'est interdit en 1NF"],a:1,e:"Erreur de conception classique du cours : stocker une donnée qui change avec le temps alors qu'on peut la calculer."},
{id:"q15",th:"Normalisation",q:"À partir de quelle forme normale considère-t-on (informellement) une base comme « normalisée » ?",o:["1NF","2NF","3NF","5NF"],a:2,e:"Cours : une base est considérée normalisée si elle est au moins en 3NF. Dénormaliser est parfois justifié (performances)."},
/* --- Optimisation --- */
{id:"q16",th:"Optimisation",q:"Quel est le principal intérêt d'un index ?",o:["Réduire la taille de la table","Passer d'une recherche en O(n) à O(log n) sur la colonne indexée","Accélérer les INSERT","Remplacer la clé primaire"],a:1,e:"L'index est une sous-table triée (arbre) : ~20 comparaisons au lieu de 500 000 en moyenne pour 1 million de lignes."},
{id:"q17",th:"Optimisation",q:"Pourquoi ne pas mettre des index sur toutes les colonnes ?",o:["MySQL l'interdit","Chaque index occupe de l'espace et ralentit INSERT/UPDATE/DELETE (il faut le mettre à jour)","Les index ralentissent les SELECT","Un index supprime les doublons"],a:1,e:"Par défaut, PK et FK sont indexées ; pour le reste, avec parcimonie, sur les colonnes souvent filtrées/groupées/triées."},
{id:"q18",th:"Optimisation",q:"Pour rechercher un mot dans une longue colonne texte (ex. « Wikipedia » dans BIO), on utilise…",o:["Un index classique + LIKE '%mot%'","Un index FULLTEXT + MATCH(col) AGAINST('mot')","Une vue","Un trigger"],a:1,e:"LIKE '%mot%' ne peut pas utiliser un index classique (joker au début). FULLTEXT est fait pour ça (TD Optimisation ex.2)."},
{id:"q19",th:"Optimisation",q:"Le partitionnement horizontal consiste à…",o:["Découper une table en plusieurs morceaux selon les valeurs d'une colonne (clé de partitionnement)","Séparer les colonnes en plusieurs tables","Dupliquer la base sur plusieurs serveurs","Créer un index"],a:0,e:"Types : par intervalles (RANGE, ex. par année), par liste (LIST), par hachage (HASH), composite. Les requêtes qui filtrent sur la clé ne lisent que la bonne partition ; on supprime vite des vieilles données avec DROP PARTITION."},
{id:"q20",th:"Optimisation",q:"Ordre conseillé dans une requête pour éliminer vite les données inutiles :",o:["jointure, sélection, projection","projection, sélection, jointure","sélection, jointure, tri","tri, jointure, projection"],a:1,e:"Cours (Performances) : projection (ne garder que les colonnes utiles), sélection (filtrer les lignes), puis jointure."},
{id:"q21",th:"Optimisation",q:"Une vue (CREATE VIEW) est…",o:["Une table physique copiée","Une table virtuelle : une requête enregistrée, recalculée à chaque lecture","Un index","Une table temporaire supprimée à la déconnexion"],a:1,e:"La table temporaire (CREATE TEMPORARY TABLE) stocke réellement les données, mais pour la session seulement."},
/* --- Automatisation --- */
{id:"q22",th:"Automatisation",q:"Comment appelle-t-on une procédure stockée et une fonction ?",o:["CALL ma_procedure(); / SELECT ma_fonction();","SELECT les deux","EXEC les deux","Elles s'exécutent toutes seules"],a:0,e:"Une fonction <b>retourne une valeur</b> (RETURNS … RETURN …) et s'utilise dans une requête ; une procédure exécute des actions et ne retourne pas de valeur (CALL)."},
{id:"q23",th:"Automatisation",q:"Qu'est-ce qui se déclenche automatiquement AVANT/APRÈS un INSERT, UPDATE ou DELETE sur une table ?",o:["Une procédure","Un événement (EVENT)","Un déclencheur (TRIGGER)","Une vue"],a:2,e:"<code>CREATE TRIGGER nom AFTER INSERT ON table FOR EACH ROW …</code> ; on accède aux valeurs avec NEW.col (et OLD.col pour UPDATE/DELETE)."},
{id:"q24",th:"Automatisation",q:"Qu'est-ce qui s'exécute périodiquement (toutes les heures, chaque jour…) ?",o:["Un trigger","Un événement : CREATE EVENT … ON SCHEDULE EVERY 1 DAY DO …","Une fonction","Une transaction"],a:1,e:"Il faut que le planificateur soit actif : <code>SET GLOBAL event_scheduler = ON;</code>. Ponctuel : <code>ON SCHEDULE AT CURRENT_TIMESTAMP + INTERVAL 1 DAY</code>."},
{id:"q25",th:"Automatisation",q:"À quoi sert <code>DELIMITER $$</code> avant un CREATE PROCEDURE / FUNCTION / TRIGGER ?",o:["À commenter le code","À ce que MySQL ne prenne pas les ; internes au bloc BEGIN…END pour la fin de la déclaration","À créer une variable","À accélérer la requête"],a:1,e:"On remet <code>DELIMITER ;</code> à la fin."},
{id:"q26",th:"Automatisation",q:"Supprimer manuellement (à la demande) les mesures de plus de 5 ans : que recommander ?",o:["Une fonction","Un trigger","Une procédure stockée appelée par CALL","Un événement"],a:2,e:"Annale A23 3c : action à la demande, sans valeur de retour → procédure. Fonction = doit retourner une valeur ; trigger = réagit à une modification ; événement = déclenché par le temps."},
{id:"q27",th:"Automatisation",q:"Avec un trigger dans un UPDATE, comment détecter qu'une valeur a changé, y compris vers/depuis NULL ?",o:["NEW.col != OLD.col","NOT (NEW.col <=> OLD.col)","NEW.col IS OLD.col","On ne peut pas"],a:1,e:"<code><=></code> est l'égalité « NULL-safe » de MySQL (TD Automatisation ex.3). <code>!=</code> renvoie NULL si une des valeurs est NULL."},
{id:"q28",th:"Automatisation",q:"Pourquoi utiliser triggers et événements avec parcimonie ?",o:["Ils sont lents à écrire","Ils sont invisibles quand on lance une requête : ils cachent des opérations supplémentaires","Ils suppriment des données","Ils ne marchent pas sous MySQL"],a:1,e:"Cours (Précautions) : les réserver à la cohérence de la base et/ou à la performance."},
/* --- Transactions / admin --- */
{id:"q29",th:"Transactions & admin",q:"Que signifie le A de ACID ?",o:["Accessibilité","Atomicité : tout ou rien","Authentification","Agrégation"],a:1,e:"ACID = Atomicité (tout ou rien), Cohérence (d'un état valide à un autre), Isolation (transactions simultanées isolées), Durabilité (une fois validé, c'est conservé même en cas de panne)."},
{id:"q30",th:"Transactions & admin",q:"Quelle instruction annule toutes les requêtes depuis le dernier COMMIT ?",o:["UNDO","ROLLBACK","REVOKE","DROP"],a:1,e:"<code>START TRANSACTION; … COMMIT;</code> valide ; <code>ROLLBACK;</code> annule."},
{id:"q31",th:"Transactions & admin",q:"Règle fondamentale n°1 de la sécurité des accès :",o:["Tout le monde est administrateur","Attribution du moindre privilège","Mot de passe identique pour tous","Ouvrir la base à toutes les IP"],a:1,e:"Chaque utilisateur/application n'a que les droits strictement nécessaires (et seul l'admin modifie la structure)."},
{id:"q32",th:"Transactions & admin",q:"Comment stocker un mot de passe en base ?",o:["En clair","Son empreinte par une fonction de hachage (on compare H(saisie) avec H stocké)","Chiffré de façon réversible dans une colonne publique","Dans le nom de la table"],a:1,e:"TD DDL ex.3 : une fonction de hachage est facile à calculer et quasi impossible à inverser."},
{id:"q33",th:"Transactions & admin",q:"Historisation : on a déplacé les vieux enregistrements dans une table « historique ». Pour une requête sur TOUTES les données, on…",o:["fait une jointure INNER JOIN","réunit les deux tables avec UNION ALL","ne peut plus","utilise GROUP BY"],a:1,e:"Cours (Déclencheurs - Historisation)."}
];

/* Exercices de conception (exercice 1 de l'annale) */
window.CARDI = [
{id:"c01",q:"« Un client possède plusieurs factures ; une facture appartient à un seul client. »",o:["1:1","1:N","N:N"],a:1,t:"Clé étrangère <code>#id_client</code> dans <b>facture</b> (le côté N)."},
{id:"c02",q:"« Un utilisateur peut commenter plusieurs photos ; une photo peut être commentée par plusieurs utilisateurs. »",o:["1:1","1:N","N:N"],a:2,t:"Table de jointure <b>commentaire</b>(#id_utilisateur, #id_photo, texte, date)."},
{id:"c03",q:"« Un marin pilote un voilier ; un voilier n'a qu'un seul pilote. »",o:["1:1","1:N","N:N"],a:0,t:"Cours : en général on regroupe les deux entités dans une seule table (ou FK UNIQUE d'un côté)."},
{id:"c04",q:"« Un employé appartient à un seul service ; un service compte plusieurs employés. » (TD7 ex.2)",o:["1:1","1:N","N:N"],a:1,t:"<b>employe</b>(<u>code</u>, nom, prenom, adresse, #id_service)."},
{id:"c05",q:"« Une faute est classifiée dans au moins une sous-catégorie, et peut l'être dans plusieurs ; une sous-catégorie contient plusieurs fautes. » (TD7 ex.3)",o:["1:1","1:N","N:N"],a:2,t:"Table de jointure <b>classification</b>(#code_faute, #id_sous_categorie), cardinalité 1..n côté faute."},
{id:"c06",q:"« Un étudiant s'inscrit à plusieurs UV ; une UV accueille plusieurs étudiants ; on garde la note. »",o:["1:1","1:N","N:N"],a:2,t:"<b>inscription</b>(#id_etudiant, #id_uv, semestre, annee, note) : l'association porte des attributs."},
{id:"c07",q:"« Chaque bus suit un itinéraire ; un itinéraire est suivi par plusieurs bus. » (Annale A23)",o:["1:1","1:N","N:N"],a:1,t:"<b>bus</b>(<u>num_bus</u>, …, #id_itineraire)."},
{id:"c08",q:"« Un itinéraire dessert plusieurs arrêts ; un arrêt est desservi par plusieurs itinéraires (dans un certain ordre). » (Annale A23)",o:["1:1","1:N","N:N"],a:2,t:"<b>desserte</b>(#id_itineraire, #id_arret, rang) — le rang est un attribut de l'association."},
{id:"c09",q:"« Une équipe peut avoir un ou plusieurs entraîneurs ; un entraîneur entraîne une équipe (mais pourrait en changer). » (Soccer : team_coaches)",o:["1:1","1:N","N:N"],a:2,t:"Dans l'annale c'est modélisé par la table de jointure <b>team_coaches</b>(team_id, coach_id)."},
{id:"c10",q:"« Chaque produit est basé sur un modèle ; un modèle est utilisé par plusieurs produits. » (TD7 ex.3)",o:["1:1","1:N","N:N"],a:1,t:"<b>produit</b>(…, #code_modele)."},
{id:"c11",q:"« Une opération du registre concerne un bus et est d'un type (plein, révision…) ; un type concerne plusieurs opérations. » (Annale A23) — relation opération ↔ type :",o:["1:1","1:N","N:N"],a:1,t:"<b>operation</b>(<u>id</u>, date, #num_bus, #id_type) et <b>type_operation</b>(<u>id_type</u>, libelle)."},
{id:"c12",q:"« Un compte joueur possède plusieurs personnages ; un personnage appartient à un compte. » (TD DDL)",o:["1:1","1:N","N:N"],a:1,t:"<b>characters</b>(…, #id_player_account)."}
];

window.CONCEPTION_METHODE = `
<h3>Méthode en 6 étapes (≈ 25 min à l'examen)</h3>
<ol>
<li><b>Souligne les noms communs</b> de l'énoncé → candidats <b>entités</b> (bus, conducteur, itinéraire…). Nom propre = une entité concrète (une ligne), pas un type.</li>
<li><b>Verbes transitifs</b> (« conduit », « suit », « possède ») → <b>associations</b>.</li>
<li><b>Adjectifs / compléments</b> (nom, téléphone, distance) → <b>attributs</b>. Choisis un <u>identifiant</u> par entité (souligné).</li>
<li>Pour chaque association, pose les 2 questions : « un A est lié à combien de B ? » et « un B à combien de A ? » → <b>cardinalités</b> (0..1, 1, 0..n, 1..n).</li>
<li>Repère les attributs <b>qui dépendent du couple</b> (date d'affectation, note, quantité, rang) → ils vont <b>sur l'association</b>.</li>
<li>Indique <b>la notation choisie</b> (Chen, MCD ou UML) — c'est demandé explicitement !</li>
</ol>
<h3>Notation de Chen (celle des TD)</h3>
<ul><li>Entité = <b>rectangle</b>, association = <b>losange</b>, attribut = <b>ovale</b> (identifiant souligné), cardinalités sur les traits.</li></ul>
<h3>Passage au schéma relationnel</h3>
<table class="mini"><tr><th>Cas</th><th>Traduction</th></tr>
<tr><td>Entité</td><td>Une table ; attributs → colonnes ; identifiant → clé primaire</td></tr>
<tr><td>Association 1:N</td><td>Clé étrangère dans la table du <b>côté N</b></td></tr>
<tr><td>Association N:N</td><td><b>Table de jointure</b> : clé primaire = couple des 2 clés étrangères (+ attributs de l'association)</td></tr>
<tr><td>Association 1:1</td><td>On regroupe en général dans une seule table</td></tr>
<tr><td>Héritage « par référence »</td><td>Table mère + table fille dont la PK est aussi FK vers la mère</td></tr></table>
<h3>Pièges fréquents</h3>
<ul><li>Mettre une liste dans un attribut (« arrêts » = liste) → viole 1NF : c'est une entité + une association.</li>
<li>Stocker une valeur calculable (âge, total) → viole 3NF / à éviter.</li>
<li>Un « type » répété (type d'opération, catégorie, modèle) → en faire une entité si sa liste est contrôlée.</li>
<li>« au fil du temps » / « historique » → l'association porte des dates (date_debut, date_fin).</li></ul>`;

/* ---------- Sujets blancs ---------- */
const COMMON_HEADER = `<p class="consigne">Calculatrice et documents interdits sauf <b>une feuille A4 recto-verso manuscrite et nominative</b>. Barème indicatif. <b>Durée 1h30.</b></p>`;

window.SUJETS = [
{id:"A23", titre:"Annale A23 (le vrai sujet) + corrigé proposé", base:"soccer",
 intro: COMMON_HEADER + `<p class="warn">Le corrigé ci-dessous est <b>proposé par l'app</b> (le dossier ne contient pas de corrigé officiel de l'annale). Il suit le cours et les corrections des TD.</p>`,
 ex1:{bareme:7, enonce:`<p>Vous travaillez pour une entreprise de transport urbain qui gère un réseau de bus. Les bus peuvent être de différents <b>modèles</b> et ont un <b>numéro d'identification unique</b>. Chaque bus est affecté à un conducteur spécifique, mais <b>un conducteur peut être affecté à plusieurs bus au fil du temps</b>. Chaque conducteur a un identifiant unique, un nom, un numéro de téléphone et une adresse. Un bus ne peut être conduit que par un conducteur à la fois. Chaque bus suit un <b>itinéraire</b> qui a un nom, des <b>points d'arrêt</b> et une distance. Les bus fonctionnent selon un <b>horaire</b> (jours de la semaine, heure de départ, itinéraire associé). Un <b>registre</b> gère les opérations courantes effectuées sur les bus, de différents <b>types</b> (« plein de carburant », « révision »…).</p>
<p><b>Dessiner le schéma entité-association</b> (Chen, MCD ou UML relationnel ; indiquer la notation choisie).</p>`,
  corrige:`<p><b>Notation : Chen</b> (entités, associations, cardinalités).</p>
<table class="mini"><tr><th>Entité</th><th>Attributs (identifiant souligné)</th></tr>
<tr><td>CONDUCTEUR</td><td><u>id_conducteur</u>, nom, telephone, adresse</td></tr>
<tr><td>BUS</td><td><u>num_bus</u></td></tr>
<tr><td>MODELE</td><td><u>id_modele</u>, libelle</td></tr>
<tr><td>ITINERAIRE</td><td><u>id_itineraire</u>, nom, distance</td></tr>
<tr><td>ARRET</td><td><u>id_arret</u>, nom</td></tr>
<tr><td>HORAIRE</td><td><u>id_horaire</u>, jour_semaine, heure_depart</td></tr>
<tr><td>OPERATION (registre)</td><td><u>id_operation</u>, date_operation, commentaire</td></tr>
<tr><td>TYPE_OPERATION</td><td><u>id_type</u>, libelle</td></tr></table>
<table class="mini"><tr><th>Association</th><th>Cardinalités</th><th>Remarque</th></tr>
<tr><td>BUS — <i>est de</i> — MODELE</td><td>BUS 1,1 / MODELE 0,n</td><td>1:N</td></tr>
<tr><td>CONDUCTEUR — <i>est affecté à</i> — BUS</td><td>CONDUCTEUR 0,n / BUS 1,n</td><td>N:N « au fil du temps » : attributs <b>date_debut, date_fin</b> sur l'association</td></tr>
<tr><td>BUS — <i>suit</i> — ITINERAIRE</td><td>BUS 1,1 / ITINERAIRE 0,n</td><td>1:N</td></tr>
<tr><td>ITINERAIRE — <i>dessert</i> — ARRET</td><td>ITINERAIRE 1,n / ARRET 1,n</td><td>N:N avec attribut <b>rang</b> (ordre)</td></tr>
<tr><td>HORAIRE — <i>concerne</i> — ITINERAIRE</td><td>HORAIRE 1,1 / ITINERAIRE 0,n</td><td>1:N</td></tr>
<tr><td>OPERATION — <i>porte sur</i> — BUS</td><td>OPERATION 1,1 / BUS 0,n</td><td>1:N</td></tr>
<tr><td>OPERATION — <i>est de type</i> — TYPE_OPERATION</td><td>OPERATION 1,1 / TYPE 0,n</td><td>1:N</td></tr></table>
<p><b>Schéma relationnel déduit</b> (bonus, montre que le modèle est cohérent) :</p>
<pre>modele(<u>id_modele</u>, libelle)
bus(<u>num_bus</u>, #id_modele, #id_itineraire)
conducteur(<u>id_conducteur</u>, nom, telephone, adresse)
affectation(<u>#num_bus, date_debut</u>, #id_conducteur, date_fin)
itineraire(<u>id_itineraire</u>, nom, distance)
arret(<u>id_arret</u>, nom)
desserte(<u>#id_itineraire, #id_arret</u>, rang)
horaire(<u>id_horaire</u>, jour_semaine, heure_depart, #id_itineraire)
type_operation(<u>id_type</u>, libelle)
operation(<u>id_operation</u>, date_operation, commentaire, #num_bus, #id_type)</pre>
<p class="tip">Variante acceptable : si on ne garde pas l'historique, CONDUCTEUR–BUS en 1:N (FK id_conducteur dans bus). L'énoncé dit « au fil du temps », donc l'historisation avec dates est plus juste.</p>`,
  points:["Notation choisie indiquée","Entités BUS, CONDUCTEUR, ITINERAIRE, HORAIRE, OPERATION présentes","Arrêts modélisés comme entité (pas une liste dans un attribut)","Type d'opération (et/ou modèle) en entité séparée","Association conducteur–bus avec dates (historique)","Cardinalités sur toutes les associations","Identifiants soulignés"]},
 ex2:{bareme:7, enonce:`<p>Base « Soccer » (Euro 2016). Écrire les requêtes SQL :</p>`, exos:["e60","e23","e35","e40","e61","e62"]},
 ex3:{bareme:6, enonce:`<p>Schéma : <b>mesure(<u>id</u>, date, valeur, #id_capteur)</b>. Valeurs mesurées par des capteurs (nombre fini), identifiées par un id unique, associées à une date (plusieurs valeurs possibles pour une même date). Aucune optimisation n'a été faite. Les principales requêtes sont des <b>agrégations sur les valeurs, groupées par capteur</b>. On souhaite aussi <b>supprimer les valeurs de plus de 5 ans</b>.</p>`,
  questions:[
   {q:"a) Le schéma est-il normalisé ? Expliquer, corriger si besoin.", r:`<p><b>Oui, il est en 3NF.</b> 1NF : toutes les valeurs sont atomiques. 2NF : la clé primaire <u>id</u> est simple, donc pas de dépendance partielle possible. 3NF : aucune colonne non clé ne détermine une autre (date, valeur et id_capteur ne dépendent que de id).</p><p>Remarque attendue : comme il existe un nombre fini de capteurs, <b>id_capteur doit être une clé étrangère</b> vers une table <code>capteur(<u>id_capteur</u>, …)</code> (intégrité référentielle). Si on stockait des infos du capteur (nom, emplacement) dans mesure, on violerait la 3NF.</p>`, points:["Conclusion : normalisé (3NF)","Justification 1NF / 2NF (clé simple) / 3NF","Table capteur + clé étrangère"]},
   {q:"b) Suggérer 3 stratégies d'optimisation (avec SQL), impacts positifs et négatifs.", r:`<ol><li><b>Index sur id_capteur</b> (voire index composite couvrant) :<pre>CREATE INDEX idx_mesure_capteur ON mesure(id_capteur, valeur);</pre>+ GROUP BY/WHERE par capteur bien plus rapides (O(log n)), l'index couvrant évite de lire la table. − Espace disque, INSERT plus lents (index à mettre à jour) — gênant si les capteurs écrivent beaucoup.</li>
<li><b>Partitionnement</b> par capteur (HASH/LIST) ou par date (RANGE) :<pre>ALTER TABLE mesure PARTITION BY HASH(id_capteur) PARTITIONS 8;
-- ou par année :
ALTER TABLE mesure PARTITION BY RANGE (YEAR(date)) (
  PARTITION p2023 VALUES LESS THAN (2024),
  PARTITION p2024 VALUES LESS THAN (2025),
  PARTITION pmax VALUES LESS THAN MAXVALUE);</pre>+ une requête sur un capteur (ou une période) ne lit qu'une partition ; la purge par date devient un simple <code>DROP PARTITION</code>. − Plus complexe à administrer ; en MySQL la clé de partition doit faire partie de la clé primaire (PK (id, id_capteur) ou (id, date)) ; aucune gain pour les requêtes qui parcourent tout.</li>
<li><b>Table d'agrégats pré-calculés</b> mise à jour par trigger (dénormalisation contrôlée) :<pre>CREATE TABLE stats_capteur (id_capteur INT PRIMARY KEY, nb INT, somme DOUBLE, mini FLOAT, maxi FLOAT);
DELIMITER $$
CREATE TRIGGER trg_stats AFTER INSERT ON mesure FOR EACH ROW
BEGIN
  INSERT INTO stats_capteur VALUES (NEW.id_capteur, 1, NEW.valeur, NEW.valeur, NEW.valeur)
  ON DUPLICATE KEY UPDATE nb = nb + 1, somme = somme + NEW.valeur,
    mini = LEAST(mini, NEW.valeur), maxi = GREATEST(maxi, NEW.valeur);
END$$
DELIMITER ;</pre>+ lecture instantanée des moyennes/min/max (AVG = somme/nb). − Redondance (base dénormalisée), chaque INSERT coûte plus, cohérence à surveiller (DELETE/UPDATE à gérer aussi).</li></ol><p class="tip">Autres stratégies valables : index sur date, historisation des vieilles mesures dans une table archive (UNION ALL si besoin), type de colonne adapté (FLOAT plutôt que DOUBLE/TEXT).</p>`, points:["3 stratégies différentes","SQL écrit pour chacune","Avantage ET inconvénient pour chacune","Lien avec « agrégations par capteur »"]},
   {q:"c) Suppression déclenchée manuellement : procédure, événement, déclencheur ou fonction ? Pourquoi ?", r:`<p><b>Une procédure stockée</b>, appelée à la demande avec CALL :</p><pre>DELIMITER $$
CREATE PROCEDURE purge_mesures()
BEGIN
  DELETE FROM mesure WHERE date < NOW() - INTERVAL 5 YEAR;
END$$
DELIMITER ;
CALL purge_mesures();</pre><p>Pourquoi pas les autres : une <b>fonction</b> doit retourner une valeur et sert dans une requête (pas faite pour modifier des données) ; un <b>déclencheur</b> réagit automatiquement à un INSERT/UPDATE/DELETE (pas manuel) ; un <b>événement</b> est déclenché par le temps (pas manuel).</p>`, points:["Réponse : procédure","Justification par élimination des 3 autres","Requête DELETE avec INTERVAL 5 YEAR"]},
   {q:"d) Suppression périodique : que recommander ? Pourquoi ?", r:`<p><b>Un événement</b> (planificateur MySQL), qui peut réutiliser la procédure :</p><pre>SET GLOBAL event_scheduler = ON;
CREATE EVENT ev_purge_mesures
ON SCHEDULE EVERY 1 DAY
DO CALL purge_mesures();</pre><p>L'événement est un « déclencheur temporel » exécuté selon une périodicité (EVERY). Pas besoin d'intervention humaine ; à planifier pendant les heures creuses.</p>`, points:["Réponse : événement (EVENT)","ON SCHEDULE EVERY …","event_scheduler = ON mentionné"]}
  ]}
},
{id:"B1", titre:"Sujet blanc n°1 — Médiathèque / Soccer / Commandes", base:"soccer",
 intro: COMMON_HEADER,
 ex1:{bareme:7, enonce:`<p>Une médiathèque municipale souhaite informatiser ses prêts. Elle possède des <b>documents</b> (livres, DVD, BD…) identifiés par une cote, avec un titre et une année de parution ; chaque document est d'un <b>type</b>. Un document peut avoir <b>plusieurs auteurs</b> et un auteur peut avoir écrit plusieurs documents ; on connaît le nom et la nationalité des auteurs. La médiathèque possède souvent <b>plusieurs exemplaires</b> d'un même document, chacun avec un numéro et un état (neuf, bon, abîmé). Les <b>adhérents</b> (numéro, nom, adresse, email, date d'adhésion) <b>empruntent des exemplaires</b> : on enregistre la date d'emprunt, la date de retour prévue et la date de retour effective. Un adhérent peut emprunter plusieurs exemplaires ; un exemplaire est emprunté de nombreuses fois au fil du temps.</p><p><b>Dessiner le schéma entité-association</b> (indiquer la notation).</p>`,
  corrige:`<p><b>Notation : Chen.</b></p><table class="mini"><tr><th>Entité</th><th>Attributs</th></tr>
<tr><td>TYPE_DOCUMENT</td><td><u>id_type</u>, libelle</td></tr><tr><td>DOCUMENT</td><td><u>cote</u>, titre, annee</td></tr>
<tr><td>AUTEUR</td><td><u>id_auteur</u>, nom, nationalite</td></tr><tr><td>EXEMPLAIRE</td><td><u>num_exemplaire</u>, etat</td></tr>
<tr><td>ADHERENT</td><td><u>num_adherent</u>, nom, adresse, email, date_adhesion</td></tr></table>
<table class="mini"><tr><th>Association</th><th>Cardinalités</th></tr>
<tr><td>DOCUMENT — <i>est de type</i> — TYPE</td><td>1,1 / 0,n (1:N)</td></tr>
<tr><td>DOCUMENT — <i>écrit par</i> — AUTEUR</td><td>1,n / 1,n (N:N)</td></tr>
<tr><td>EXEMPLAIRE — <i>est un exemplaire de</i> — DOCUMENT</td><td>1,1 / 1,n (1:N)</td></tr>
<tr><td>ADHERENT — <i>emprunte</i> — EXEMPLAIRE</td><td>0,n / 0,n (N:N) avec <b>date_emprunt, date_retour_prevue, date_retour_effective</b></td></tr></table>
<pre>type_document(<u>id_type</u>, libelle)
document(<u>cote</u>, titre, annee, #id_type)
auteur(<u>id_auteur</u>, nom, nationalite)
ecrit(<u>#cote, #id_auteur</u>)
exemplaire(<u>num_exemplaire</u>, etat, #cote)
adherent(<u>num_adherent</u>, nom, adresse, email, date_adhesion)
emprunt(<u>#num_adherent, #num_exemplaire, date_emprunt</u>, date_retour_prevue, date_retour_effective)</pre>
<p class="tip">Piège : distinguer DOCUMENT (l'œuvre) et EXEMPLAIRE (l'objet physique). La date d'emprunt entre dans la clé de emprunt car un même adhérent peut réemprunter le même exemplaire.</p>`,
  points:["Notation indiquée","DOCUMENT et EXEMPLAIRE distingués","AUTEUR en N:N avec DOCUMENT","EMPRUNT = association N:N portant les dates","TYPE en entité","Cardinalités complètes"]},
 ex2:{bareme:7, enonce:`<p>Base « Soccer » (même schéma que l'annale). Écrire les requêtes SQL :</p>`, exos:["s1q1","s1q2","s1q3","s1q4","s1q5","s1q6"]},
 ex3:{bareme:6, enonce:`<p>Schéma : <b>commande(<u>id</u>, date_commande, montant, id_client, nom_client, ville_client)</b>. Des millions de commandes. Requêtes fréquentes : <b>chiffre d'affaires par ville</b> et par mois. On veut <b>archiver les commandes de plus de 2 ans</b> dans une table commande_archive.</p>`,
  questions:[
   {q:"a) Le schéma est-il normalisé ?", r:`<p><b>Non, il n'est pas en 3NF.</b> nom_client et ville_client dépendent de id_client, qui n'est pas la clé : dépendance transitive id → id_client → nom_client, ville_client. Conséquences : redondance (le nom est répété à chaque commande), anomalies de mise à jour (déménagement d'un client).</p><pre>client(<u>id_client</u>, nom, ville)
commande(<u>id</u>, date_commande, montant, #id_client)</pre>`, points:["Non 3NF","Dépendance transitive identifiée","Décomposition en client + commande avec FK"]},
   {q:"b) 3 stratégies d'optimisation pour le CA par ville / par mois (SQL, + et −).", r:`<ol><li><b>Index</b> : <code>CREATE INDEX idx_cmd_date ON commande(date_commande);</code> et <code>CREATE INDEX idx_client_ville ON client(ville);</code> (la FK id_client est déjà indexée). + filtres/regroupements rapides. − espace, écritures plus lentes.</li>
<li><b>Partitionnement par date</b> (RANGE sur YEAR ou mois) : <code>ALTER TABLE commande PARTITION BY RANGE (YEAR(date_commande)) (...)</code>. + requêtes par période ne lisent qu'une partition, archivage facile. − administration, PK doit inclure date_commande.</li>
<li><b>Table de statistiques</b> ca_mensuel(ville, mois, total) alimentée par trigger AFTER INSERT ou par événement nocturne. + lecture immédiate. − redondance, coût à l'insertion / données pas à jour si événement.</li></ol>`, points:["3 stratégies","SQL","+ et − pour chacune"]},
   {q:"c) L'archivage doit déplacer les données (INSERT dans l'archive puis DELETE). Comment garantir qu'on ne perd rien si une erreur survient au milieu ?", r:`<p>Avec une <b>transaction</b> (atomicité : tout ou rien) :</p><pre>START TRANSACTION;
INSERT INTO commande_archive SELECT * FROM commande WHERE date_commande < NOW() - INTERVAL 2 YEAR;
DELETE FROM commande WHERE date_commande < NOW() - INTERVAL 2 YEAR;
COMMIT;   -- ou ROLLBACK en cas d'erreur</pre>`, points:["Transaction","START TRANSACTION / COMMIT / ROLLBACK","Atomicité expliquée"]},
   {q:"d) Archivage tous les dimanches à 3h : quel outil ? Et pour une requête sur toutes les commandes (actuelles + archivées) ?", r:`<p>Un <b>événement</b> : <code>CREATE EVENT ev_archive ON SCHEDULE EVERY 1 WEEK STARTS '2026-11-15 03:00:00' DO CALL archiver_commandes();</code> (avec <code>event_scheduler = ON</code>, la logique dans une procédure). Pour tout interroger : <code>SELECT … FROM commande UNION ALL SELECT … FROM commande_archive</code>.</p>`, points:["Événement EVERY 1 WEEK","Procédure appelée","UNION ALL"]}
  ]}
},
{id:"B2", titre:"Sujet blanc n°2 — Clinique vétérinaire / Université / Journaux serveur", base:"universite",
 intro: COMMON_HEADER,
 ex1:{bareme:7, enonce:`<p>Une clinique vétérinaire gère ses <b>propriétaires</b> (identifiant, nom, téléphone, adresse) et leurs <b>animaux</b> (identifiant, nom, date de naissance) ; chaque animal appartient à un seul propriétaire et est d'une <b>espèce</b> (chien, chat, lapin…). Les <b>vétérinaires</b> (identifiant, nom, spécialité) réalisent des <b>consultations</b> : chaque consultation concerne un animal, est faite par un vétérinaire, à une date, avec un motif et un prix. Lors d'une consultation, le vétérinaire peut <b>prescrire plusieurs médicaments</b> (référence, nom, laboratoire) avec une posologie ; un médicament peut être prescrit dans de nombreuses consultations.</p><p><b>Dessiner le schéma entité-association</b> (indiquer la notation).</p>`,
  corrige:`<p><b>Notation : Chen.</b></p><table class="mini"><tr><th>Entité</th><th>Attributs</th></tr>
<tr><td>PROPRIETAIRE</td><td><u>id_proprietaire</u>, nom, telephone, adresse</td></tr><tr><td>ESPECE</td><td><u>id_espece</u>, libelle</td></tr>
<tr><td>ANIMAL</td><td><u>id_animal</u>, nom, date_naissance</td></tr><tr><td>VETERINAIRE</td><td><u>id_veto</u>, nom, specialite</td></tr>
<tr><td>CONSULTATION</td><td><u>id_consultation</u>, date, motif, prix</td></tr><tr><td>MEDICAMENT</td><td><u>reference</u>, nom, laboratoire</td></tr></table>
<table class="mini"><tr><th>Association</th><th>Cardinalités</th></tr>
<tr><td>ANIMAL — <i>appartient à</i> — PROPRIETAIRE</td><td>1,1 / 1,n</td></tr><tr><td>ANIMAL — <i>est de</i> — ESPECE</td><td>1,1 / 0,n</td></tr>
<tr><td>CONSULTATION — <i>concerne</i> — ANIMAL</td><td>1,1 / 0,n</td></tr><tr><td>CONSULTATION — <i>réalisée par</i> — VETERINAIRE</td><td>1,1 / 0,n</td></tr>
<tr><td>CONSULTATION — <i>prescrit</i> — MEDICAMENT</td><td>0,n / 0,n avec <b>posologie</b></td></tr></table>
<pre>proprietaire(<u>id_proprietaire</u>, nom, telephone, adresse)
espece(<u>id_espece</u>, libelle)
animal(<u>id_animal</u>, nom, date_naissance, #id_proprietaire, #id_espece)
veterinaire(<u>id_veto</u>, nom, specialite)
consultation(<u>id_consultation</u>, date, motif, prix, #id_animal, #id_veto)
medicament(<u>reference</u>, nom, laboratoire)
prescription(<u>#id_consultation, #reference</u>, posologie)</pre>`,
  points:["Notation indiquée","CONSULTATION en entité (ou association ternaire justifiée)","Prescription N:N avec posologie","Espèce en entité","Cardinalités complètes"]},
 ex2:{bareme:7, enonce:`<p>Base « Université » : etudiant(<u>id_etudiant</u>, nom, prenom, date_naissance, ville, statut), uv(<u>id_uv</u>, nom, nb_ects), inscription(<u>#id_etudiant, #id_uv, semestre, annee</u>, note_finale). Écrire les requêtes SQL :</p>`, exos:["s2q1","s2q2","s2q3","s2q4","s2q5","s2q6"]},
 ex3:{bareme:6, enonce:`<p>Schéma : <b>journal(<u>id</u>, horodatage, niveau, message, #id_serveur)</b> — des millions de lignes de logs. Requêtes fréquentes : rechercher un <b>mot dans le message</b> (ex. « timeout ») et compter les erreurs par serveur et par jour. Les logs de plus de 90 jours sont inutiles.</p>`,
  questions:[
   {q:"a) Le schéma est-il normalisé ? niveau prend 4 valeurs (INFO, WARN, ERROR, FATAL) : que proposer ?", r:`<p>Oui, en 3NF (clé simple, valeurs atomiques, pas de dépendance entre non-clés). Pour niveau, on peut créer une table <code>niveau(<u>id_niveau</u>, libelle)</code> référencée par FK (intégrité, place) ou un <code>CHECK (niveau IN ('INFO','WARN','ERROR','FATAL'))</code>.</p>`, points:["3NF justifié","Table niveau ou CHECK"]},
   {q:"b) Recherche d'un mot dans message : pourquoi LIKE '%timeout%' est lent et que faire ?", r:`<p>Le joker en début de motif empêche l'utilisation d'un index classique → parcours complet O(n). Solution : <b>index FULLTEXT</b> :</p><pre>ALTER TABLE journal ADD FULLTEXT idx_msg (message);
SELECT * FROM journal WHERE MATCH(message) AGAINST('timeout');</pre><p>+ recherche très rapide. − index volumineux, insertions plus lentes.</p>`, points:["Explication du % initial","FULLTEXT + MATCH AGAINST","+ / −"]},
   {q:"c) Proposer 2 autres optimisations pour « erreurs par serveur et par jour ».", r:`<ol><li><b>Index composite</b> <code>CREATE INDEX idx_srv_date ON journal(id_serveur, horodatage, niveau);</code></li><li><b>Partitionnement RANGE par jour/mois</b> sur horodatage : requêtes sur une période limitées à quelques partitions + purge par DROP PARTITION.</li></ol><p>(ou table d'agrégats journaliers maintenue par trigger/événement)</p>`, points:["Index composite adapté","Partitionnement par date","+ / − cités"]},
   {q:"d) Comment supprimer automatiquement les logs de plus de 90 jours ? Et pour compter en temps réel les erreurs par serveur ?", r:`<p>Suppression périodique → <b>événement</b> : <code>CREATE EVENT ev_purge ON SCHEDULE EVERY 1 DAY DO DELETE FROM journal WHERE horodatage < NOW() - INTERVAL 90 DAY;</code>. Comptage en temps réel → <b>déclencheur</b> AFTER INSERT ON journal qui incrémente une table compteur_erreurs(id_serveur, jour, nb) quand NEW.niveau = 'ERROR'.</p>`, points:["Événement EVERY 1 DAY","Trigger AFTER INSERT avec NEW","Bonne distinction temps / modification"]}
  ]}
},
{id:"B3", titre:"Sujet blanc n°3 — Vélos en libre-service / Boutique / Relevés météo", base:"boutique",
 intro: COMMON_HEADER,
 ex1:{bareme:7, enonce:`<p>Une ville propose des <b>vélos en libre-service</b>. Chaque <b>vélo</b> a un numéro unique, un <b>modèle</b> (classique, électrique… avec une autonomie pour les électriques) et un état. Les vélos sont rangés dans des <b>stations</b> (identifiant, nom, adresse, nombre de places). Les <b>abonnés</b> (identifiant, nom, email, type d'abonnement : annuel, mensuel…) effectuent des <b>locations</b> : on enregistre le vélo, la station et l'heure de départ, la station et l'heure d'arrivée. Un <b>registre de maintenance</b> enregistre les interventions sur les vélos (date, type d'intervention : réparation de frein, recharge…, technicien).</p><p><b>Dessiner le schéma entité-association</b> (indiquer la notation).</p>`,
  corrige:`<p><b>Notation : Chen.</b></p><table class="mini"><tr><th>Entité</th><th>Attributs</th></tr>
<tr><td>MODELE</td><td><u>id_modele</u>, libelle, autonomie (NULL si non électrique)</td></tr><tr><td>VELO</td><td><u>num_velo</u>, etat</td></tr>
<tr><td>STATION</td><td><u>id_station</u>, nom, adresse, nb_places</td></tr><tr><td>TYPE_ABONNEMENT</td><td><u>id_type_abo</u>, libelle, prix</td></tr>
<tr><td>ABONNE</td><td><u>id_abonne</u>, nom, email</td></tr><tr><td>LOCATION</td><td><u>id_location</u>, heure_depart, heure_arrivee</td></tr>
<tr><td>TECHNICIEN</td><td><u>id_technicien</u>, nom</td></tr><tr><td>TYPE_INTERVENTION</td><td><u>id_type</u>, libelle</td></tr><tr><td>INTERVENTION</td><td><u>id_intervention</u>, date</td></tr></table>
<table class="mini"><tr><th>Association</th><th>Cardinalités</th></tr>
<tr><td>VELO — <i>est de</i> — MODELE</td><td>1,1 / 0,n</td></tr><tr><td>ABONNE — <i>a souscrit</i> — TYPE_ABONNEMENT</td><td>1,1 / 0,n</td></tr>
<tr><td>LOCATION — <i>par</i> — ABONNE / <i>de</i> — VELO</td><td>1,1 / 0,n chacune</td></tr>
<tr><td>LOCATION — <i>part de</i> — STATION et <i>arrive à</i> — STATION</td><td>2 associations distinctes : 1,1 / 0,n et 0,1 / 0,n (arrivée inconnue pendant la location)</td></tr>
<tr><td>INTERVENTION — <i>sur</i> — VELO, <i>de type</i> — TYPE, <i>par</i> — TECHNICIEN</td><td>1,1 / 0,n chacune</td></tr></table>
<pre>location(<u>id_location</u>, heure_depart, heure_arrivee, #id_abonne, #num_velo, #id_station_depart, #id_station_arrivee)</pre>
<p class="tip">Point clé : deux associations entre LOCATION et STATION (départ / arrivée) → deux clés étrangères vers la même table.</p>`,
  points:["Notation indiquée","Deux associations vers STATION (départ/arrivée)","Modèle en entité (autonomie)","Registre : intervention + type en entité","Cardinalités complètes"]},
 ex2:{bareme:7, enonce:`<p>Base « Boutique » : client(<u>id</u>, nom, email), categorie(<u>id</u>, titre), produit(<u>id</u>, titre, description, prix, vat_rate, #id_categorie), facture(<u>id</u>, #id_client, date_facture), ligne_facture(<u>#id_facture, #id_produit</u>, quantite). Écrire les requêtes SQL :</p>`, exos:["s3q1","s3q2","s3q3","s3q4","s3q5","s3q6"]},
 ex3:{bareme:6, enonce:`<p>Schéma : <b>releve(<u>id_station, date_heure</u>, temperature, nom_station, altitude_station)</b> : relevés météo à la minute. Requêtes fréquentes : <b>température max de la semaine dernière</b> par station.</p>`,
  questions:[
   {q:"a) Le schéma est-il normalisé ?", r:`<p><b>Non, pas en 2NF</b> : la clé est composée (id_station, date_heure) et nom_station, altitude_station ne dépendent que d'une <b>partie</b> de la clé (id_station). Redondance énorme (répétées chaque minute).</p><pre>station(<u>id_station</u>, nom, altitude)
releve(<u>#id_station, date_heure</u>, temperature)</pre>`, points:["Non 2NF","Dépendance partielle identifiée","Décomposition"]},
   {q:"b) 3 stratégies d'optimisation (SQL, + et −).", r:`<ol><li>La PK (id_station, date_heure) est déjà un index adapté aux filtres « station + période » ; ajouter <code>CREATE INDEX idx_date ON releve(date_heure);</code> pour les requêtes toutes stations. + / − classiques des index.</li><li>Partitionnement RANGE par semaine/mois sur date_heure.</li><li>Table weekly_stats(id_station, week_start, t_min, t_max, t_avg, nb) maintenue par trigger AFTER INSERT (comme le TD Automatisation ex.2, moyenne incrémentale).</li></ol>`, points:["3 stratégies","SQL","+ / −"]},
   {q:"c) Écrire le déclencheur qui met à jour weekly_stats(id_station, week_start, nb, t_min, t_max, t_avg) à chaque nouveau relevé.", r:`<pre>DELIMITER $$
CREATE TRIGGER trg_weekly AFTER INSERT ON releve FOR EACH ROW
BEGIN
  INSERT INTO weekly_stats
  VALUES (NEW.id_station, DATE(NEW.date_heure) - INTERVAL WEEKDAY(NEW.date_heure) DAY,
          1, NEW.temperature, NEW.temperature, NEW.temperature)
  ON DUPLICATE KEY UPDATE
    t_min = LEAST(t_min, NEW.temperature),
    t_max = GREATEST(t_max, NEW.temperature),
    t_avg = (t_avg * nb + NEW.temperature) / (nb + 1),
    nb = nb + 1;   -- en dernier !
END$$
DELIMITER ;</pre><p>PK de weekly_stats : (id_station, week_start).</p>`, points:["AFTER INSERT ON releve FOR EACH ROW","Utilisation de NEW","Calcul incrémental + nb incrémenté en dernier","DELIMITER"]},
   {q:"d) Écrire une fonction qui renvoie la température moyenne d'une station sur une date donnée.", r:`<pre>DELIMITER $$
CREATE FUNCTION temp_moyenne(p_station INT, p_jour DATE) RETURNS FLOAT
BEGIN
  DECLARE m FLOAT;
  SELECT AVG(temperature) INTO m FROM releve
  WHERE id_station = p_station AND DATE(date_heure) = p_jour;
  RETURN m;
END$$
DELIMITER ;
SELECT temp_moyenne(3, '2026-01-15');</pre>`, points:["RETURNS + RETURN","DECLARE / SELECT INTO","Appel avec SELECT"]}
  ]}
}
];

window.A4 = `
<div class="a4">
<p class="warn">L'examen autorise <b>une feuille A4 recto-verso manuscrite et nominative</b>. Ceci est un modèle : <b>recopie-le à la main</b> (le fait de l'écrire aide à mémoriser). Imprimer cette page ne te donne pas une feuille autorisée.</p>
<h3>RECTO — SQL</h3>
<pre>SELECT [DISTINCT] col, AGG(col) AS alias
FROM t1 a
[LEFT] JOIN t2 b ON a.fk = b.pk
WHERE cond (AND/OR, IN (…), BETWEEN x AND y, LIKE 'a%_', IS [NOT] NULL)
GROUP BY col            -- toutes les colonnes non agrégées
HAVING AGG(col) > n     -- condition sur agrégat
ORDER BY col [DESC]
LIMIT n;
-- sous-requête : WHERE x = (SELECT MAX(x) …) / IN (SELECT …) / NOT IN
-- auto-jointure : t m1 JOIN t m2 ON m1.v = m2.v AND m1.id < m2.id
-- jamais de … : LEFT JOIN … WHERE b.id IS NULL
COUNT(*)  COUNT(DISTINCT c)  SUM AVG MIN MAX   (ignorent NULL)

INSERT INTO t (c1,c2) VALUES (v1,v2);
UPDATE t SET c = v WHERE …;     DELETE FROM t WHERE …;

CREATE TABLE t (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nom VARCHAR(40) NOT NULL UNIQUE,
  x INT CHECK (x BETWEEN 0 AND 20) DEFAULT 0,
  id_p INT,
  PRIMARY KEY (a, b),                         -- clé composée
  FOREIGN KEY (id_p) REFERENCES p(id) ON DELETE CASCADE / SET NULL
);
ALTER TABLE t ADD col TYPE;   ALTER TABLE t DROP INDEX idx;
CREATE INDEX idx ON t(col);   FULLTEXT idx (col) + MATCH(col) AGAINST('mot')
CREATE VIEW v AS SELECT …;    CREATE TEMPORARY TABLE tmp AS SELECT …;
GRANT SELECT ON t TO 'u'@'localhost';  REVOKE … FROM …;
START TRANSACTION; … COMMIT; / ROLLBACK;   ACID</pre>
<p><b>Soccer</b> : team_id = country_id ; play_stage G/R/Q/S/F ; win_lose W/L/D ; goal_type N/O/P ; venue → city.</p>
<h3>VERSO — Conception & administration</h3>
<pre>Chen : entité ▭  association ◇  attribut ⬭ (id souligné), cardinalités 0..1 1 0..n 1..n
1:N → FK côté N     N:N → table de jointure (PK = 2 FK + attributs)     1:1 → fusion
1NF valeurs atomiques (pas de listes)
2NF 1NF + pas de dépendance d'une PARTIE de la clé (clé composée seulement)
3NF 2NF + pas de dépendance entre colonnes non clé (pas de total, pas de nom_client)
Normalisée = 3NF.  BCNF : pas de DF d'un non-clé vers une partie de la clé.

INDEX  + O(log n), agrégats/tri rapides   − espace, INSERT/UPDATE plus lents
PARTITION (RANGE/LIST/HASH/composite) + lit 1 partition, DROP PARTITION   − admin, PK
TABLE D'AGRÉGATS + trigger  + lecture immédiate   − redondance, coût écriture
FONCTION  RETURNS … RETURN …  → SELECT f();  (retourne une valeur)
PROCÉDURE → CALL p();  (actions, à la demande)
TRIGGER  BEFORE|AFTER INSERT|UPDATE|DELETE ON t FOR EACH ROW … NEW. / OLD.
EVENT    ON SCHEDULE EVERY 1 DAY | AT ts + INTERVAL 1 DAY DO …   (event_scheduler=ON)
DELIMITER $$ … END$$ DELIMITER ;     DECLARE v INT DEFAULT 0; SET v = …; IF … THEN … END IF;
manuel → procédure ; périodique → événement ; réaction à une modif → trigger
DELETE FROM t WHERE d < NOW() - INTERVAL 5 YEAR;    <=> égalité NULL-safe
Historisation : table archive + UNION ALL. Sécurité : moindre privilège, mdp hachés.</pre>
</div>`;

window.COUVERTURE = [
["Modélisation entité-association (Chen/MCD/UML), cardinalités","Annale ex.1 ; TD7 ex.2-3 ; cours slides 211-219 ; images « Exercice de conception »","Conception : méthode de réponse, exercice guidé (TD7 ex.2), 4 exercices type annale avec schéma corrigé (dont TD7 ex.3 et ex.4), cardinalités ; ex.1 des 4 sujets avec schéma"],
["Passage modèle → schéma relationnel, héritage","TD7 ex.3 ; cours slide 218-219","Conception (méthode) ; corrigés ex.1 ; exercices CREATE TABLE (L10)"],
["Normalisation 1NF/2NF/3NF/BCNF","Annale ex.3a ; TD7 ex.4 ; cours slides 167-196","Théorie : méthode + 6 questions ouvertes de normalisation ; QCM ; ex.3a des 4 sujets ; Conception (Stim)"],
["SELECT, WHERE, DISTINCT, ORDER BY, LIKE, NULL, BETWEEN","TD Quickstart ex.2 ; TD DML ex.1-4","Parcours SQL niveaux 1 à 3"],
["Agrégats, GROUP BY, HAVING","TD Quickstart 5 ; TD Optimisation ; annale Q2, Q5","Parcours niveaux 4-5 ; niveau 11"],
["Jointures (multiples, auto-jointure, LEFT JOIN), sous-requêtes","TD DML ; TD Quickstart 6 ; annale Q3-Q5","Parcours niveaux 6 à 8 et 11"],
["INSERT, UPDATE, DELETE","TD Quickstart 2-4 ; cours DML","Parcours niveau 9"],
["DDL : CREATE/ALTER/DROP, contraintes d'intégrité, ON DELETE CASCADE","TD DDL ex.1-3 ; annale Q6 ; cours slides 105-122","Parcours niveau 10 (+ Q6 des 4 sujets) ; QCM Contraintes"],
["Vues, tables temporaires","Cours slides 112-113","Exercice e58 ; QCM q21"],
["Index, FULLTEXT, partitionnement, optimisation des requêtes","Annale ex.3b ; TD Optimisation ; cours slides 124-134, 243-247","Exercice e59 ; Théorie : méthode « 3 stratégies » + 4 questions ouvertes ; QCM ; ex.3b des sujets"],
["Fonctions, procédures, triggers, événements, DELIMITER","Annale ex.3c-d ; TD Automatisation ex.1-3 ; cours slides 135-153","Théorie : tableau de choix + 5 questions ouvertes avec code ; QCM ; ex.3c-d des sujets"],
["Transactions (ACID, COMMIT, ROLLBACK)","TD Automatisation ex.3.5 ; cours slides 159-165","Théorie : question ouverte « virement » ; QCM ; sujet B1 ex.3c"],
["DCL : GRANT/REVOKE, sécurité, mots de passe hachés","TD DDL ex.3 ; cours slides 155-158, 236-240","Théorie : question ouverte « droits d'accès » ; QCM q02, q31, q32 ; feuille A4"],
["Cas d'utilisation UML (TD7 ex.1), frameworks web, Spring (fin du cours)","TD7 ex.1 ; cours slides 205-210 et 250-261","<i>Non couvert par des exercices</i> : absent de l'annale A23 (que le prof annonce similaire)"]
];

window.SITES = [
{n:"w3resource — exercices « Soccer Database »",u:"https://www.w3resource.com/sql-exercises/soccer-database-exercise/index.php",d:"⭐ <b>C'est exactement la base de l'annale</b> (Euro 2016, mêmes tables : player_mast, match_mast, goal_details…) avec ~100 exercices corrigés. Le meilleur entraînement pour l'exercice 2."},
{n:"W3Schools — SQL Exercises (donné par le prof)",u:"https://www.w3schools.com/sql/sql_exercises.asp",d:"Petits exercices à trous, très progressifs. Idéal pour débuter."},
{n:"W3Schools — SQL Quiz (donné par le prof)",u:"https://www.w3schools.com/sql/sql_quiz.asp",d:"QCM rapide de syntaxe."},
{n:"SQLBolt",u:"https://sqlbolt.com/",d:"Leçons interactives très courtes + exercices dans le navigateur (en anglais). Parfait si tu pars de zéro."},
{n:"SQLZoo",u:"https://sqlzoo.net/",d:"Exercices interactifs classés (SELECT, JOIN, GROUP BY…), dont des tutoriels sur une base de football (Euro 2012)."},
{n:"w3resource — autres bases (hospital, employees…)",u:"https://www.w3resource.com/sql-exercises/",d:"Même format que la base Soccer, pour varier les jointures."}
];
