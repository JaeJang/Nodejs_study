var express = require('express');
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');
var mysql = require('mysql');

var conn = mysql.createConnection({
  host    :'localhost',
  user    :'root',
  password:'1111',
  database:'o2'
});

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended:false}));

//route
app.get('/topic/add', (req, res)=>{

  res.render('add');
});

app.post('/topic', (req, res)=>{
  const title = req.body.title;
  const desc = req.body.desc;
  const author = req.body.author;
  let sql = 'INSERT INTO topic(title, description, author) VALUES(?, ?, ?)';
  conn.query(sql, [title, desc, author],(err, topics, fields)=>{
    if(err){
      console.log(err);
      res.status(500).send("Internal Server Error");
    }
    res.redirect('/topic/'+title);
  });

});

app.get(['/topic', '/topic/:id'],(req,res)=>{

  let sql = 'SELECT * FROM topic';
  conn.query(sql, (err, topics, fields)=>{
    let id = req.params.id;
    if(id){
      let sql = `SELECT * FROM topic WHERE title=?`;
      conn.query(sql,[id], (err, topic, fields)=>{

        res.render('view', {topics:topics, topic:topic[0]});
      });
    } else
      res.render('view', {topics:topics});
  });
});

app.get(['/topic/:id/edit'], (req, res)=>{
  let id = req.params.id;
  console.log(id);
  if(id){
    let sql = 'SELECT *FROM topic WHERE title=?';
    conn.query(sql, [id], (err, rows, fields)=>{
      if(err){
        console.log(err);
        res.status(500).send("Internal Server Error");
      }
      res.render('edit',  {row:rows[0]});

    });
  }else{
    console.log("There is no id.");
    res.status(500).send("Internal Server Error");
  }
});

app.post(['/topic/:id/edit'], (req, res)=>{
  let title = req.body.title;
  let desc = req.body.desc;
  let author = req.body.author;
  let sql = 'UPDATE topic SET description=?, author=? WHERE title=?';
  conn.query(sql, [desc, author, title], (err, rows, fields)=>{
    if(err){
      console.log(err);
      res.status(500).send("Internal Server Error");
    }
    res.redirect('/topic/'+title);
  });
});

app.post(['/topic/:id/delete'], (req,res)=>{
  let id = req.params.id;
  let sql = 'DELETE FROM topic WHERE title=?';
  conn.query(sql,[id], (err, rows, fields)=>{
    if(err){
      console.log(err);
      res.status(500).send("Internal Server Error");
    }
    res.redirect('/topic');
  });
});
/*
app.get('/topic/:id', (req,res)=>{
  let id = req.params.id;
  fs.readdir('data', (err, files)=>{
    if(err){
      console.log(err);
      res.status(500).send("Internal Server error");
    }

    fs.readFile('data/'+id, 'utf8', (err, data)=>{
      if(err){
        console.log(err);
        res.status(500).send("Internal Server Error");
      }
      res.render('view', {title:id, topics:files, desc:data})
    });
  });

});
*/
app.listen(3000, ()=>{
  console.log("Connected to 3000");
});
