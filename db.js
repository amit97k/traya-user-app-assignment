const mongoose = require('mongoose');
const db_host = process.env.DB_HOST;


mongoose.connect(db_host)
    .then(() => {
        console.log('MongoDB Connnected...')
    }).catch((err) => {
        console.log('Error while Connecting to MongoDB...', err);
    })