const User = require("../models/User.model")
const Form = require("../models/Form.model")
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

router.get("/user-role/:id", isLoggedIn, isAdmin, (req, res, next) => {
  User.findById(req.params.id)
    .populate("forms")
    .then((userDetails) => {
      res.render("admin-pages/admin-user-details", userDetails)
      console.log(userDetails.userType)
    })
    .catch((err) => console.log(err))
})

router.post("/user-role/:id", (req, res) => {
  const { userType } = req.body

  User.findByIdAndUpdate(req.params.id, { userType }, { new: true })
    .then((updatedUser) => res.redirect(`/roles`))
    .catch((err) => console.log(err))
})

module.exports = router
