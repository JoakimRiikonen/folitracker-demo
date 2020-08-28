const axios = require('axios')
const express = require("express")
const cron = require('node-cron')
const fs = require('fs')
const app = express();
const cors = require("cors");

const busFetchService = require('./busFetchService')

//temp
var BUSDATA = {}

app.use(cors());

cron.schedule("*/10 * * * * *", async () => {
  console.log('fetching buses')
  BUSDATA = await busFetchService.getBusData()
})

app.get("/api/buses", (req, res) => {
  res.status(200).json(BUSDATA);
});

module.exports = app

/*

PLANS:
yksi bussi

needed:
viimeinen pysakki -> bussin linjasta selvitettävä
pysäkin latlong
bussin latlong

kun pysäkki = bussi, matka päättynyt

myöhästymisen määrä bussi.recordedattime - pysäkki.arrival_time

kaikki pysäkit:
kaikki liikkeellä olevien bussien kohde
-> gtfs.stop_times.kohde.arrival_time

kun koordinaatit lähekkäin, laske current time - arrival time

kaikkien bussien seuraaminen 247 varmaan kallista?

ghetto edition:

kaikki bussit -> expected-aimed per pysakki

*/

