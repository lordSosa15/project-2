const { Schema, model } = require("mongoose")

const userSchema = new Schema(
  {
    userType: {
      type: String,
      enum: ["user", "preparer", "admin"],
      default: "user",
    },
    username: {
      type: String,
      // unique: true,
      trim: true,
      required: [true, "username is required."],
    },
    email: {
      type: String,
      // unique: true,
      trim: true,
      required: [true, "email is required."],
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"], //it can be here or in auth.routes
      lowercase: true,
    },
    passwordHash: {
      type: String,
      required: [true, "password is required"],
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    birthday: {
      type: String,
      format: Date,
    },
    address: {
      type: String,
    },
    forms: [
      {
        type: Schema.Types.ObjectId,
        ref: "Form",
      },
    ],
  },
  {
    timestamps: true,
  }
)

module.exports = model("User", userSchema)
