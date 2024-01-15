const mongoose = require("mongoose")

const userSchema = mongoose.Schema(
   {
      name: {
         type: String,
         required: [true, "Please enter your name"],
      },
      email: {
         type: String,
         required: [true, "Please enter your email"],
         unique: true,
         lowercase: true,
      },
      password: {
         type: String,
         required: [true, "Please enter your password"],
         minlength: 6,
      },
      isAdmin: {
         type: Boolean,
         required: true,
         default: false,
      },
   },
   {
      timestamps: true,
   }
)

module.exports = mongoose.model("User", userSchema)
