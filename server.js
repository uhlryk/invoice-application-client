var express = require('express');
var path = require('path');
var app = express();
app.use(express.static(path.join(__dirname, '/bower_components/bootstrap-sass/assets/')));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/*', function(req, res){
  res.sendFile(path.join(__dirname + '/public/index.html'));
});
app.listen('3010');