/* Bases de données d'entraînement (SQLite dans le navigateur, syntaxe proche MySQL).
   Les colonnes texte sont en COLLATE NOCASE pour imiter MySQL ('Lyon' = 'lyon'). */
window.DBS = {};

DBS.magasin = {
  label: "Magasins (TD DML ex.1)",
  desc: "Une seule table : parfait pour débuter (SELECT, WHERE, DISTINCT, ORDER BY).",
  sql: `
CREATE TABLE magasin (id INTEGER PRIMARY KEY, nom TEXT COLLATE NOCASE, categorie TEXT COLLATE NOCASE, ville TEXT COLLATE NOCASE, gerant TEXT COLLATE NOCASE);
INSERT INTO magasin VALUES
(1,'TASCORAMA','Bricolage','Bron','Yvan Declou'),
(2,'TASCORAMA','Bricolage','Rillieux-la-Pape','Eddy Visse'),
(3,'LECIO','Textile','Lyon','Ella Laclasse'),
(4,'SAPEY','Textile','Lyon','Côme Jamet'),
(5,'LOUBANGER','Informatique','Lyon','Yann Apadebeugue'),
(6,'VBH','Bricolage','Paris','Elvis Tourne'),
(7,'PIXELO','Informatique','Belfort','Ali Gator'),
(8,'BRICOMAX','Bricolage','Belfort','Jean Bon');
`};

DBS.boutique = {
  label: "Boutique en ligne (TD Quickstart)",
  desc: "Clients, produits, catégories, factures : jointures et agrégats.",
  sql: `
CREATE TABLE client (id INTEGER PRIMARY KEY, nom TEXT COLLATE NOCASE NOT NULL, email TEXT COLLATE NOCASE);
CREATE TABLE categorie (id INTEGER PRIMARY KEY, titre TEXT COLLATE NOCASE NOT NULL);
CREATE TABLE produit (id INTEGER PRIMARY KEY, titre TEXT COLLATE NOCASE NOT NULL, description TEXT COLLATE NOCASE, prix REAL NOT NULL, vat_rate REAL NOT NULL, id_categorie INT REFERENCES categorie(id));
CREATE TABLE facture (id INTEGER PRIMARY KEY, id_client INT NOT NULL REFERENCES client(id), date_facture TEXT);
CREATE TABLE ligne_facture (id_facture INT NOT NULL REFERENCES facture(id), id_produit INT NOT NULL REFERENCES produit(id), quantite INT NOT NULL DEFAULT 1, PRIMARY KEY (id_facture, id_produit));
INSERT INTO client VALUES (1,'Alice Martin','alice@mail.fr'),(2,'Bruno Petit','bruno@mail.fr'),(3,'Chloé Durand','chloe@mail.fr'),(4,'Alice Martin','alice.m@autre.fr'),(5,'David Leroy',NULL),(6,'Emma Moreau','emma@mail.fr');
INSERT INTO categorie VALUES (1,'sport'),(2,'livre'),(3,'informatique'),(4,'maison');
INSERT INTO produit VALUES
(1,'mountain bike','VTT 27 pouces',450,0.2,1),
(2,'ballon de foot','Taille 5',25,0.2,1),
(3,'raquette de tennis','Graphite',60,0.2,1),
(4,'dune','Roman de science-fiction',9,0.055,2),
(5,'le petit prince','Conte',7,0.055,2),
(6,'clavier','Clavier mécanique',45,0.2,3),
(7,'souris','Souris sans fil',20,0.2,3),
(8,'écran','Écran 27 pouces',180,0.2,3),
(9,'lampe','Lampe de bureau',35,0.2,4),
(10,'coussin','Coussin en lin',15,0.2,4);
INSERT INTO facture VALUES (1,1,'2025-01-05'),(2,2,'2025-01-12'),(3,1,'2025-02-02'),(4,3,'2025-02-20'),(5,6,'2025-03-01'),(6,2,'2025-03-15');
INSERT INTO ligne_facture VALUES (1,1,1),(1,2,2),(2,4,3),(2,5,1),(3,6,1),(3,7,2),(4,8,1),(4,9,2),(5,2,1),(6,4,1),(6,9,1);
`};

