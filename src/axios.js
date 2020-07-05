import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://rawg-video-games-database.p.rapidapi.com',
  headers: {
    "x-rapidapi-host": "rawg-video-games-database.p.rapidapi.com",
    "x-rapidapi-key": "7ac7187514mshdb9d7deb6abf8edp1d5bb7jsnb12a298f5a3a"
    // "Authorization": 'AUTH token from instance header'
  }
})

// instance.defaults.headers.common['Authorization'] = 'AUTH token from instance'

export default instance