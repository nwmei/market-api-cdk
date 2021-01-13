const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');
//const certFileBuf = [fs.readFileSync(path.join(__dirname + '/rds-combined-ca-bundle.pem'))];
const {SSL_CERTIFICATE} = require('./config');

let client = null;

const connectToMongoDb = async () => {
    const uri = 'mongodb://nwmei:12345678@marketdocdb.cluster-cmwb6x2mbbal.us-east-1.docdb.amazonaws.com:27017';
    console.log("in the connect to db function")
    //await mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});
    try {
        client = await mongoose.connect(uri, {useNewUrlParser: true, ssl: true, sslCA: SSL_CERTIFICATE });
        console.log("😃  Connected to mongodb");
    } catch (e) {
        console.log("Error here: ", e);
    }
};

exports.connectToMongoDb = connectToMongoDb;
