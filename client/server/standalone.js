require('dotenv').config();
/* =========================================
 Load dependencies
 ============================================*/
import express from 'express';
import path from 'path';
import figlet from 'figlet';

/* =========================================
 Load Config.js
 ============================================*/
const port = process.env.PORT || 8088;

/* =========================================
 Express Configuration
 ============================================*/
const app = express();

app.use('/', express.static(path.resolve(__dirname, '../build')));

app.use('*', function (req, res) {
    res.sendFile(path.resolve(__dirname, '../build/index.html'));
});

// open the server
app.listen(port, () => {
    figlet('React App', (err, data) => {
        console.log(data);
        console.log(`Running on port ${port}...`);
    });
});