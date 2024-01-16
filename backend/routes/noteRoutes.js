const express = require("express")
const router = express.Router({ mergeParams: true }) // mergeParams: true allows us to access the ticketId in the noteRoutes.js file
const { getNotes, addNote } = require("../controllers/noteController")

const { protect } = require("../middleware/authMiddleware")

router.route("/").get(protect, getNotes).post(protect, addNote)

module.exports = router

// /api/tickets/:ticketId/notes
