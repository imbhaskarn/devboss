require('dotenv').config()
const mysql = require("mysql2");

const dbconfig = {
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  port: process.env.PORT,
  database: 'mydb'
};
console.log(dbconfig)

let conn = mysql.createConnection(dbconfig);
conn.connect((err) => {
  if (err) {
    return console.log(err)
  }
  return console.log('connect to database!')
})

module.exports = conn;
