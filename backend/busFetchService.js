const axios = require('axios')

//----

const stopID = "864"
const busID = ""

const fetchStopData = async () => {
  const data = await axios.get(`http://data.foli.fi/siri/sm/${stopID}`)
  return data.data
}

const fetchBusData = async () => {
  const data = await axios.get('http://data.foli.fi/siri/vm')
  return data.data
}

const getMonitoredBuses = (data) => {
  var monitoredBuses = []
  for(key in data.result.vehicles){
    if (data.result.vehicles[key].monitored === true) {
      monitoredBuses.push(key)
    }
  }
  return monitoredBuses
}

const getLateness = (busIDList, data) => {
  var busDict = {}
  busIDList.forEach(busID => {
    
    busDict[busID] = lateness
  });
  return busDict
}

/*
format:
  {
    responsetimestamp
    vehicles: [
      id: {
        line
        origin
        destination
        longitude
        latitude
        lateness
      }
    ]
  }
*/
const formatData = (busIDList, data) => {
  var formattedData = {}
  formattedData.responsetimestamp = data.result.responsetimestamp
  var vehicles = {}
  busIDList.forEach(busID => {
    var bus = {}
    bus.line = data.result.vehicles[busID].lineref
    bus.origin = data.result.vehicles[busID].originname
    bus.destination = data.result.vehicles[busID].destinationname
    bus.longitude = data.result.vehicles[busID].longitude
    bus.latitude = data.result.vehicles[busID].latitude
    
    var aimed = data.result.vehicles[busID].next_aimedarrivaltime
    var expected = data.result.vehicles[busID].next_expectedarrivaltime
    var lateness = expected - aimed

    bus.lateness = lateness
    vehicles[busID] = bus
  })
  formattedData.vehicles = vehicles
  return formattedData
}

const getBusData = async () => {
  const data = await fetchBusData()
  var busIDList = getMonitoredBuses(data)
  var formattedData = formatData(busIDList, data)
  return formattedData
}

module.exports.getBusData = getBusData