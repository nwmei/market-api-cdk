import mongoose from "mongoose";

export const StoreItem = mongoose.model("StoreItem", {
    name: String,
    description: String,
    price: Number,
    imageUrl: String,
    seller: {
        id: String,
        firstName: String,
        lastName: String,
        emailAddress: String
    },
    likes: [String],
    comments: [{
        commenterFullName: String,
        commentText: String,
        commenterId: String,
        commenterImageUrl: String
    }],
    date: String,
    category: String,
    neighborhood: String
})