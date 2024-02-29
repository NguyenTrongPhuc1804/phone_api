const express = require("express");
const { screenShot } = require("../controllers/buildPdf.controller");
const pdfRouter = express.Router();
pdfRouter.get("/", screenShot);
module.exports = pdfRouter;
