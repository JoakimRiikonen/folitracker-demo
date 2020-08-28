const axios = require('axios')
const express = require("express")
const cron = require('node-cron')
const fs = require('fs')
const app = express();
const cors = require("cors");

const busFetchService = require('./busFetchService')

app.use(cors());

app.ise

cron.schedule("*/10 * * * * *", async () => {
  console.log('fetching buses')
  BUSDATA = await busFetchService.getBusData()
})

app.get("/api/buses", (req, res) => {
  res.status(200).json(BUSDATA);
});

module.exports = app
