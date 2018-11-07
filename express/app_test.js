var express = require('express');
var fs = require('fs');

var app = express();
app.get('/', (req, res)=>{
	res.send('Hello  home page');
});

app.get('/login', (req, res)=>{
	res.send('Login please');
});


app.get('/dynamic', (req, res)=>{
	fs.readFile('public/dynamic.html','utf8', (err, data)=>{
		res.send(data);
	});
});

app.get('/topic', (req, res)=>{
	let topics = [
		'JavaScript is ...',
		'NodeJs is ...',
		'Express is ...'
	];

	let output = `
		<a href="/topic?id=0">JavaScript</a><br>
		<a href="/topic?id=1">Nodejs</a><br>
		<a href="/topic?id=2">Express</a><br>
		${topics[req.query.id]}
	`;
	res.send(output);
});

app.get('/topic2/:id', (req, res)=>{
	let topics = [
		'JavaScript is ...',
		'NodeJs is ...',
		'Express is ...'
	];

	let output = `
		<a href="/topic?id=0">JavaScript</a><br>
		<a href="/topic?id=1">Nodejs</a><br>
		<a href="/topic?id=2">Express</a><br>`
		if (topics[req.params.id])
			output += topics[req.params.id]
		//${topics[req.params.id]}
	;
	res.send(output);
});

app.get('/topic2/:id/:name', (req, res)=>{
	res.send(req.params.id+','+req.params.name);
});


app.listen(3000, ()=>{
	console.log('Connected 3000 port!');

});
