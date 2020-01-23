const router = require("express").Router()
const sessionRoutes = require("./session")

// Controllers
const { v1 } = require("../../controllers")

/** @define routes */

// Show user information
router.get("/",
  v1.user.profile)

router.use("/sessions",
  sessionRoutes)

// Exports router
module.exports = router
