import axios from 'axios';

const movieDB = axios.create({
  baseURL: 'https://api.themoviedb.org/3/movie',
  params: {
    api_key: 'fd4039b4334234e9659e9d39535e5897',
    language: 'es-ES',
  },
});

export default movieDB;
