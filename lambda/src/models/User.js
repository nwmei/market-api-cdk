const mongoose = require("mongoose");

const User = mongoose.model("User", {
    accessToken: String,
    firstName: String,
    lastName: String,
    emailAddress: String,
    imageUrl: String,
    likedItems: [String],
    listedItems: [String]
})

exports.User = User;
