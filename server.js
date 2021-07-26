// const express = require('express');
// const bodyParser = require('body-parser');
// const mysql = require('mysql');
// const e = require('express');
// const port = process.env.PORT || 3000;
// const app = express();

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// // const dbCon = mysql.createConnection({
// //     host: 'localhost',
// //     user: 'root',
// //     password: 'so6,ko123',
// //     database: 'nodejs_api'
// // });

// const dbCon = mysql.createConnection({
//     host: 'us-cdbr-east-04.cleardb.com',
//     user: 'bdd4b22944e985',
//     password: '91721044',
//     database: 'heroku_329331faee4b757'
// });

// dbCon.connect();
// // home page

// app.get('/', (req, res) => {
//     return res.send({ error: false, message: 'EK : Welcom to RESTFul APIs By NodeJS.' });
// });

// // get all users
// app.get('/api/v1/users', (req, res) => {
//     dbCon.query('SELECT * FROM users', (error, results, fields) => {
//         if (error) throw error;
//         let message = '';
//         if (results === undefind || results.length == 0) {

//             message = ' User table is Empty.';
//         } else {
//             message = 'Successfully get all users.';
//         }
//         // return res.send({ error: false, data: results, message: message });
//     })
//     return res.send({ error: false, message: 'ok' })
// });

// // add new user
// // app.post('/api/v1/user', (req, res) => {
// //   let id = req.body.id;
// //   let password = req.body.password;
// //   let firstName = req.body.firstName;
// //   let lastName = req.body.lastName;
// //   let section = req.body.section;
// //   if (!id||!password||!firstName||!lastName||!section){
// //       return res.status(400).send({error:true,message:'Please provide user data'})
// //   }
// //   else{
// //       let sql = 'INSERT INTO user (id,password,first_name,last_name,section) VALUES (?,?,?,?,?)';
// //       dbCon.query(sql,[id,password,firstName,lastName,section],(error,results,fields)=>{
// //           if (error)throw error;
// //           return res.send({error:error,data:results,message:'User Successfully added.'});
// //       });
// //   }
// // });




// app.listen(port, () => {
//     console.log('EK : Node Js Application is running on port : ' + port);
// });
// module.exports = app;


const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const port = process.env.PORT || 3000; //รับค่าPROT ในระบบ (ใช้กับHEROKU) หรือ 3000  
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

// const dbCon = mysql.createConnection(
//     {
//         host:'us-cdbr-east-04.cleardb.com',
//         user:'b4731cf30a359e',
//         password:"fdc83ba0",
//         database:'heroku_94413095446dc20'

//     }
// );

const dbCon = mysql.createConnection({
    host: 'us-cdbr-east-04.cleardb.com',
    user: 'bdd4b22944e985',
    password: '91721044',
    database: 'heroku_329331faee4b757'
});

dbCon.connect();

// home page 
app.get('/',(req,res)=>{
    return res.send({error:false,message:'Welcome to RESTful APIs by NodeJs.'});
});


// get all user
app.get('/api/v1/users',(req,res) =>{
    dbCon.query('SELECT * FROM users',(error,results,fields) =>{
        if(error) throw error;

        let message = '';
        if(results === undefined || results.length == 0){
            message = 'Users table id empty'
        }else{
            message = 'Successfully get all users.'
        }

        return res.send({error:false,data:results,message:message}); //ส่งdata มาด้วย 
    });
});

//add new user 
app.post('/api/v1/user',(req,res) =>{
   
    //ประกาศตัวแปรมาเก็บค่ารับข้อมูลจาก Body 
    let id = req.body.id;
    let password = req.body.password;
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let section = req.body.section;
    console.log(id+'-'+password+'-'+firstName+'-'+lastName+'-'+section); //ข้อมูลทื่ insert
    //เงื่อนไขเมื่อไม่มีข้อมูลในตัวแปร 
    if (!id || !password || !firstName || !lastName || !section){
        return res.status(400).send({error:false,message:'Please provide user data'});
    }else{
        let sql = 'INSERT INTO users (id ,password , first_name , last_name ,section) VALUES (?,?,?,?,?)'; //value ใส่ ? แทน Parameters ตามจำนวน columns ที่เรามี
        dbCon.query(sql,[id ,password , firstName , lastName ,section],(error,results,fields) => {
            if(error) throw error

            return res.send({error:false,data:results,message:'User successfully added.'});
        });
    }
});

//update user by id  
app.put('/api/v1/user',(req,res) =>{
   
  //ประกาศตัวแปรมาเก็บค่ารับข้อมูลจาก Body 
  let id = req.body.id;
  let password = req.body.password;
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let section = req.body.section;
  console.log(id+'-'+password+'-'+firstName+'-'+lastName+'-'+section); //ข้อมูลทื่ insert
  //เงื่อนไขเมื่อไม่มีข้อมูลในตัวแปร 
  if (!id || !password || !firstName || !lastName || !section){
      return res.status(400).send({error:false,message:'Please provide user data'});
  }else{
      let sql = 'UPDATE users SET password = ? , first_name = ? , last_name = ? ,section = ?) where id = ?'; // ?  คือ parameter   
      dbCon.query(sql,[password , firstName , lastName ,section ,id ],(error,results,fields) => {
          if(error) throw error

          let message ='';
          if(results.affectedRows == 0 ){ //ถ้าหา id  ของ user ไม่เจอ
            message = 'User data is not found.';
          }else{
            message = 'Successfully users updated.'
          }
          return res.send({error:false,data:results,message:message});
      });
  }
});

//delete user by id  
app.delete('/api/v1/user',(req,res) =>{
   
  //ประกาศตัวแปรมาเก็บค่ารับข้อมูลจาก Body 
  let id = req.body.id;
  
  //เงื่อนไขเมื่อไม่มีข้อมูลในตัวแปร 
  if (!id ){
      return res.status(400).send({error:false,message:'Please provide user id'});
  }else{
      let sql = 'DELETE FROM users where id = ?'; // ?  คือ parameter   
      dbCon.query(sql,[id ],(error,results,fields) => {
          if(error) throw error

          let message ='';
          if(results.affectedRows == 0 ){ //ถ้าหา id  ของ user ไม่เจอ
            message = 'User data is not found.';
          }else{
            message = 'Successfully users deleted.'
          }
          return res.send({error:false,data:results,message:message});
      });
  }
});

app.listen(port,() => {
  console.log(`Node JS Application is running on port ${port}`);  
});
