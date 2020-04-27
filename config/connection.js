const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'todos_db', // trailing comma in case someone wants to write code after this
}).promise(); // make promisse to every route using mysql

// test connection by running this file
// connection.connect((err) => {
//   if (err) throw err;
//   console.log('Connected');
// });

module.exports = connection;