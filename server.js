const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const e = require('express');
const port = 3000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const dbCon = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'so6,ko123',
    database: 'nodejs_api'
});

dbCon.connect();
// home page
app.get('/', (req, res) => {
    return res.send({ error: false, message: 'EK : Welcom to RESTFul APIs By NodeJS.' });
});

// get all users
app.get('/api/v1/users', (req, res) => {
    dbCon.query('SELECT * FROM users', (error, results, fields) => {
        if (error) throw error;
        let message = '';
        if (results === undefind || results.length == 0) {
            message = ' User table is Empty.';
        } else {
            message = 'Successfully get all users.';
        }
        return res.send({ error: false, data: results, message: message });
    })
    // return res.send({ error: false, message: 'ok' })
})

// add new user
app.post('/api/v1/user', (req, res) => {
  let id = req.body.id;
  let password = req.body.password;
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let section = req.body.section;
  if (!id||!password||!firstName||!lastName||!section){
      return res.status(400).send({error:true,message:'Please provide user data'})
  }
  else{
      let sql = 'INSERT INTO user (id,password,first_name,last_name,section) VALUES (?,?,?,?,?)';
      dbCon.query(sql,[id,password,firstName,lastName,section],(error,results,fields)=>{
          if (error)throw error;
          return res.send({error:error,data:results,message:'User Successfully added.'});
      });
  }
});




app.listen(port, () => {
    console.log('EK : Node Js Application is running on port : ' + port);
});
module.exports = app;