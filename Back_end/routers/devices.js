const express = require("express");
const router = express.Router();
const {
  listDevices,

} = require("../controllers/deviceControllers");

router.get("/getALlDevice", listDevices); // GET /api/devices


module.exports = router;