const express = require('express');
 app = express();
const mongoose = require('mongoose');
const config = require('./config');
const reference = require('./webapi/referenceService');
const chapter = require('./webapi/chapterService');
const user = require('./webapi/userService');
//const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');

//mongoose.Promise = global.Promise;
mongoose.connect(config.getDbConnectionString(), { useMongoClient: true });

//On Connection
mongoose.connection.on('connected', () => {
    console.log('Connected to database: ' + config.getDbConnectionString());
});

//On Error Connection
mongoose.connection.on('error', (err) => {
    console.log('Database error: ' + err);
});

//Port Number
const port = process.env.PORT || 3000;

//CORS MiddleWare
//app.use(cors());

//Set Static Folder
app.use('/assets', express.static(__dirname + '/public'));

//Body Parser MiddleWare
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./passport-config/passport')(passport);

app.use('/reference', reference);
app.use('/user', user);
app.use('/chapter', chapter);

//Start Server
app.listen(port, () => {
    console.log('Server started on port ' + port);
});
