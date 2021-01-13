import mongoose from "mongoose";

export const User = mongoose.model("User", {
    accessToken: String,
    firstName: String,
    lastName: String,
    emailAddress: String,
    imageUrl: String,
    likedItems: [String],
    listedItems: [String]
})