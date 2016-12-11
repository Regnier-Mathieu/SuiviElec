// Dependencies
let express = require('express')
let bodyParser = require('body-parser')

let app = express()


// Middleware
app.use(express.static(__dirname + '/../client'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// Route
app.get('/', (req, res) => {

	res.send('Salut')
})

app.listen(4001)