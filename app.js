const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');
const mustacheExpress = require('mustache-express');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database: 'node'
});
connection.connect();
connection.on('error', (err) =>{
    console.error('Error con la BD:', err.message);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public')); 

app.engine('.mustache', mustacheExpress());
app.set('view engine', 'mustache');

app.post('/add', (req, res) =>{

       console.log(parseInt(req.body.kilometros));
       if(parseInt(req.body.kilometros)>4){
        let sql = `INSERT INTO tabla(nombre,correo,kilometros) VALUES('${req.body.nombre}','${req.body.correo}','${req.body.kilometros}')`;
        connection.query(sql);
        res.render('index',{dato:'Registrado satisfactoriamente'});
    }else{
        res.render('index',{dato:'Correle mas, no seas huevon'});
        }
});

app.get('/', (req, res) =>{ 
    
    let sql="SELECT * FROM tabla";
    connection.query(sql, function (err, result, fields) {
        if (err) throw err;
        res.render('index',{datos:result});
      });
   
});

app.listen(3000,() =>{ 
    console.log('Servidor listones......');
});