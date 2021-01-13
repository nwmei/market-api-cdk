const mongoose = require("mongoose");

const Comment = mongoose.model("Comment", {
    commenterId: String,
    storeItemId: String,
    commentText: String
})

exports.Comment = Comment;