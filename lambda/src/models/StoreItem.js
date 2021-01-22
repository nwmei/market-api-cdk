const mongoose = require("mongoose");

const StoreItem = mongoose.model("StoreItem", {
    name: String,
    description: String,
    price: Number,
    imageUrls: [String],
    seller: {
        id: String,
        firstName: String,
        lastName: String,
        emailAddress: String,
        imageUrl: String
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

exports.StoreItem = StoreItem;
