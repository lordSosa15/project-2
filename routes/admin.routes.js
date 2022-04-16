const User = require("../models/User.model")
const express = require("express")
const router = express.Router()
const { isLoggedIn, isAdmin } = require("../config/route-guard.config")
const res = require("express/lib/response")

// all routes here

router.get("/roles", isLoggedIn, isAdmin, (req, res, next) => {
  User.find()
    .then((usersFromDB) => {
      res.render("admin-pages/roles", { users: usersFromDB })
    })
    .catch((err) => console.log(err))
})

module.exports = router
