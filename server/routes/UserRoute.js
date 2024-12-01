const express = require("express");
const router = express.Router();

// import controllers
const { signup, login, logout } = require("../controllers/Auth");

// handle routes
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

// export
module.exports = router;