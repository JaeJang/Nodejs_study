var express = require('express');
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');



var app = express();

app.set('views',path.join(__dirname, 'views'));
app.set('view engine','ejs');

app.use(bodyParser.urlencoded({ extended : false}));

app.get('/', (req, res)=>{
	res.send('Hello  home page');
});

app.get('/dynamic', (req, res)=>{
	fs.readFile('public/dynamic.html','utf8', (err, data)=>{
		res.send(data);
	});
});

app.get('/form', (req, res)=>{
	res.render('form');
});

app.post('/form_result', (req, res)=>{
	const name = req.body.name;
	const id = req.body.id;
	res.send(name + ', ' + id);
});

var topics = [
	'JavaScript is ...',
	'NodeJs is ...',
	'Express is ...'
];

app.get('/topic4/:id',(req,res)=>{
	res.render('index',{topic:topics[req.params.id]});
});

app.get('/topic', (req, res)=>{
	let output = `
		<a href="/topic?id=0">JavaScript</a><br>
		<a href="/topic?id=1">Nodejs</a><br>
		<a href="/topic?id=2">Express</a><br>
		${topics[req.query.id]}
	`;
	res.send(output);
});

app.get('/topic2/:id/:name', (req, res)=>{
	res.send(req.params.id+','+req.params.name);
});


app.listen(3000, ()=>{
	console.log('Connected 3000 port!');

});
