const { Schema, model } = require("mongoose")
const { compare, hash, genSaltSync } = require("bcrypt")
const { ErrorMessage } = require("../lib/messages")

const userSchema = new Schema({
  avatar: {
    default: null,
    type: String
  },
  bio: {
    default: null,
    type: String
  },
  birthday: {
    default: null,
    type: Date
  },
  email: {
    lowercase: true,
    required: true,
    trim: true,
    type: String,
    unique: true
  },
  firstName: {
    default: null,
    type: String
  },
  lastName: {
    default: null,
    type: String
  },
  job: {
    default: null,
    type: String
  },
  password: {
    required: true,
    type: String
  },
  roles: {
    default: ["user"],
    type: [String]
  },
  status: {
    default: "inactive",
    type: String
  },
  username: {
    lowercase: true,
    required: true,
    trim: true,
    type: String,
    unique: true
  }
}, { timestamps: true })

// Index fields
userSchema.index({ email: 1 })
userSchema.index({ username: 1 })
userSchema.index({ createdAt: -1 })

userSchema.pre("save", async function(next) {
  try {
    // If password modified, hash it
    if (this.isModified("password")) {
      this.password = await hash(this.password, genSaltSync(10))
      next()
    }
  } catch (err) {
    next(err)
  }
})

// Manage and prevent copy information from being imported { email, username }
userSchema.post("save", function(error, doc, next) {
  if (error.name === "MongoError" && error.code === 11000) {
    next(new ErrorMessage("Exists Data", `${error.keyPattern.username ? "Username" : "Email"} is already`, 422))
  } else {
    next()
  }
})

/** Compare passwords
 * @param {string} password
 * @return true/false
 */
userSchema.methods.comparePassword = async function(password) {
  return await compare(password, this.password)
}

module.exports = model("User", userSchema)
