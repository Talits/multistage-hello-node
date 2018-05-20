var express = require('express');
var app = express();

var http = require('http');
var ejs = require('ejs');
var fs = require('fs');
var counter=0;

http.createServer(function(req,res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  fs.readFile('index.html', 'utf-8', function(err, content) {
   
    
    counter++;
    var renderedHtml = ejs.render(content, {counter: counter});  
        res.end(renderedHtml);
    });
    
}).listen(3000);


