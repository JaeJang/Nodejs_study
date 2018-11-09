var express = require('express');
var cookieParser = require('cookie-parser');
var app = express();

app.use(cookieParser('ksejhfi#&skd!@12'));

var products = {
  1:{title:'The history of web 1'},
  2:{title: 'The next web'},
  3:{title: 'The next next web'}
};

app.get('/product', (req, res)=>{
  let output = '';
  for(let name in products){
    output += 
      `<li>
          <a href="/cart/${name}">${products[name].title}</a>
        </li>`;
  }
  res.send(`<h1>Products</h1><ul>${output}</ul><a href="/cart">Cart</a>`);
});

app.get('/cart/:id', (req, res)=>{
  let id  = req.params.id;
  let cart = {};
  if (req.signedCookies.cart){
    cart = req.signedCookies.cart;
  }
  if(!cart[id]){
    cart[id] = 0;
  }
  cart[id] = parseInt(cart[id]) + 1;
  res.cookie('cart', cart, {signed:true});
  //res.send(cart);
  res.redirect('/cart');
});

app.get('/cart', (req, res)=>{
  let cart = req.signedCookies.cart;
  if(!cart){
    res.send("Empty!");
  }
  let output = '';
  for(let id in cart){
    output += `<li>${products[id].title}(${cart[id]})</li>`
  }

  res.send(`<h1>Cart</h1>
            <ul>${output}</ul>
            <a href='/product'>Products List</a>`);
  
});


app.get('/count', (req, res)=>{
  if(req.signedCookies.count){
    var count = parseInt(req.signedCookies.count);
  } else {
    var count = 0;
  }
  res.cookie('count', count+1, {signed:true});
  res.send('count: ' + req.signedCookies.count);
});

app.listen(3000, ()=>{
  console.log("Connected to 3003");
});
