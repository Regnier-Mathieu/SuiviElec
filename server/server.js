// Dependencies
let express = require('express');
let bodyParser = require('body-parser');
let session = require('express-session');
let config = require ('../config/config');
let indexHpHc = require('../model/indexHpHc')
let app = express();

// Template
app.set('view engine', 'ejs');

// Middleware
app.use('/assets', express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
    secret: 'kfhkhkgfkgfkhgjdkdkk',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));
app.use(require('./middlewares/flash'));

// Route
app.get('/', (req, res) => {
    res.render('pages/index')
});

app.post('/', (req, res) => {

    if(req.body.hc === undefined || req.body.hc === '' || req.body.hp === undefined || req.body.hp === '') {
        req.flash("err",'Vous devez renseigner les deux champs :( ');
        res.redirect('/')
    }else{
        indexHpHc.create(req.body.hc, req.body.hp, function(){
            req.flash("succes","Votre enregistrement c'est bien deroulé");
            res.redirect('/result')
        })
    }
});

//server
app.listen(config.port);

console.log("Let's go on port :", config.port);