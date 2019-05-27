/********************************************************
    Upload
*********************************************************
    Andres Vicente Caballero Cantillo
    recommendation	des films
**********************************************************/
var multer = require('multer')

const upload = (app)=> {

/*-------------------------------------------------
|                 MULTER CONFIG                   |
-------------------------------------------------*/

    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'public/images')
        },
        filename: function (req, file, cb) {
            let random = Math.round(Math.random() * (9000 - 1000) + 1000) 
            const name = `${Date.now()}-${random + file.mimetype.replace('image/', '.')}` // nom du fichie
            const photoName = cb(null, name)
            return photoName
        }
    })

    var upload = multer({ storage: storage }).array('file')
 
    /*---------------------
    |      SERVICES       |
    ---------------------*/

    app.get(`/`, function (req, res) {
        res. send(`<meta http-equiv="refresh" content="0; url=https://projbd.herokuapp.com/" />`)
    })
    
    app.post('/upload', function (req, res) {
        upload(req, res, function (err) {
            if (err instanceof multer.MulterError) {
                console.log(err)
                return res.status(500).json(err)
                
                // A Multer error occurred when uploading.
            } else if (err) {
                console.log(err)
                return res.status(500).json(err)
                // An unknown error occurred when uploading.
            }
            return res.status(200).json({filename: req.files[0].filename})
            // Everything went fine.
        })
    });    
}

module.exports.upload = upload;
