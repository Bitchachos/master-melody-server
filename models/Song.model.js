const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const songSchema = new Schema({
    title: {
        type: String,
        required: [true, "Please enter the song title"]
    },
    artist: {
        type: String,
        required: [true, "Please enter the artist"]
    },
    owner: { type: Schema.Types.ObjectId, ref: "User" }
});

const Song = model("Song", songSchema);

module.exports = Song;