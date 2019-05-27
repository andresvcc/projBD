
/*
ce fichie n'a aucune utilité dans le code, je l'utilise uniquement pour faire des test
*/

/*ADMIN*/

/* ajouter un nouveau film */
INSERT INTO films(film_nom, duration, date_sortie, description)
VALUES (
    'EDMOND',
    '01:53:00',
    '2019-01-09',
    "Décembre 1897, Paris. Edmond Rostand n’a pas encore trente ans mais déjà deux enfants et beaucoup d’angoisses. Il n’a rien écrit depuis deux ans."

)


/* ajouter un nouvelle categorie*/
INSERT INTO categories(categorie_nom, description)
VALUES (
    "drame",
    ""
)

/*associer une categorie a un film*/
REPLACE INTO films_categories(id_categorie, id_film)
VALUES (
    (SELECT id_categorie FROM categories WHERE categorie_nom = 'drame'),
    2
)

/* ajouter un nouvelle artiste*/
INSERT INTO artistes (artiste_nom, pay_origine, date_naissance)
VALUES (
    'MATHILDE SEIGNER',
    'France',
    '1968-01-17'
)

/*associer un artiste a un film*/
REPLACE INTO artistes_films (id_artiste, id_film)
VALUES (
    (SELECT id_artiste  FROM artistes WHERE artiste_nom = 'MATHILDE SEIGNER'),
    2
)

/* ajouter un nouveau directeur*/
INSERT INTO directeurs (directeur_nom, pay_origine, date_naissance, description)
VALUES (
    'ERIC TOLEDANO',
    'France',
    '1971-07-03',
    "Lorsqu'il se lance dans le cinéma, en 1995, "
)

/*associer une directeur a un film*/
REPLACE INTO directeurs_films (id_directeur, id_film)
VALUES (
    (SELECT id_directeur  FROM directeurs WHERE directeur_nom = 'ERIC TOLEDANO'),
    1
)

/* ajouter une nouvelle evaluation pour un film*/
INSERT INTO evaluations (id_film, opinion, escenario, bande_sonore, 
            effets_speciaux, histoire, originalite )
VALUES (
    1,
    'init opinions',
    5,
    5,
    5,
    5,
    5
)

/* ajouter une nouvelle photo pour un film*/
INSERT INTO photos (id_film, photo_nom, lien)
VALUES (
    1,
    'Intouchables',
    'http://fr.web.img3.acsta.net/c_215_290/o_club300-overlay-ok.png_0_se/medias/nmedia/18/82/69/17/19806656.jpg'
)

/* eliminer un film*/
DELETE FROM films
WHERE id_film = 2

/* Consulter la liste des films avec leur donnes basique de la table films (version simplifie) */
SELECT id_film, film_nom, DATE_FORMAT(duration, '%h:%i') as duration, description, DATE_FORMAT(date_sortie, '%Y-%m-%d') as date_sortie
FROM films  
ORDER BY film_nom

/* Consulter la liste des categories */
SELECT *
FROM categories  
ORDER BY categorie_nom

/*liste des categories d'un film*/
SELECT categories.* 
FROM films_categories, categories
WHERE films_categories.id_categorie = categories.id_categorie
AND films_categories.id_film = 1

/*liste des artistes d'un film*/
SELECT artistes.* 
FROM artistes_films, artistes
WHERE artistes_films.id_artiste = artistes.id_artiste
AND artistes_films.id_film = 1

/*liste des directeurs d'un film*/
SELECT directeurs.* 
FROM directeurs_films, directeurs
WHERE directeurs_films.id_directeur  = directeurs.id_directeur 
AND directeurs_films.id_film = 1

/*liste des photos d'un film*/
SELECT photos.*
FROM photos, films
WHERE photos.id_film  = films.id_film 
AND films.id_film = 1

/*liste des evaluations d'un film*/
SELECT evaluations.* 
FROM evaluations, films
WHERE evaluations.id_film  = films.id_film 
AND films.id_film = 1

