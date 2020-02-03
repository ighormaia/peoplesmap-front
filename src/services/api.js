import axios from "axios";

const localhost = 'http://localhost:8000/api/v1';
const heroku = 'https://peoplesmap-api.herokuapp.com:8000/api/v1';
const ufsUrl = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados';

const api = axios.create({
  baseURL: heroku
});

const ufApi = axios.create({
  baseURL: ufsUrl
})

export { api, ufApi };
