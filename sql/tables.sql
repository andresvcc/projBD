
/*
ce fichie n'a aucune utilité dans le code, je l'utilise uniquement pour faire des test
*/

use lrF7zYviuF;
DROP DATABASE lrF7zYviuF;
CREATE DATABASE lrF7zYviuF;
use lrF7zYviuF;

DROP TABLE IF EXISTS films;
CREATE TABLE films (
   id_film INT(255) AUTO_INCREMENT NOT NULL,
   film_nom VARCHAR(255) NOT NULL,
   duration TIME,
   date_sortie DATE,
   description VARCHAR(255),
   CONSTRAINT pk_films PRIMARY KEY(id_film)
)ENGINE = InnoDB;

DROP TABLE IF EXISTS directeurs;
CREATE TABLE directeurs (
   id_directeur INT(255) AUTO_INCREMENT NOT NULL,
   directeur_nom VARCHAR(255) UNIQUE NOT NULL,
   pay_origine VARCHAR(255) NOT NULL,
   date_naissance DATE,
   description VARCHAR(255) NOT NULL,
   CONSTRAINT pk_directeur PRIMARY KEY(id_directeur)
)ENGINE = InnoDB;

DROP TABLE IF EXISTS directeurs_films;
CREATE TABLE directeurs_films(
   id_directeur INT(255) NOT NULL,
   id_film INT(255) NOT NULL,
   CONSTRAINT pk_directeur_film PRIMARY KEY(id_directeur, id_film),
   CONSTRAINT fk_directeur_dirige FOREIGN KEY(id_directeur)
      REFERENCES directeurs(id_directeur) ON UPDATE CASCADE ON DELETE CASCADE,
   CONSTRAINT fk_film_dirige FOREIGN KEY(id_film)
      REFERENCES films(id_film) ON UPDATE CASCADE ON DELETE CASCADE 
)ENGINE = InnoDB;

DROP TABLE IF EXISTS photos;
CREATE TABLE photos (
   id_photo INT(255) AUTO_INCREMENT NOT NULL,
   id_film INT(255) NOT NULL,
   photo_nom VARCHAR(255) NOT NULL,
   lien VARCHAR(255) NOT NULL,
   CONSTRAINT pk_photo PRIMARY KEY(id_photo),
   CONSTRAINT fk_film_expose FOREIGN KEY(id_film)
      REFERENCES films(id_film) ON UPDATE CASCADE ON DELETE CASCADE 
)ENGINE = InnoDB;

DROP TABLE IF EXISTS categories;
CREATE TABLE categories (
   id_categorie INT(255) AUTO_INCREMENT NOT NULL,
   categorie_nom VARCHAR(255) UNIQUE NOT NULL,
   description VARCHAR(255),
   CONSTRAINT pk_categories PRIMARY KEY(id_categorie)
)ENGINE = InnoDB;

DROP TABLE IF EXISTS films_categories;
CREATE TABLE films_categories(
   id_categorie INT(255) NOT NULL,
   id_film INT(255) NOT NULL,
   CONSTRAINT pk_categorie_film PRIMARY KEY(id_categorie, id_film),
   CONSTRAINT fk_categorie_possede FOREIGN KEY(id_categorie)
      REFERENCES categories(id_categorie) ON UPDATE CASCADE ON DELETE CASCADE,
   CONSTRAINT fk_film_possede FOREIGN KEY(id_film)
      REFERENCES films(id_film) ON UPDATE CASCADE ON DELETE CASCADE 
)ENGINE = InnoDB;

DROP TABLE IF EXISTS artistes ;
CREATE TABLE artistes  (
   id_artiste INT(255) AUTO_INCREMENT NOT NULL,
   artiste_nom VARCHAR(255) NOT NULL,
   pay_origine VARCHAR(255) NOT NULL,
   date_naissance DATE,
   CONSTRAINT pk_artiste PRIMARY KEY(id_artiste)
)ENGINE = InnoDB;

DROP TABLE IF EXISTS artistes_films;
CREATE TABLE artistes_films(
   id_artiste INT(255) NOT NULL,
   id_film INT(255) NOT NULL,
   CONSTRAINT pk_artiste_film PRIMARY KEY(id_artiste, id_film),
   CONSTRAINT fk_artiste_jouent FOREIGN KEY(id_artiste)
      REFERENCES artistes(id_artiste) ON UPDATE CASCADE ON DELETE CASCADE,
   CONSTRAINT fk_film_jouent FOREIGN KEY(id_film)
      REFERENCES films(id_film) ON UPDATE CASCADE ON DELETE CASCADE 
)ENGINE = InnoDB;

DROP TABLE IF EXISTS evaluations;
CREATE TABLE evaluations (
   id_opinion INT(255) AUTO_INCREMENT NOT NULL,
   id_film INT(255) NOT NULL,
   opinion VARCHAR(255),
   escenario TINYINT,
   bande_sonore TINYINT,
   effets_speciaux TINYINT,
   histoire TINYINT,
   originalite TINYINT,
   CONSTRAINT pk_evaluation PRIMARY KEY(id_opinion),
   CONSTRAINT fk_film_decrive FOREIGN KEY(id_film)
      REFERENCES films(id_film) ON UPDATE CASCADE ON DELETE CASCADE 
)ENGINE = InnoDB;