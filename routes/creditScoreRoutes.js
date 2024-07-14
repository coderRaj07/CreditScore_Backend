const express = require("express");
const { getCreditScore } = require("../controllers/creditScoreController");

const router = express.Router();

router.get("/get-credit-score/:address", getCreditScore);

module.exports = router;
