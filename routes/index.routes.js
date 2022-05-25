const router = require("express").Router();
const authRoutes = require("./auth.routes");

//const { isAuthenticated } = require("../middleware/jwt.middleware");

/* GET home page */
router.get("/", (req, res, next) => {
  res.json("All good in the hood");
});

router.use("/auth", authRoutes);

module.exports = router;
