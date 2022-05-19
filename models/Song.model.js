const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const songSchema = new Schema({
    title: String,
    artist: String
});

const Song = model("Song", songSchema);

module.exports = Song;