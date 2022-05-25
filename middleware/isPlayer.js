const Rehearsal = require("../models/Rehearsal.model");

module.exports = (req, res, next) => {
    const id = req.params.rehearsalId;

    Rehearsal.findById(id)
    // .populate("owner")
    .then( (rehearsal) => {
       if (req.payload._id === rehearsal.owner._id.toString()) next(); 
      else res.redirect("/");
    })
    }
  