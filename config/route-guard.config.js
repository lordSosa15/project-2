//what happens if user is logged
//what user can do if they are logged in

const isLoggedIn = (req, res, next) => {
  if (!req.session.currentUser) {
    return res.redirect("/auth/login")
  }
  next()
}

//what user can do if they are logged out

const isLoggedOut = (req, res, next) => {
  //if is not logged in
  console.log(req.session.currentUser)
  if (req.session.currentUser) {
    return res.redirect("/auth/profile")
  }
  next()
}

//what user can do if they are an admin

const isAdmin = (req, res, next) => {
  if (req.session.currentUser.userType !== "admin") {
    return res.redirect("/auth/profile")
  }
  next()
}

//what user can do if they are a preparer

const isPreparer = (req, res, next) => {
  if (req.session.currentUser.userType !== "admin") {
    if (req.session.currentUser.userType !== "preparer") {
      return res.redirect("/auth/profile")
    }
  }
  next()
}

module.exports = {
  isLoggedIn,
  isLoggedOut,
  isAdmin,
  isPreparer,
}
