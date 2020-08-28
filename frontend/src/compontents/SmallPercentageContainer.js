import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: inline-grid;
  position: fixed;
  top: 0px;
  right: 0px;
  z-index:401;
  grid-template-columns: auto auto;
  grid-gap: 5px;
  background: white;
  margin: 20px auto;
  padding: 20px;
  border-radius: 15px 0 0 15px;
  border: 2px solid #EAAB00;
  border-right: 2px solid white;

  @media (max-width: 700px) {
    padding: 15px;
    grid-gap: 2px;
    margin: 10px auto;
  }
`

const Percentage = styled.div`
  grid-column: 1;
  grid-row: 1 / 3;
  font-size: 45px;
  text-align: right;

  @media (max-width: 700px) {
    font-size: 25px;
  }
`

const Text = styled.div`
  grid-column: 2;
  grid-row: 1;
  font-size: 30px;

  @media (max-width: 700px) {
    font-size: 20px;
  }
`

const Tracked = styled.div`
  grid-column: 2;
  grid-row: 2;
  font-size: 15px;
  color: grey;

  @media (max-width: 700px) {
    font-size: 10px;
  }
`

const SmallPercentageContainer = (props) => {
  return(
    <Container>
      <Percentage>
        {(Math.round((props.lateCount / props.trackedCount) * 10000) / 100).toFixed(2)}%
      </Percentage>
      <Text>
        of tracked busses are late
      </Text>
      <Tracked>
        {props.lateCount} late of {props.trackedCount} tracked
      </Tracked>
    </Container>
  )
}

export default SmallPercentageContainer