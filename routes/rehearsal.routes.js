
// const fileUploader = require('../config/cloudinary.config');

const User = require("../models/User.model");
const Song = require("../models/Song.model");
const Rehearsal = require("../models/Rehearsal.model");

const { default: mongoose } = require("mongoose");

const router = require("express").Router();

// CREATE rehearsal
  //Note: ADD middleware isLoggedIn,
router.post("/rehearsals", (req, res, next) => {
  const { date, time, genre, skillLevel, song } = req.body;

  const newRehearsal = {
    date,
    time,
    genre,
    skillLevel,
    song
  }

  console.log(song)

  Rehearsal.create(newRehearsal)
  .then(rehearsal => res.json(rehearsal))
  .catch(e => console.log("error creating song", e))
});

// READ rehearsals
router.get("/rehearsals", (req, res, next) => {
  
  Rehearsal.find()
        .populate("song")
        .then(response => res.json(response))
        .catch(e => console.log("error finding rehearsal", e))
})

// READ rehearsal by id
router.get("/rehearsals/:rehearsalId", (req, res, next) => {
  const { rehearsalId } = req.params;

  Rehearsal.findById(rehearsalId)
    .populate("song")
    .then((response) => res.json(response))
    .catch((e) => console.log("error reading rehearsal details", e));
});

// UPDATE rehearsal by id
router.put("/rehearsals/:rehearsalId", (req, res, next) => {
  const { date, time, genre, skillLevel, song } = req.body;
  const { rehearsalId } = req.params;

  const newDetails = {
    date,
    time,
    genre,
    skillLevel,
    song
  }

  Rehearsal.findByIdAndUpdate(rehearsalId, newDetails)
  .then(response => res.json(response))
  .catch(e => {console.log("error updating rehearsal", e)})
})


module.exports = router;