/*calculer la moyenne des indicateurs pour l'evaluation des films ainsi que le nombre des evaluation reçu*/
SELECT *,((escenario + bande_sonore + effets_speciaux + histoire + originalite)/5) AS score
FROM(
    SELECT  films.*, 
            AVG(escenario) AS escenario, 
            AVG(bande_sonore) AS bande_sonore, 
            AVG(effets_speciaux) AS effets_speciaux, 
            AVG(histoire) AS histoire, 
            AVG(originalite) AS originalite, 
            COUNT(films.id_film) AS nb_evaluations 
    FROM evaluations, films
    WHERE evaluations.id_film  = films.id_film 
    GROUP BY films.id_film
) AS evalTotal
ORDER BY score DESC

/*calculer la moyenne des indicateurs pour l'evaluation d'un films ainsi que le nombre des evaluation reçu*/
SELECT *, ((escenario + bande_sonore + effets_speciaux + histoire + originalite) / 5) AS total
FROM(
    SELECT films.id_film, AVG(escenario) AS escenario, AVG(bande_sonore) AS bande_sonore, AVG(effets_speciaux) AS effets_speciaux, AVG(histoire) AS histoire, AVG(originalite) AS originalite, COUNT(films.id_film) AS nb_evaluations 
    FROM evaluations, films
    WHERE evaluations.id_film  = films.id_film 
    AND films.id_film = 1
    GROUP BY films.id_film
) AS evalTotal
ORDER BY total DESC


/*Voir la liste des opinions d’un film*/

SELECT  evaluations.*,
        ((escenario + bande_sonore + effets_speciaux + histoire + originalite) / 5) AS score
FROM evaluations, films
WHERE evaluations.id_film  = films.id_film 
AND films.id_film = 1


/*Voir la liste des opinions positives d’un film*/
SELECT * 
FROM(
    SELECT  evaluations.*,
        ((escenario + bande_sonore + effets_speciaux + histoire + originalite) / 5) AS score
    FROM evaluations, films
    WHERE evaluations.id_film  = films.id_film 
    AND films.id_film = 3
    ) AS evaluations

WHERE score >= 5 

/*Voir la liste des opinions negatives d’un film*/
SELECT * 
FROM(
    SELECT  evaluations.*,
        ((escenario + bande_sonore + effets_speciaux + histoire + originalite) / 5) AS score
    FROM evaluations, films
    WHERE evaluations.id_film  = films.id_film 
    AND films.id_film = 3
    ) AS evaluations

WHERE score < 5 


/*trouver les meilleures 5 films dans une categorie selon la moyenne total des indecateurs*/
SELECT  films_score.*, films_categories.id_categorie, nb_evaluations, 
        ((escenario + bande_sonore + effets_speciaux + histoire + originalite) / 5) AS score, 
        categories.categorie_nom

FROM(
    SELECT films.*, AVG(escenario) AS escenario, AVG(bande_sonore) AS bande_sonore, 
    AVG(effets_speciaux) AS effets_speciaux, AVG(histoire) AS histoire, 
    AVG(originalite) AS originalite, COUNT(films.id_film) AS nb_evaluations 

    FROM evaluations, films
    WHERE evaluations.id_film  = films.id_film 
    GROUP BY films.id_film
) AS films_score, films_categories, categories

WHERE films_categories.id_film = films_score.id_film
AND categories.id_categorie = films_categories.id_categorie
AND categories.id_categorie = 1 
ORDER BY score DESC
LIMIT 5

/*trouver les meilleures 5 films d'un directeur selon la moyenne total des indecateurs*/
SELECT evalTotal.*, directeurs_films.id_directeur, nb_evaluations, directeurs.directeur_nom,
       ((escenario + bande_sonore + effets_speciaux + histoire + originalite) / 5) AS total
       
FROM(
    SELECT films.*, AVG(escenario) AS escenario, AVG(bande_sonore) AS bande_sonore, 
           AVG(effets_speciaux) AS effets_speciaux, AVG(histoire) AS histoire, 
           AVG(originalite) AS originalite, COUNT(films.id_film) AS nb_evaluations 

    FROM evaluations, films
    WHERE evaluations.id_film  = films.id_film 
    GROUP BY films.id_film
) AS evalTotal, directeurs_films, directeurs

WHERE directeurs_films.id_film = evalTotal.id_film
AND directeurs.id_directeur  = directeurs_films.id_directeur 
AND directeurs.id_directeur  = 1 
ORDER BY total DESC
LIMIT 5



