'use strict';

var envvar = require('envvar');
var express = require('express');
var bodyParser = require('body-parser');
var moment = require('moment');
var plaid = require('plaid');
var axios = require('axios');

var APP_PORT = envvar.number('APP_PORT', 8000);

var app = express();
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.post('/webhook', function (request, response, next) {
    console.log(request.body);
    response.json('hit webhook');
});

var server = app.listen(APP_PORT, function () {
    console.log('plaid-walkthrough server listening on port ' + APP_PORT);
});
