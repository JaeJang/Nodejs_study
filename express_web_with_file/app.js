var express = require('express');
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended:false}));

//route
app.get('/topic/new', (req, res)=>{
  res.render('new');
});

app.get(['/topic', '/topic/:id'],(req,res)=>{
  fs.readdir('data', (err, files)=>{
    if(err){
      console.log(err);
      res.status(500).send("Internal Server error");
    }
    let id = req.params.id;
    if(id){
      fs.readFile('data/'+id, 'utf8', (err, data)=>{
        if(err){
          console.log(err);
          res.status(500).send("Internal Server Error");
        }
        res.render('view', {title:id, topics:files, desc:data})
      });
    } else {
      res.render('view', {topics:files});
    }
  });
});
app.post('/topic', (req, res)=>{
  const title = req.body.title;
  const desc = req.body.desc;

  fs.writeFile('data/'+title, desc, (err)=>{
    if(err){
      console.log(err);
      res.status(500).send("Internal Server Error");
    }
    res.redirect('/topic/'+title);
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
