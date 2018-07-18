'use strict';

var envvar = require('envvar');
var express = require('express');
var bodyParser = require('body-parser');
var moment = require('moment');
var plaid = require('plaid');
var axios = require('axios');

//TODO: move envar.defaults to its own file

var PLAID_CLIENT_ID = envvar.string('PLAID_CLIENT_ID');
var PLAID_SECRET = envvar.string('PLAID_SECRET');
var PLAID_PUBLIC_KEY = envvar.string('PLAID_PUBLIC_KEY');
var ACCESS_TOKEN = envvar.string('ACCESS_TOKEN');
var PLAID_ENV = envvar.string('PLAID_ENV', 'development');
var APP_PORT = envvar.number('APP_PORT', 8000);

var app = express();
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.post('/webhook', function (request, response, next) {
    console.log(request.body);
    // when a webhook is recieved from plaid, go retrieve transaction data
    axios.post('https://development.plaid.com/transactions/get', {
        "client_id": PLAID_CLIENT_ID,
        "secret": PLAID_SECRET,
        "access_token": ACCESS_TOKEN,
        "start_date": "2018-01-01",
        "end_date": "2018-08-01"
    })
        .then(function (postResponse) {
            // after we retrieve the transaction data, go update DB with transaction data
            console.log(postResponse);
            response.json(postResponse);
        })
        .catch(function (error) {
            console.log(error);
        });
});

var server = app.listen(APP_PORT, function () {
    console.log('plaid-walkthrough server listening on port ' + APP_PORT);
    axios.post('https://development.plaid.com/item/webhook/update', {
        "client_id": PLAID_CLIENT_ID,
        "secret": PLAID_SECRET,
        "access_token": ACCESS_TOKEN,
        "webhook": "http://ec2-18-207-197-213.compute-1.amazonaws.com:8000/webhook"
    })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
});
