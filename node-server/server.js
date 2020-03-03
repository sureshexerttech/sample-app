const express = require('express'),
app = express(),
bodyParser = require('body-parser');
var cors = require('cors')
port = process.env.port || 3000;

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var routes = require('./routes/app-routes');
routes(app);
app.listen(port);
console.log('REST API SERVER STARTED ON '+ port);