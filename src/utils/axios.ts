import axios, { AxiosInstance } from 'axios';

const client: AxiosInstance = axios.create();
const baseURL = 'http://localhost:1337';

client.defaults.baseURL = baseURL;
client.defaults.withCredentials = true;

export default client;