DBS.universite = {
  label: "Université (TD DML ex.3)",
  desc: "Étudiants, UV, inscriptions : NULL, LIKE, jointures, GROUP BY.",
  sql: `
CREATE TABLE etudiant (id_etudiant INTEGER PRIMARY KEY, nom TEXT COLLATE NOCASE, prenom TEXT COLLATE NOCASE, date_naissance TEXT, ville TEXT COLLATE NOCASE, statut TEXT COLLATE NOCASE);
CREATE TABLE uv (id_uv TEXT COLLATE NOCASE PRIMARY KEY, nom TEXT COLLATE NOCASE, nb_ects INT);
CREATE TABLE inscription (id_etudiant INT NOT NULL REFERENCES etudiant(id_etudiant), id_uv TEXT COLLATE NOCASE NOT NULL REFERENCES uv(id_uv), semestre TEXT COLLATE NOCASE NOT NULL, annee INT NOT NULL, note_finale REAL, PRIMARY KEY (id_etudiant, id_uv, semestre, annee));
INSERT INTO etudiant VALUES
(1,'Vidaprendre','Jean','2003-04-12','Belfort','célibataire'),
(2,'Lemaire','Sophie','2002-09-30','Montbéliard','célibataire'),
(3,'Commun','Paul','2001-01-15','Belfort','marié'),
(4,'Durand','Léa','2003-07-02','Sevenans','célibataire'),
(5,'Nguyen','Tom','2002-11-21','Belfort','célibataire'),
(6,'Bernard','Inès','2000-03-08','Besançon','mariée'),
(7,'Simon','Hugo','2003-12-01','Montbéliard','célibataire'),
(8,'Fabre','Zoé','2002-05-19','Belfort','célibataire');
INSERT INTO uv VALUES ('IF3A','Informatique de base',6),('BD70','Bases de données',6),('MT11','Analyse',6),('LE01','Anglais',4),('IFD1','Informatique décisionnelle',6),('SO03','Communication',NULL),('PH20','Physique',6),('IF2B','Algorithmique',6);
INSERT INTO inscription VALUES
(1,'IF3A','A',2017,12),(1,'MT11','A',2017,8.5),(1,'BD70','P',2018,14),(1,'LE01','P',2018,11),
(2,'IF3A','A',2017,15),(2,'BD70','P',2018,9),(2,'IFD1','A',2018,13),(2,'PH20','A',2018,10.5),
(3,'BD70','P',2018,16),(3,'IFD1','A',2018,7),(3,'SO03','P',2018,12),
(4,'IF3A','A',2018,11),(4,'MT11','A',2018,14),(4,'LE01','A',2018,15),(4,'IF2B','A',2018,9.5),
(5,'BD70','A',2017,6),(5,'BD70','P',2018,12.5),(5,'IFD1','A',2018,10),
(6,'PH20','A',2017,13),(6,'MT11','P',2018,10),
(7,'IFD1','A',2018,17),(7,'IF3A','A',2018,8),
(8,'LE01','P',2018,NULL);
`};

