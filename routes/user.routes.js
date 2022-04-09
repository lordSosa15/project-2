const User = require("../models/User.model")
const express = require("express")
const router = express.Router()

// all routes here

router.post("/personal-info/:id", (req, res, next) => {
  const { firstName, lastName } = req.body

  User.findByIdAndUpdate(req.params.id, { firstName, lastName }, { new: true })
    .then((updatedInfo) => res.redirect(`/auth/profile`))
    .catch((err) => console.log(err))
})

router.get("/personal-info/:id", (req, res, next) => {
  User.findById(req.params.id)
    .then((userInfo) => {
      res.render("user-pages/personal-info", { userInfo })
    })
    .catch((err) => console.log(err))
})

module.exports = router
