const User = require("../models/User.model")
const express = require("express")
const router = express.Router()
const { isLoggedIn, isLoggedOut } = require("../config/route-guard.config")

// all routes here

router.get("/personal-info/:id", isLoggedIn, (req, res, next) => {
  User.findById(req.params.id)
    .then((userInfo) => {
      res.render("user-pages/personal-info", { userInfo })
    })
    .catch((err) => console.log(err))
})

router.post("/personal-info/:id", (req, res, next) => {
  const { firstName, lastName, birthday, address } = req.body

  User.findByIdAndUpdate(
    req.params.id,
    { firstName, lastName, birthday, address },
    { new: true }
  )
    .then((updatedInfo) => {
      req.session.currentUser = updatedInfo

      res.redirect("/auth/profile")
    })
    .catch((err) => console.log(err))
})

router.get("/new-form", isLoggedIn, (req, res, next) => {
  res.render("user-pages/new-form")
})

module.exports = router
