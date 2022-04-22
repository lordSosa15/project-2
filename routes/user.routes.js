const User = require("../models/User.model")
const Form = require("../models/Form.model")
const express = require("express")
const router = express.Router()
const { isLoggedIn, isLoggedOut } = require("../config/route-guard.config")

const cloudinary = require("../config/cloudinary.config")
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

router.get("/new-form/:id", isLoggedIn, (req, res, next) => {
  User.findById(req.params.id)
    .then((userInfo) => {
      res.render("user-pages/new-form", { userInfo })
    })
    .catch((err) => console.log(err))
})

router.post(
  "/new-form/:id",
  cloudinary.single("taxDocs"),
  isLoggedIn,
  (req, res, next) => {
    let path
    if (req.file) {
      path = req.file.path
    }
    const {
      referralName,
      // UScitizen,
      taxpayerFilingStatus,
      firstName,
      lastName,
      occupation,
      taxpayerSSN,
      taxpayerDOB,
      driversLicense,
      licenseState,
      issuedDate,
      expDate,
      taxpayerPhoneNumber,
      typeOfIncome,
      taxDocs,
      bankInfo,
    } = req.body

    Form.create({
      referralName,
      // UScitizen,
      taxpayerFilingStatus,
      firstName,
      lastName,
      occupation,
      taxpayerSSN,
      taxpayerDOB,
      driversLicense,
      licenseState,
      issuedDate,
      expDate,
      taxpayerPhoneNumber,
      typeOfIncome,
      taxDocs: path,
      bankInfo,
    })
      .then((newFormFromDB) => {
        User.findByIdAndUpdate(
          req.params.id,
          { $push: { forms: newFormFromDB._id } },
          { new: true }
        ).then((updatedUser) => {
          req.session.currentUser = updatedUser
          res.redirect("/auth/profile")
        })
      })
      .catch((err) => console.log(err))
  }
)

router.get("/tax-info/:id", isLoggedIn, (req, res, next) => {
  Form.findById(req.params.id)
    .then((formInfo) => {
      console.log(formInfo)
      res.render("user-pages/tax-info", { formInfo })
    })
    .catch((err) => console.log(err))
})

// router.post("/user-pages/upload", cloudinary.single("taxDocs"), (req, res, next) => {

//   User.findByIdAndUpdate(req.session.currentUser._id, { taxDocs: req.file.path }, { new: true })
//   .then(updatedUser => {

//       // to make sure the most updated changes are saved in the logged in user object
//       // we are saving updated user in the session
//       req.session.currentUser = updatedUser;
//       res.redirect("/tax-info/:id")
//   })
//   .catch(err => {
//       console.log(err);
//       next(err);
//   })
  
// })

module.exports = router
