import axios from 'axios'

const getBuses = () => {
  const req = axios.get('/api/buses')
  return req.then(res => res.data)
}

export default {getBuses}