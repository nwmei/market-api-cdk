import mongoose from "mongoose";

export const Comment = mongoose.model("Comment", {
    commenterId: String,
    storeItemId: String,
    commentText: String
})