const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const rehearsalSchema = new Schema({
    date: Number,
    time: Number,
    genre: {
        type: String,
        enum: ["Pop", "Rock", "Indie", "Jazz", "Metal", "Country"]
    },
    skillLevel: {
        type: String,
        enum: ["Beginner", "Intermediate", "Advanced"]
    },
    song: { type: Schema.Types.ObjectId, ref: "Song" }
},
    {
        // this second object adds extra properties: `createdAt` and `updatedAt`
        timestamps: true,
    }
);

const Rehearsal = model("Rehearsal", rehearsalSchema);

module.exports = Rehearsal;