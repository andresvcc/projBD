//ce module contiens toutes les requetes SQL, ceci a fin de simplifier la lecture du code.

module.exports = Object.freeze({

/***ADMIN QUERYS***/
    
    ADD_FILM:(data)=>{
        return `INSERT INTO films(film_nom, duration, date_sortie, description)
                VALUES (
                    '${data.film_nom}',
                    '${data.duration}',
                    '${data.date_sortie}',
                    '${data.description}'
                )`
    },
    ADD_CATEGORIE :(data)=>{
        return `INSERT INTO categories(categorie_nom, description)
                VALUES (
                    '${data.categorie_nom}',
                    '${data.description}'
                )`
    },//voy por aqui 
    ADD_DIRECTEUR :(data)=>{
        return `INSERT INTO directeurs (directeur_nom, pay_origine, date_naissance, description)
                VALUES (
                    '${data.directeur_nom}',
                    '${data.pay_origine}',
                    '${data.date_naissance}',
                    '${data.description}'
                )`
    },
    ADD_ARTISTE :(data)=>{
        return `INSERT INTO artistes (artiste_nom, pay_origine, date_naissance)
                VALUES (
                    '${data.artiste_nom}',
                    '${data.pay_origine}',
                    '${date_naissance}'
                )`
    },
    ADD_PHOTO :(data)=>{
        return `INSERT INTO photos (id_film, photo_nom, lien)
                VALUES (
                    ${data.id_film},
                    '${data.photo_nom}',
                    '${data.lien}'
                )`
    },
    DEL_FILM:(data)=>{
        return `DELETE FROM films
                WHERE id_film = ${data.id_film}`
    },
    ASSOCIER_CATEGORIE:(data)=>{
        return `REPLACE INTO films_categories(id_categorie, id_film)
                VALUES (
                    (SELECT id_categorie FROM categories WHERE categorie_nom = 'nom categorie 1'),
                    ${data.id_fim}
                )`
    },
    ASSOCIER_ARTISTE:(data)=>{
        return `REPLACE INTO artistes_films (id_artiste, id_film)
                VALUES (
                    (SELECT id_artiste  FROM artistes WHERE artiste_nom = 'nom artiste 3'),
                    ${data.id_film}
                )`
    },
    ASSOCIER_DIRECTEUR:(data)=>{
        return `REPLACE INTO directeurs_films (id_directeur, id_film)
                VALUES (
                    (SELECT id_directeur  FROM directeurs WHERE directeur_nom = 'nom directeur 1'),
                    ${data.id_film}
                )`
    },

/***USER QUERYS***/

    LIST_FILM:()=>{
        return `SELECT *,((escenario + bande_sonore + effets_speciaux + histoire + originalite)/5) AS score,
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
                ORDER BY id_film`
    },
    LIST_CATEGORIE:()=>{
        return `SELECT *
                FROM categories  
                ORDER BY categorie_nom`
    },
    LIST_CATEGORIE_FILM:(data)=>{
        return `SELECT categories.* 
                FROM films_categories, categories
                WHERE films_categories.id_categorie = categories.id_categorie
                AND films_categories.id_film = ${data.id_film}`
    },
    LIST_DIRECTEUR_FILM:(data)=>{
        return `SELECT directeurs.* 
                FROM directeurs_films, directeurs
                WHERE directeurs_films.id_directeur  = directeurs.id_directeur 
                AND directeurs_films.id_film = ${data.id_film}`
    },
    LIST_PHOTO_FILM:(data)=>{
        return `SELECT photos.*
                FROM photos, films
                WHERE photos.id_film  = films.id_film 
                AND films.id_film = ${data.id_film}`
    },
    LIST_ARTISTE_FILM:(data)=>{
        return `SELECT artistes.* 
                FROM artistes_films, artistes
                WHERE artistes_films.id_artiste = artistes.id_artiste
                AND artistes_films.id_film =${data.id_film}`
    },
    OPINIOS_FILM:(data)=>{
        return `SELECT  evaluations.*,
                        ((escenario + bande_sonore + effets_speciaux + histoire + originalite) / 5) AS score
                FROM evaluations, films
                WHERE evaluations.id_film  = films.id_film 
                AND films.id_film = ${data.id_film}
                ORDER BY score DESC`
    },
    TOP_5_FILM_CATEGORIE:(data)=>{
        return `SELECT  films_score.*, films_categories.id_categorie, nb_evaluations, 
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
                AND categories.id_categorie = ${data.id_categorie} 
                ORDER BY score DESC
                LIMIT 5`
    },
    TOP_5_FILM_DIRECTEUR:(data)=>{
        return `SELECT evalTotal.*, directeurs_films.id_directeur, nb_evaluations, directeurs.directeur_nom,
                        ((escenario + bande_sonore + effets_speciaux + histoire + originalite) / 5) AS score
                        
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
                AND directeurs.id_directeur  = ${data.id_directeur} 
                ORDER BY score DESC
                LIMIT 5`
    },
    TOP_5_DIRECTEUR:()=>{
        return `SELECT id_directeur, directeur_nom, pay_origine, date_naissance, description, 
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
                ORDER BY score DESC
                LIMIT 5`
    },
    LIST_DIRECTEUR:()=>{
        return `SELECT id_directeur, directeur_nom, pay_origine, date_naissance, description, 
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
                ORDER BY score DESC`
    },
    EVALUER:(data)=>{
        return `INSERT INTO evaluations (id_film, opinion, escenario, bande_sonore, 
                                        effets_speciaux, histoire, originalite )
                VALUES (
                    ${data.id_film},
                    '${data.opinion}',
                    ${data.escenario},
                    ${data.bande_sonore},
                    ${data.effets_speciaux},
                    ${data.histoire},
                    ${data.originalite}
                )`
    }
})