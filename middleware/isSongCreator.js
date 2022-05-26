const Song = require("../models/Song.model");

module.exports = (req, res, next) => {
  const id = req.params.songId;


  Song.findById(id)
    .then((song) => {
      if (req.payload._id === song.owner._id.toString()){
        next();
      }
      else {
        res.redirect("/");
      }
    })
    .catch(e => {
      console.log("error checking if current user is creator of song", e)
    })
};
