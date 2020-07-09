const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
const uri = process.env.ATLAS_URI;

mongoose.connect(uri, {useNewUrlParser : true, useCreateIndex :true, useUnifiedTopology : true});
const connection = mongoose.connection;

connection.once('open', () => {
    console.log('Database Attached..');
}).then(() => {
    console.log('Database Attached..');
}).catch(() => {
    console.log('Database error');
});


app.use(cors());

app.use(express.json());


require('./routes/authenticate.js')(app);

app.listen(port, () => {
    console.log('Wolf Listening to You..');
});