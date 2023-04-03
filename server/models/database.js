const dotenv = require('dotenv')
dotenv.config({path:__dirname+'/.env'});

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser:true, useUnifiedTopology: true});
//mongoose.connect("mongodb://localhost:3000/posts", { useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open',function(){
    console.log('Connected')
});

module.exports = db

//Models
require('./Category');
require('./Recipe');