DBS.soccer = {
  label: "Soccer — Euro 2016 (annale A23)",
  desc: "Même schéma que l'annale (tables principales). Données réduites et simplifiées : 8 équipes, 9 matchs.",
  sql: `
CREATE TABLE soccer_country (country_id INTEGER PRIMARY KEY, country_abbr TEXT COLLATE NOCASE, country_name TEXT COLLATE NOCASE);
CREATE TABLE soccer_city (city_id INTEGER PRIMARY KEY, city TEXT COLLATE NOCASE, country_id INT REFERENCES soccer_country(country_id));
CREATE TABLE soccer_venue (venue_id INTEGER PRIMARY KEY, venue_name TEXT COLLATE NOCASE, city_id INT REFERENCES soccer_city(city_id), aud_capacity INT);
CREATE TABLE soccer_team (team_id INTEGER PRIMARY KEY REFERENCES soccer_country(country_id), team_group TEXT COLLATE NOCASE, match_played INT, won INT, draw INT, lost INT, goal_for INT, goal_agnst INT, goal_diff INT, points INT, group_position INT);
CREATE TABLE playing_position (position_id TEXT COLLATE NOCASE PRIMARY KEY, position_desc TEXT COLLATE NOCASE);
CREATE TABLE player_mast (player_id INTEGER PRIMARY KEY, team_id INT REFERENCES soccer_country(country_id), jersey_no INT, player_name TEXT COLLATE NOCASE, posi_to_play TEXT COLLATE NOCASE REFERENCES playing_position(position_id), dt_of_bir TEXT, age INT, playing_club TEXT COLLATE NOCASE);
CREATE TABLE referee_mast (referee_id INTEGER PRIMARY KEY, referee_name TEXT COLLATE NOCASE, country_id INT REFERENCES soccer_country(country_id));
CREATE TABLE coach_mast (coach_id INTEGER PRIMARY KEY, coach_name TEXT COLLATE NOCASE);
CREATE TABLE team_coaches (team_id INT REFERENCES soccer_country(country_id), coach_id INT REFERENCES coach_mast(coach_id), PRIMARY KEY (team_id, coach_id));
CREATE TABLE match_mast (match_no INTEGER PRIMARY KEY, play_stage TEXT COLLATE NOCASE, play_date TEXT, results TEXT COLLATE NOCASE, decided_by TEXT COLLATE NOCASE, goal_score TEXT, venue_id INT REFERENCES soccer_venue(venue_id), referee_id INT REFERENCES referee_mast(referee_id), audence INT, plr_of_match INT REFERENCES player_mast(player_id), stop1_sec INT, stop2_sec INT);
CREATE TABLE match_details (match_no INT REFERENCES match_mast(match_no), play_stage TEXT COLLATE NOCASE, team_id INT REFERENCES soccer_country(country_id), win_lose TEXT COLLATE NOCASE, decided_by TEXT COLLATE NOCASE, goal_score INT, penalty_score INT, player_gk INT REFERENCES player_mast(player_id), PRIMARY KEY (match_no, team_id));
CREATE TABLE goal_details (goal_id INTEGER PRIMARY KEY, match_no INT REFERENCES match_mast(match_no), player_id INT REFERENCES player_mast(player_id), team_id INT REFERENCES soccer_country(country_id), goal_time INT, goal_type TEXT COLLATE NOCASE, play_stage TEXT COLLATE NOCASE, goal_schedule TEXT COLLATE NOCASE, goal_half INT);
CREATE TABLE match_captain (match_no INT REFERENCES match_mast(match_no), team_id INT REFERENCES soccer_country(country_id), player_captain INT REFERENCES player_mast(player_id), PRIMARY KEY (match_no, team_id));
CREATE TABLE player_booked (match_no INT REFERENCES match_mast(match_no), team_id INT REFERENCES soccer_country(country_id), player_id INT REFERENCES player_mast(player_id), booking_time INT, sent_off TEXT COLLATE NOCASE, play_schedule TEXT COLLATE NOCASE, play_half INT);
CREATE TABLE penalty_gk (match_no INT REFERENCES match_mast(match_no), team_id INT REFERENCES soccer_country(country_id), player_gk INT REFERENCES player_mast(player_id));

INSERT INTO soccer_country VALUES (1,'FRA','France'),(2,'POR','Portugal'),(3,'GER','Allemagne'),(4,'WAL','Pays de Galles'),(5,'BEL','Belgique'),(6,'ITA','Italie'),(7,'ISL','Islande'),(8,'ESP','Espagne'),(9,'ENG','Angleterre'),(10,'NED','Pays-Bas'),(11,'SWE','Suède');
INSERT INTO soccer_city VALUES (1,'Saint-Denis',1),(2,'Marseille',1),(3,'Lyon',1),(4,'Lille',1),(5,'Bordeaux',1),(6,'Paris',1),(7,'Saint-Étienne',1);
INSERT INTO soccer_venue VALUES (1,'Stade de France',1,80100),(2,'Stade Vélodrome',2,67394),(3,'Stade de Lyon',3,59186),(4,'Stade Pierre Mauroy',4,50186),(5,'Stade de Bordeaux',5,42115),(6,'Parc des Princes',6,47294),(7,'Stade Geoffroy-Guichard',7,41965);
INSERT INTO soccer_team VALUES
(1,'A',3,2,1,0,4,1,3,7,1),(2,'F',3,0,3,0,4,4,0,3,3),(3,'C',3,2,1,0,3,0,3,7,1),(4,'B',3,2,0,1,6,3,3,6,1),
(5,'E',3,2,0,1,4,2,2,6,2),(6,'E',3,2,0,1,3,1,2,6,1),(7,'F',3,1,2,0,4,3,1,5,2),(8,'D',3,2,0,1,5,2,3,6,2);
INSERT INTO playing_position VALUES ('GK','Gardien'),('DF','Défenseur'),('MF','Milieu'),('FD','Attaquant');
INSERT INTO player_mast VALUES
(1,1,1,'Hugo Lloris','GK','1986-12-26',29,'Tottenham'),
(2,1,21,'Laurent Koscielny','DF','1985-09-10',30,'Arsenal'),
(3,1,15,'Paul Pogba','MF','1993-03-15',23,'Juventus'),
(4,1,7,'Antoine Griezmann','FD','1991-03-21',25,'Atlético Madrid'),
(5,1,9,'Olivier Giroud','FD','1986-09-30',29,'Arsenal'),
(6,1,8,'Dimitri Payet','MF','1987-03-29',29,'West Ham'),
(7,2,1,'Rui Patricio','GK','1988-02-15',28,'Sporting'),
(8,2,3,'Pepe','DF','1983-02-26',33,'Real Madrid'),
(9,2,7,'Cristiano Ronaldo','FD','1985-02-05',31,'Real Madrid'),
(10,2,17,'Nani','FD','1986-11-17',29,'Fenerbahce'),
(11,2,9,'Eder','FD','1987-12-22',28,'Lille'),
(12,2,16,'Renato Sanches','MF','1997-08-18',18,'Benfica'),
(13,3,1,'Manuel Neuer','GK','1986-03-27',30,'Bayern'),
(14,3,17,'Jerome Boateng','DF','1988-09-03',27,'Bayern'),
(15,3,18,'Toni Kroos','MF','1990-01-04',26,'Real Madrid'),
(16,3,23,'Mario Gomez','FD','1985-07-10',30,'Besiktas'),
(17,3,13,'Thomas Muller','FD','1989-09-13',26,'Bayern'),
(18,4,1,'Wayne Hennessey','GK','1987-01-24',29,'Crystal Palace'),
(19,4,11,'Gareth Bale','FD','1989-07-16',26,'Real Madrid'),
(20,4,10,'Aaron Ramsey','MF','1990-12-26',25,'Arsenal'),
(21,4,9,'Hal Robson-Kanu','FD','1989-05-21',27,'Reading'),
(22,5,1,'Thibaut Courtois','GK','1992-05-11',24,'Chelsea'),
(23,5,10,'Eden Hazard','FD','1991-01-07',25,'Chelsea'),
(24,5,7,'Kevin De Bruyne','MF','1991-06-28',24,'Manchester City'),
(25,5,9,'Romelu Lukaku','FD','1993-05-13',23,'Everton'),
(26,6,1,'Gianluigi Buffon','GK','1978-01-28',38,'Juventus'),
(27,6,19,'Leonardo Bonucci','DF','1987-05-01',29,'Juventus'),
(28,6,9,'Graziano Pelle','FD','1985-07-15',30,'Southampton'),
(29,6,23,'Emanuele Giaccherini','MF','1985-05-05',31,'Bologna'),
(30,7,1,'Hannes Halldorsson','GK','1984-04-27',32,'Bodo/Glimt'),
(31,7,17,'Aron Gunnarsson','MF','1989-04-22',27,'Cardiff'),
(32,7,9,'Kolbeinn Sigthorsson','FD','1990-03-14',26,'Nantes'),
(33,7,10,'Gylfi Sigurdsson','MF','1989-09-08',26,'Swansea'),
(34,8,1,'David De Gea','GK','1990-11-07',25,'Manchester United'),
(35,8,15,'Sergio Ramos','DF','1986-03-30',30,'Real Madrid'),
(36,8,7,'Alvaro Morata','FD','1992-10-23',23,'Juventus'),
(37,8,6,'Andres Iniesta','MF','1984-05-11',32,'Barcelone'),
(38,6,3,'Giorgio Chiellini','DF','1984-08-14',31,'Juventus'),
(39,5,4,'Radja Nainggolan','MF','1988-05-04',28,'AS Rome'),
(40,4,6,'Ashley Williams','DF','1984-08-23',31,'Swansea'),
(41,4,18,'Sam Vokes','FD','1989-10-21',26,'Burnley'),
(42,3,8,'Mesut Ozil','MF','1988-10-15',27,'Arsenal'),
(43,7,8,'Birkir Bjarnason','MF','1988-05-27',28,'Bâle');
INSERT INTO referee_mast VALUES (1,'Mark Clattenburg',9),(2,'Björn Kuipers',10),(3,'Jonas Eriksson',11),(4,'Viktor Kassai',NULL),(5,'Cüneyt Çakir',NULL);
INSERT INTO coach_mast VALUES (1,'Didier Deschamps'),(2,'Fernando Santos'),(3,'Joachim Löw'),(4,'Chris Coleman'),(5,'Marc Wilmots'),(6,'Antonio Conte'),(7,'Lars Lagerbäck'),(8,'Heimir Hallgrimsson'),(9,'Vicente del Bosque');
INSERT INTO team_coaches VALUES (1,1),(2,2),(3,3),(4,4),(5,5),(6,6),(7,7),(7,8),(8,9);
INSERT INTO match_mast VALUES
(1,'G','2016-06-13','WIN','N','0-2',3,2,55408,29,131,242),
(2,'G','2016-06-14','DRAW','N','1-1',7,3,38742,43,61,182),
(3,'R','2016-06-27','WIN','N','2-0',1,5,76165,38,120,300),
(4,'Q','2016-07-01','WIN','N','3-1',4,2,45936,21,95,210),
(5,'Q','2016-07-02','DRAW','P','1-1',5,4,38764,14,60,240),
(6,'Q','2016-07-03','WIN','N','5-2',1,2,76833,4,90,120),
(7,'S','2016-07-06','WIN','N','2-0',3,3,55679,9,60,180),
(8,'S','2016-07-07','WIN','N','0-2',2,5,64078,4,150,240),
(9,'F','2016-07-10','WIN','N','1-0',1,1,75868,8,120,240);
INSERT INTO match_details VALUES
(1,'G',5,'L','N',0,NULL,22),(1,'G',6,'W','N',2,NULL,26),
(2,'G',2,'D','N',1,NULL,7),(2,'G',7,'D','N',1,NULL,30),
(3,'R',6,'W','N',2,NULL,26),(3,'R',8,'L','N',0,NULL,34),
(4,'Q',4,'W','N',3,NULL,18),(4,'Q',5,'L','N',1,NULL,22),
(5,'Q',3,'W','P',1,6,13),(5,'Q',6,'L','P',1,5,26),
(6,'Q',1,'W','N',5,NULL,1),(6,'Q',7,'L','N',2,NULL,30),
(7,'S',2,'W','N',2,NULL,7),(7,'S',4,'L','N',0,NULL,18),
(8,'S',3,'L','N',0,NULL,13),(8,'S',1,'W','N',2,NULL,1),
(9,'F',2,'W','N',1,NULL,7),(9,'F',1,'L','N',0,NULL,1);
INSERT INTO goal_details VALUES
(1,1,29,6,32,'N','G','NT',1),(2,1,28,6,93,'N','G','ST',2),
(3,2,10,2,31,'N','G','NT',1),(4,2,43,7,50,'N','G','NT',2),
(5,3,38,6,33,'N','R','NT',1),(6,3,28,6,91,'N','R','ST',2),
(7,4,39,5,13,'N','Q','NT',1),(8,4,40,4,31,'N','Q','NT',1),(9,4,21,4,55,'N','Q','NT',2),(10,4,41,4,86,'N','Q','NT',2),
(11,5,42,3,65,'N','Q','NT',2),(12,5,27,6,78,'P','Q','NT',2),
(13,6,5,1,12,'N','Q','NT',1),(14,6,3,1,20,'N','Q','NT',1),(15,6,6,1,43,'N','Q','NT',1),(16,6,4,1,45,'N','Q','NT',1),(17,6,32,7,56,'N','Q','NT',2),(18,6,5,1,59,'N','Q','NT',2),(19,6,43,7,84,'N','Q','NT',2),
(20,7,9,2,50,'N','S','NT',2),(21,7,10,2,53,'N','S','NT',2),
(22,8,4,1,47,'P','S','ST',1),(23,8,4,1,72,'N','S','NT',2),
(24,9,11,2,109,'N','F','ET',2);
INSERT INTO match_captain VALUES (1,5,23),(1,6,26),(2,2,9),(2,7,31),(3,6,26),(3,8,35),(4,4,40),(4,5,23),(5,3,13),(5,6,26),(6,1,1),(6,7,31),(7,2,9),(7,4,40),(8,3,13),(8,1,1),(9,2,9),(9,1,1);
INSERT INTO player_booked VALUES (1,5,39,30,'N','NT',1),(1,6,27,54,'N','NT',2),(4,4,20,24,'N','NT',1),(4,5,23,75,'N','NT',2),(5,6,38,40,'N','NT',1),(6,7,31,62,'N','NT',2),(8,3,15,43,'N','NT',1),(8,1,3,85,'N','NT',2),(9,2,8,62,'N','NT',2),(9,1,3,80,'N','NT',2),(9,2,12,100,'N','ET',2),(3,8,35,88,'Y','NT',2);
INSERT INTO penalty_gk VALUES (5,3,13),(5,6,26);
`};

DBS.vide = {
  label: "Base vide (pour CREATE TABLE)",
  desc: "Aucune table : idéal pour s'entraîner au DDL.",
  sql: ``
};
