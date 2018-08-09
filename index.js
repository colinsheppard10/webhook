'use strict';

var envvar = require('envvar');
var express = require('express');
var bodyParser = require('body-parser');

var APP_PORT = envvar.number('APP_PORT', 3021);

var app = express();
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.get('/webhook', function (request, response, next) {
    console.log("hit webhook on server");
    response.send("hit webhook");
});

var server = app.listen(APP_PORT, function () {
    console.log('plaid-walkthrough server listening on port ' + APP_PORT);
});
