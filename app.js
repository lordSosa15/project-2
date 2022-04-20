// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config")

// ℹ️ Connects to the database
require("./db")

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express")

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs")

hbs.registerHelper("if_eq", function (a, b, opts) {
  if (a == b) {
    return opts.fn(this)
  } else {
    return opts.inverse(this)
  }
})

hbs.registerHelper("index_of", function (context, ndx) {
  return context[ndx]
})

const app = express()

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app)
require("./config/session.config")(app)

//this middleware allows us to have a global user object --> "userInSession"
//which we can use now anywhere in our application(in any {{ HBS }} file)
const globalUserObject = require("./config/global-user.config")
app.use(globalUserObject)

// default value for title local
const capitalized = require("./utils/capitalized")
const projectName = "project2"

app.locals.appTitle = `${capitalized(projectName)} Tax Preparation Services`

// 👇 Start handling routes here
const index = require("./routes/index.routes")
app.use("/", index)

const authRoutes = require("./routes/auth.routes")
app.use("/", authRoutes)

const userRoutes = require("./routes/user.routes")
app.use("/", userRoutes)

const preparerRoutes = require("./routes/preparer.routes")
app.use("/", preparerRoutes)

const adminRoutes = require("./routes/admin.routes")
app.use("/", adminRoutes)

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app)

module.exports = app
