const User = require("../models/User.model")
const express = require("express")
const router = express.Router()
const { isLoggedIn, isPreparer } = require("../config/route-guard.config")

// all routes here

router.get("/users-list", isLoggedIn, isPreparer, (req, res, next) => {
  User.find()
    .then((usersFromDB) => {
      res.render("preparer-pages/users-list", { users: usersFromDB })
    })
    .catch((err) => console.log(err))
})

router.get("/user-details/:id", isLoggedIn, isPreparer, (req, res, next) => {
  User.findById(req.params.id)
    .then((userDetails) => {
      res.render("preparer-pages/user-details", userDetails)
    })
    .catch((err) => console.log(err))
})

module.exports = router
