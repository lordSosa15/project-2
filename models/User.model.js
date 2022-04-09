const { Schema, model } = require("mongoose")

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      trim: true,
      required: [true, "username is required."],
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      required: [true, "email is required."],
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"], //it can be here or in auth.routes
      lowercase: true,
    },
    passwordHash: {
      type: String,
      required: [true, "password is required"],
    },
    firstName: String,
    lastName: String,
    birthday: {
      type: String,
      format: Date,
    },
    address: {
      type: Object,
      properties: {
        street_address: String,
        city: String,
        state: String,
        country: String,
      },
    },
  },
  {
    timestamps: true,
  }
)

module.exports = model("User", userSchema)
