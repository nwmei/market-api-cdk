const mongoose = require('mongoose');

const connectToLocalMongoDb = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true});
        console.log("😃  Connected to mongodb");
    } catch (e) {
        console.log("Error here: ", e);
    }
};

exports.connectToLocalMongoDb = connectToLocalMongoDb;
