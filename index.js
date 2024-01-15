var express = require("express");
var app = express();
var mysql = require('mysql');

app.set('view engine', 'ejs');

var bodyParser = require("body-parser") // call body parser module and make use of it

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("style"))
app.use(express.static("views"));
app.use(express.static("images"));

// ******************************** Start of SQL **************************************** //
// First we need to tell the application where to find the database
const db = mysql.createConnection({
host: '127.0.0.1',
    user: 'root',
    port: '3306',
    password: 'root',
    database: 'liam'
 });

// Next we need to create a connection to the database

db.connect((err) =>{
     if(err){
        console.log("go back and check the connection details. Something is wrong.")
    }
     else{
        console.log('Looking good the database connected')
    }
})


// **********************************  Code from here **************************
app.get('/', function(req,res){
   
   
    let sql = 'SELECT * FROM games';
    let query = db.query(sql, (err,result) => {
        if(err) throw err;
        console.log(result);
        res.render('home', {result})  
    });
   
})

app.get('/add', function(req,res){

res.render('add')

})





app.post('/add', function(req,res){
    let sql = 'insert into games ( title, price) values (?, ?)';
    let query = db.query(sql,[req.body.name, req.body.price], (err,result) => {
        if(err) throw err;
        console.log(result);
        res.redirect( '/')  
    });
     
   
})
// **********************************  Code to here **************************

app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0" 
, function(){
  console.log("New Full Demo is Live")
});
