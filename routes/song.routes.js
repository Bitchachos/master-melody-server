// const fileUploader = require('../config/cloudinary.config');

const User = require("../models/User.model");
const Song = require("../models/Song.model");
const {isAuthenticated} = require("../middleware/jwt.middleware");
const isSongCreator = require("../middleware/isSongCreator");

const { default: mongoose } = require("mongoose");

const router = require("express").Router();

// CREATE Song
router.post("/songs", isAuthenticated, (req, res, next) => {
  const { title, artist } = req.body;

  const newSong = {
    title,
    artist,
    owner: req.payload._id
  }
  Song.create(newSong)
  .then(response => res.status(201).json(response))
  .catch(err => {
      console.log("error creating a new song", err);
      res.status(500).json({
          message: "error creating a new song",
          error: err
      });
  })
});

// READ Songs
router.get("/songs", (req, res, next) => {
  Song.find().sort({createdAt: -1})
        .then(response => res.json(response))
        .catch(err => {
            console.log("error getting list of songs", err);
            res.status(500).json({
                message: "error getting list of songs",
                error: err
            });
        })
})

// READ song by id
router.get("/songs/:songId", (req, res, next) => {
  const { songId } = req.params;

  Song.findById(songId)
  .then( response => res.json(response))
  .catch( e => console.log("error reading song details", e))

})

// UPDATE song by id
router.put("/songs/:songId", isAuthenticated, isSongCreator, (req, res, next) => {
  const { songId } = req.params;

  const newDetails = {
        title: req.body.title,
        artist: req.body.artist,
        owner: req.payload._id
    }

  Song.findByIdAndUpdate(songId, newDetails)
  .then(response => res.json(response))
  .catch(e => {console.log("error updating song", e)})
})

// DELETE song
router.delete('/songs/:songId', isAuthenticated, isSongCreator, (req, res, next) => {
  const { songId } = req.params;

  Song.findByIdAndDelete(songId)
      .then(response => res.json(response))
      .catch(e => {console.log("error deleting song", e)})
});

module.exports = router;