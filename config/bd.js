let mysql      = require('mysql');
let connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'Poc/150481',
    database : 'SuiviElec'
});

connection.connect();

module.exports = connection;