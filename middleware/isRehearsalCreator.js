const Rehearsal = require("../models/Rehearsal.model");

module.exports = (req, res, next) => {
  const id = req.params.rehearsalId;


  Rehearsal.findById(id)
    .then((rehearsal) => {
      if (req.payload._id === rehearsal.owner._id.toString()){
        next();
      }
      else {
        res.redirect("/");
      }
    })
    .catch(e => {
      console.log("error checking if current user is player of a rehersal", e)
    })
};
