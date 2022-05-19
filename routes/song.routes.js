// const isLoggedIn = require("../middleware/isLoggedIn");
// const isOwner = require("../middleware/isOwner");
// const fileUploader = require('../config/cloudinary.config');

const User = require("../models/User.model");
const Song = require("../models/Song.model");

const { default: mongoose } = require("mongoose");

const router = require("express").Router();

// CREATE Song
  //Note: ADD middleware isLoggedIn,
router.post("/songs", (req, res, next) => {
  const { title, artist } = req.body;

  const newSong = {
    title,
    artist
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
  Song.find()
        .then(response => {
            res.json(response)
        })
        .catch(err => {
            console.log("error getting list of songs", err);
            res.status(500).json({
                message: "error getting list of songs",
                error: err
            });
        })
})



module.exports = router;