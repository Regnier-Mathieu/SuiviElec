// Dependencies
let express = require('express')
let bodyParser = require('body-parser')
let config = require ('../config.js')

let app = express()


// Middleware
app.use('/asset', express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// Template
app.set('view engine', 'ejs')

// Route
app.get('/', (req, res) => {

	res.render('pages/index', {test: 'salut'})
})

app.listen(config.port)