/*trouver les meilleures 5 directeurs selon les films qu'ils ont realisé on utilisant la moyenne total des indecateurs*/
SELECT id_directeur, directeur_nom, pay_origine, date_naissance, description, 
       SUM(total) AS score, SUM(nb_evaluations) AS nb_evaluations_total

FROM (
    SELECT id_directeur,directeur_nom, pay_origine, date_naissance, description, 
           AVG(total) AS total, SUM(nb_evaluations) AS nb_evaluations
    FROM(
        SELECT evalTotal.id_film, directeurs.*, nb_evaluations, 
            ((escenario + bande_sonore + effets_speciaux + histoire + originalite) 
            / 5) AS total

        FROM(
            SELECT films.id_film, COUNT(films.id_film) AS nb_evaluations, 
                   AVG(escenario) AS escenario, AVG(bande_sonore) AS bande_sonore, 
                   AVG(effets_speciaux) AS effets_speciaux, AVG(histoire) AS histoire, 
                   AVG(originalite) AS originalite

            FROM evaluations, films
            WHERE evaluations.id_film  = films.id_film 
            GROUP BY films.id_film
        ) AS evalTotal, directeurs_films, directeurs

        WHERE directeurs_films.id_film = evalTotal.id_film
        AND directeurs.id_directeur  = directeurs_films.id_directeur 
    ) AS temp
    GROUP BY id_directeur

    UNION
    SELECT *, 0.0 As total, 0 As nb_evaluations FROM directeurs
) AS total
GROUP BY id_directeur, directeur_nom, pay_origine, date_naissance, description
LIMIT 5


SELECT *,((escenario + bande_sonore + effets_speciaux + histoire + originalite)/5) AS score,
                            (SELECT lien FROM photos WHERE photos.id_film = evalTotal.id_film ORDER BY id_photo LIMIT 1) AS lien,
                            (SELECT categories.categorie_nom FROM films_categories, categories 
                                WHERE films_categories.id_categorie = categories.id_categorie
                                AND films_categories.id_film = evalTotal.id_film 
                                LIMIT 1
                            ) AS categorie1,

                            (SELECT categories.categorie_nom FROM films_categories, categories 
                                WHERE films_categories.id_categorie = categories.id_categorie
                                AND films_categories.id_film = evalTotal.id_film  
                                LIMIT 1, 1
                            ) AS categorie2,
                            
                            (SELECT categories.categorie_nom FROM films_categories, categories 
                                WHERE films_categories.id_categorie = categories.id_categorie
                                AND films_categories.id_film = evalTotal.id_film 
                                LIMIT 2, 2
                            ) AS categorie3,
                            
                            (SELECT directeurs.directeur_nom
                                FROM directeurs_films, directeurs
                                WHERE directeurs_films.id_directeur  = directeurs.id_directeur 
                                AND directeurs_films.id_film = evalTotal.id_film
                                LIMIT 1
                            ) AS directeur1,

                            (SELECT directeurs.directeur_nom
                                FROM directeurs_films, directeurs
                                WHERE directeurs_films.id_directeur  = directeurs.id_directeur 
                                AND directeurs_films.id_film = evalTotal.id_film
                                LIMIT 1,1
                            ) AS directeur2

        FROM(
            SELECT  films.*, 
                    AVG(escenario) AS escenario, 
                    AVG(bande_sonore) AS bande_sonore, 
                    AVG(effets_speciaux) AS effets_speciaux, 
                    AVG(histoire) AS histoire, 
                    AVG(originalite) AS originalite, 
                    COUNT(films.id_film) AS nb_evaluations 
            FROM evaluations, films
            WHERE evaluations.id_film  = films.id_film 
            GROUP BY films.id_film
            UNION
            SELECT  films.*, 
                    0 AS escenario, 
                    0 AS bande_sonore, 
                    0 AS effets_speciaux, 
                   0 AS histoire, 
                    0 AS originalite, 
                    0 AS nb_evaluations 
            FROM evaluations, films
            WHERE films.id_film NOT IN (
                    SELECT films.id_film 
                    FROM evaluations, films 
                    WHERE evaluations.id_film  = films.id_film
                )
            GROUP BY films.id_film
        ) AS evalTotal
        ORDER BY id_film