const express = require('express');

const https = require('https');
const fs = require('fs');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

require('dotenv').config();
require('./db');


const sslOptions = {
    key: fs.readFileSync('./security/key.pem'),
    cert: fs.readFileSync('./security/certificate.crt')
};

const server = https.createServer(sslOptions, app);

const userRoutes = require('./routes/userRoutes');

const HTTP_PORT = process.env.HTTP_PORT || 8080;
const HTTPS_PORT = process.env.HTTPS_PORT || 8081;


app.get('/ping', (req, res) => {
    res.send('Server is running...')
});

app.get('/', (req, res) => {
    res.send('user api are up and running...');
});

app.use('/api', userRoutes);

app.listen(HTTP_PORT, () => {
    console.log('Server is listening http://localhost:' + HTTP_PORT);
})

server.listen(HTTPS_PORT, () => {
    console.log('Server is listening https://localhost:' + HTTPS_PORT);
})
