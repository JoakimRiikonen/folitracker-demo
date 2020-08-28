import React from 'react'
import styled from 'styled-components'
import { Map, Marker, Popup, TileLayer, ZoomControl } from 'react-leaflet'
import L from 'leaflet'
import SmallPercentageContainer from './SmallPercentageContainer'
import IconWhite from '../assets/IconWhite.svg'
import IconRed from '../assets/IconRed2.svg'

const CoolBox = styled.div`
  position: fixed;
  top: 10px;
  right: 10px;
  background: yellow;
  height: 50px;
  width: 50px;
  z-index: 401;
`

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
`

const whiteIcon = new L.Icon({
  iconUrl: IconWhite,
  iconRetinaUrl: IconWhite,
  iconSize: [20, 20],
  iconAnchor: [10,10],
  popupAnchor: [0, -1]
})

/* const pinkIcon = new L.Icon({
  iconUrl: IconPink,
  iconRetinaUrl: IconPink,
  iconSize: [20, 20],
  iconAnchor: [10,10],
  popupAnchor: [0, -1]
}) */

const redIcon = new L.Icon({
  iconUrl: IconRed,
  iconRetinaUrl: IconRed,
  iconSize: [20, 20],
  iconAnchor: [10,10],
  popupAnchor: [0, -1]
})

const FullScreenMap = (props) => {
  return(
    <Container>
      <Map center={[60.45, 22.26]} zoom={14} zoomControl={false} style={{height: '100%'}}>
        <TileLayer
            attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
            url="https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png"
        />
        {Object.keys(props.busData.vehicles).map((busID) => {
          const vehicle = props.busData.vehicles[busID]
          const lat = vehicle.latitude
          const long = vehicle.longitude
          return(
            <Marker position={[lat, long]} icon={(vehicle.lateness <= 0) ? whiteIcon : redIcon} key={busID}>
              <Popup>
                Line {vehicle.line}, {vehicle.origin} - {vehicle.destination}
                <br/>
                {
                (vehicle.lateness <= 0)
                ?
                <>On time</>
                :
                <>Late by {vehicle.lateness} seconds</>
                }
              </Popup>
            </Marker>
          )
        })}
        <ZoomControl position='bottomleft'/>
      </Map>
      <SmallPercentageContainer
        lateCount={props.lateCount}
        trackedCount={props.trackedCount}
      />
    </Container>
  )
}

export default FullScreenMap