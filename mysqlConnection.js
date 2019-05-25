const mysql = require('mysql')
const bodyParser = require('body-parser')
const request = require('./request')


  /*-------------------------------------------
  |           Configuration MySQL             |
  -------------------------------------------*/
  let con = mysql.createPool({
    connectionLimit : 10,
    host: "remotemysql.com",
    user: "lrF7zYviuF",
    password: "jDNd9e3VtF",
    database: "lrF7zYviuF"
  });
  
  /*-------------------------------------------------------
  | prototype mysql avec les confirugations de connexion  |
   ------------------------------------------------------*/
  const mysqlConnection = (app, next)=>{

    //adapter le format au json a fin de l'envoier au client sur le web
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}))

    //returner le flux(ensemble des requêtes et les données de conexion) atravers le callback next, ceci a fin d'utiliser le resultat dans le server
    next(request, con)
    
  }
  
  // juste exporter la funcion mysqlCOnnection pour l'utiliser dans le server
  module.exports.mysqlConnection = mysqlConnection