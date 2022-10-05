const maria = require('mysql');

const conn = maria.createConnection({
    host: '192.168.0.4',
    port: 3306,
    user: 'root',
    password: 'gusdnr99',
    database: 'test'
});

module.exports = conn;