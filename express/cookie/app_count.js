var express = require('express');
var cookieParser = require('cookie-parser');
var app = express();

app.use(cookieParser());

app.get('/count', (req, res)=>{
  if(req.cookies.count){
    var count = parseInt(req.cookies.count);
  } else {
    var count = 0;
  }
  res.cookie('count', count+1);
  res.send('count: ' + req.cookies.count);
});

app.listen(3000, ()=>{
  console.log("Connected to 3003");
});
