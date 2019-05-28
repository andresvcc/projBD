INSERT INTO categories(categorie_nom, description)
VALUES 
("science fiction", ""),
("action", ""),
("animation", ""),
("aventure", ""),
("Comédie", ""),
("drame", ""),
("erotique", ""),
("medical", ""),
("policier", ""),
("musical", ""),
("romance", ""),
("thriller", ""),
("arts martiaux", ""),
("fantastique", ""),
("guerre", ""),
("famille", ""),
("sport", ""),
("documentaire", ""),
("divers", ""),
("classique", "")


INSERT INTO films(film_nom, duration, date_sortie, description)
VALUES 
(
    "AVENGERS",
    '02:23:00',
    '2012-04-25',
    "Lorsque Nick Fury, le directeur du S.H.I.E.L.D., l'organisation qui préserve la paix au plan mondial, cherche à former une équipe de choc pour empêcher la destruction du monde"
)


INSERT INTO artistes (artiste_nom, pay_origine, date_naissance)
VALUES 
(
    'ROBERT DOWNEY JR',
    'EEUU',
    '1965-04-04'
),
(
    'CHRIS EVANS',
    'EEUU',
    '1981-06-13'
),
(
    'TOM HIDDLESTON',
    'royaume uni',
    '1981-02-09'
),
(
    'CHRIS EVANS',
    'EEUU',
    '1981-06-13'
),


INSERT INTO photos (id_film, photo_nom, lien)
VALUES (
    1,
    "AVENGERS",
    'http://fr.web.img4.acsta.net/c_215_290/medias/nmedia/18/85/31/58/20042068.jpg'
)

