import mongoose from 'mongoose';

export const connectToMongoDb = async () => {
    await mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true});
    console.log("😃  Connected to mongodb");
}