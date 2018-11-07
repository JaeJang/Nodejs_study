var express = require('express');
var app = express();

app.use(express.static('public'));

app.get('/', (req, res)=>{
	res.send('Hello  home page');
});

app.get('/route', (req, res)=>{
	res.send("Hello Router, <img src='/index.jpeg'>");
});

app.get('/login', (req, res)=>{
	res.send('Login please');
});

app.get('/login/hi', (req, res)=>{
	res.send('hi please');
});

app.get('/dynamic',(req, res)=>{
	res.send()
});

const port = process.argv[2] || 3000
app.listen(3000, ()=>{
	console.log(`Connected ${port} port!`);
});
