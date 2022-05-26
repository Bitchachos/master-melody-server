
// const fileUploader = require('../config/cloudinary.config');

const User = require("../models/User.model");
const Song = require("../models/Song.model");
const Rehearsal = require("../models/Rehearsal.model");
const {isAuthenticated} = require("../middleware/jwt.middleware");
const isRehearsalCreator = require("../middleware/isRehearsalCreator");

const { default: mongoose } = require("mongoose");

const router = require("express").Router();

// CREATE rehearsal
router.post("/rehearsals", isAuthenticated, (req, res, next) => {

  // const genresArr = Rehearsal.schema.path("genre").enumValues;

  // console.log(genresArr);

  const { name, date, time, genre, skillLevel, song } = req.body;

  const newRehearsal = {
    name,
    date,
    time,
    genre,
    skillLevel,
    song,
    owner: req.payload._id
  }

  Rehearsal.create(newRehearsal)
  .then(rehearsal => res.json(rehearsal))
  .catch(e => console.log("error creating song", e))
});

// READ rehearsals
router.get("/rehearsals", (req, res, next) => {

  Rehearsal.find().sort({createdAt: -1})
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
router.put("/rehearsals/:rehearsalId", isAuthenticated, isRehearsalCreator, (req, res, next) => {
  const { name, date, time, genre, skillLevel, song } = req.body;
  const { rehearsalId } = req.params;

  const newDetails = {
    name,
    date,
    time,
    genre,
    skillLevel,
    song,
    owner: req.payload._id
  }

  Rehearsal.findByIdAndUpdate(rehearsalId, newDetails)
  .then(response => res.json(response))
  .catch(e => console.log("error updating rehearsal", e))
})

// DELETE rehearsal
router.delete("/rehearsals/:rehearsalId", isAuthenticated, isRehearsalCreator, (req, res, next) => {
  const { rehearsalId } = req.params;

  Rehearsal.findByIdAndDelete(rehearsalId)
      .then(response => res.json(response))
      .catch(e => console.log("error deleting rehearsal", e))
});

module.exports = router;