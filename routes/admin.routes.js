const User = require("../models/User.model")
const express = require("express")
const router = express.Router()
const { isLoggedIn, isLoggedOut } = require("../config/route-guard.config")

// all routes here

router.get("/roles", isLoggedIn, (req, res, next) => {
  User.find()
    .then((usersFromDB) => {
      res.render("admin-pages/roles", { users: usersFromDB })
    })
    .catch((err) => console.log(err))
})

module.exports = router
