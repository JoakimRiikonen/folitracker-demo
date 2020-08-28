import React, {useState, useEffect} from 'react';
import busService from './busService'
import FullScreenMap from './compontents/FullScreenMap'
import './App.css'

const App = () => {

  const [busData, setBusData] = useState({})
  const [lateCount, setLateCount] = useState(0)
  const [trackedCount, setTrackedCount] = useState(0)
  const [avgLateness, setAvgLateness] = useState(0)

  const calculateFromData = (data) => {
    var latenessSum = 0
    var lateCount = 0
    var busIDList = Object.keys(data.vehicles)
    busIDList.forEach((key) => {
      const lateness = data.vehicles[key].lateness
      if(lateness > 0) {
        lateCount += 1
        latenessSum += lateness
      }
    })
    setAvgLateness(latenessSum / lateCount)
    setLateCount(lateCount)
    setTrackedCount(busIDList.length)
  }

  useEffect(() => {
    const fetchData = () => {
      busService
      .getBuses()
      .then((data) => {
        setBusData(data)
        calculateFromData(data)
      })
    }

    fetchData()
    const timer = setInterval(() => {
      console.log('fetching data from backend')
      fetchData()
    }, 10000);

    return () => clearInterval(timer)
  }, [])

  if(!busData.vehicles){
    return(
      <div>hello</div>  
    )
  }

  return(
    <FullScreenMap 
      avgLateness={avgLateness}
      lateCount={lateCount}
      trackedCount={trackedCount}
      busData={busData}/>
  )
}

export default App;
