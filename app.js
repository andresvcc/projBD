/********************************************************
    App
*********************************************************
    Andres Vicente Caballero Cantillo
    Projet final bases des données
    recommendation	des films
**********************************************************/
const express = require('express');
const upload = require('./upload')
const app = express();
var cors = require('cors');
const mysql = require('mysql')
const bodyParser = require('body-parser')
const request = require('./request')
var gutil = require('gulp-util');

app.use(express.static(__dirname + '/public'));
app.use('/Photo', express.static('public/images')); 
app.use(cors())

upload.upload(app)

let con = mysql.createConnection({
  host: "remotemysql.com",
  user: "lrF7zYviuF",
  password: "jDNd9e3VtF",
  database: "lrF7zYviuF"
});

con.connect((err)=>{ 
  err ? console.log(gutil.colors.red(`problème de connection avec la base des données`)): 
          console.log(gutil.colors.magenta(`Connecté à la base des données`));
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))


  // si apres une requete, mysql renvoie error, juste envoier un message d'error, sino continuer avec le callback next 
  let mysqlQuery = (res, query, next)=>{
    con.query(query, (err, results) =>{
      err ? res.json({err:{ errno:err.errno, code:err.code, sqlMessage:err.sqlMessage}}) : next(results)
    });
  }
  
  let isVide = (req)=>{
    return Object.keys(req.body).length === 0 ? true : false
  }

  /*-------------------------------------------
  |                Partie ADMIN               |
  -------------------------------------------*/
  
  // Ajouter un film
  app.post('/addFilm', (req, res) => {
    let sqlQuery = request.ADD_FILM(req.body)
    mysqlQuery(res, sqlQuery, (results)=>{
      res.json({results:results});
    });
  });

  // Ajouter une categorie 
  app.post('/addCategorie', (req, res) => {
    let sqlQuery = request.ADD_CATEGORIE(req.body)
    mysqlQuery(res, sqlQuery, (results)=>{
      res.json({results:results});
    });
  });

  // Associer une categorie à un film
  app.post('/assoCategorie', (req, res) => {
    let sqlQuery = request.ASSOCIER_CATEGORIE(req.body)
    mysqlQuery(res, sqlQuery, (results)=>{
      res.json({results:results});
    });
  });

  // Ajouter un directeur/une directrice
  app.post('/addDirecteur', (req, res) => {
    let sqlQuery = request.ADD_DIRECTEUR(req.body)
    mysqlQuery(res, sqlQuery, (results)=>{
      res.json({results:results});
    });
  });

  // Associer un directeur/une directrice à un film
  app.post('/assoDirecteur', (req, res) => {
    let sqlQuery = request.ASSOCIER_DIRECTEUR(req.body)
    mysqlQuery(res, sqlQuery, (results)=>{
      res.json({results:results});
    });
  });

  // Ajouter un/une artiste
  app.post('/addArtiste', (req, res) => {
    let sqlQuery = request.ADD_ARTISTE(req.body)
    mysqlQuery(res, sqlQuery, (results)=>{
      res.json({results:results});
    });
  });

  // Associer un/une artiste à un film
  app.post('/assoArtiste', (req, res) => {
    let sqlQuery = request.ASSOCIER_ARTISTE(req.body)
    mysqlQuery(res, sqlQuery, (results)=>{
      res.json({results:results});
    });
  });

  // Ajouter une Photo un film
  app.post('/addPhoto', (req, res) => {
    let sqlQuery = request.ADD_PHOTO(req.body)
    mysqlQuery(res, sqlQuery, (results)=>{
      res.json({results:results});
    });
  });

  // Eliminer un film
  app.post('/delFilm', (req, res) => {
    let sqlQuery = request.DEL_FILM(req.body)
    mysqlQuery(res, sqlQuery, (results)=>{
      res.json({results:results});
    });
  });

  /*-------------------------------------------
  |                Partie USER                |
  -------------------------------------------*/

  // Voir liste des des films avec leurs moyennes des evaluations reçues
  app.post('/listFilm', (req, res) => {
    let sqlQuery = request.LIST_FILM()
    mysqlQuery(res, sqlQuery, (results)=>{
      res.json({results:results});
    });
  });

  // Voir liste des des categories 
  app.post('/listeCategories', (req, res) => {
    let sqlQuery = request.LIST_CATEGORIE()
    mysqlQuery(res, sqlQuery, (results)=>{
      res.json({results:results});
    });
  });

  // Voir liste des des categories d'un film (le client doit fournir le id_film)
  app.post('/listeCategoriesFilm', (req, res) => {
    let sqlQuery = isVide(req) ? '' :request.LIST_CATEGORIE_FILM(req.body)
    mysqlQuery(res, sqlQuery, (results)=>{
      res.json({results:results});
    });
  });

  // Voir liste des des categories d'un film (le client doit fournir le id_film)
  app.post('/listeDirecteursFilm', (req, res) => {
    let sqlQuery = isVide(req) ? '' :request.LIST_DIRECTEUR_FILM(req.body)
    mysqlQuery(res, sqlQuery, (results)=>{
      res.json({results:results});
    });
  });

  // Voir liste des des categories d'un film (le client doit fournir le id_film)
  app.post('/listeArtistesFilm', (req, res) => {
    let sqlQuery = isVide(req) ? '' :request.LIST_ARTISTE_FILM(req.body)
    mysqlQuery(res, sqlQuery, (results)=>{
      res.json({results:results});
    });
  });

  // Voir liste des des categories d'un film (le client doit fournir le id_film)
  app.post('/listePhotosFilm', (req, res) => {
    let sqlQuery = isVide(req) ? '' :request.LIST_PHOTO_FILM(req.body)
    mysqlQuery(res, sqlQuery, (results)=>{
      res.json({results:results});
    });
  });

  // lister les directeurs avec leurs moyennes selon l'ensemble total des evaluations reçu par leurs films
  app.post('/listDirecteur', (req, res) => {
    let sqlQuery = request.LIST_DIRECTEUR()
    mysqlQuery(res, sqlQuery, (results)=>{
      res.json({results:results});
    });
  });

  // Voir l'ensemble des opinios d'un films  (le client doit fournit le id_film )
  app.post('/voirOpiniosFilm', (req, res) => {
    let sqlQuery = isVide(req) ? '' :request.OPINIOS_FILM(req.body)
    mysqlQuery(res, sqlQuery, (results)=>{
      res.json({results:results});
    });
  });

  // Trouver les meilleures 5 films dans une categorie selon la moyenne total des indecateurs (le client doit fournir le id_categorie)
  app.post('/top5FilmCategorie', (req, res) => {
    let sqlQuery = isVide(req) ? '' :request.TOP_5_FILM_CATEGORIE(req.body)
    mysqlQuery(res, sqlQuery, (results)=>{
      res.json({results:results});
    });
  });

  // trouver les meilleures 5 films d'un directeur selon la moyenne total des indecateurs (le client doit fournir le id_directeur)
  app.post('/top5FilmDirecteur', (req, res) => {
    let sqlQuery = isVide(req) ? '' :request.TOP_5_FILM_DIRECTEUR(req.body)
    mysqlQuery(res, sqlQuery, (results)=>{
      res.json({results:results});
    });
  });

  // trouver les meilleures 5 directeurs selon les films qu'ils ont realisé on utilisant la moyenne total des indecateurs
  app.post('/top5Directeur', (req, res) => {
    let sqlQuery = request.TOP_5_DIRECTEUR()
    mysqlQuery(res, sqlQuery, (results)=>{
      res.json({results:results});
    });
  });

  // evaluer un filmn
  app.post('/evaluer', (req, res) => {
    let sqlQuery = isVide(req) ? '' :request.EVALUER(req.body)
    mysqlQuery(res, sqlQuery, (results)=>{
      res.json({results:results});
    });
  });

  let refres=()=>{
    con.query('SELECT NOW()AS TIME;', (err, resultat) => {
      err ? console.log(err) : console.log('conexion cls', resultat)
    })
  }

  setInterval(refres,60000)

module.exports = app;