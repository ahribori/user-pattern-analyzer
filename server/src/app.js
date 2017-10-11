/* =========================================
 Load dependencies
 ============================================*/
import './conf';
import appPath from './conf/path'
import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import path from 'path';
import fs from 'fs';
import figlet from 'figlet';
import api from './api';
require('./test');

/* =========================================
 Express Configuration
 ============================================*/
const app = express();
const port = process.env.PORT || 8080;

// parse JSON and url-encoded query
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// access log setting
const accessLogStream = fs.createWriteStream(path.join(appPath.LOG_PATH, 'access.log'), { flags: 'a' });
app.use(morgan('combined', { stream: accessLogStream }));
app.use(morgan('dev'));

// open the server
app.listen(port, () => {
    figlet('Express', (err, logo) => {
        console.log(logo);
        console.log(`Listening on port ${port}...`);
    })
});

// set public path
app.use('/', express.static(path.join(__dirname, './../public')));
app.use('/', express.static(path.join(__dirname, './../screenshots')));

// set api router
app.use('/', api);

/* handle error */
app.use(function (err, req, res, next) {
    res.status(err.status || 500).send('Something broke!');
});