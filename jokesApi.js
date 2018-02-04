'use strict';

const axios = require('axios');
const client = axios.create({
  headers: {
    'User-Agent': 'dad-jokes-alexa-skill (https://github.com/djheru/dad-jokes)',
    Accept: 'application/json'
  }
});
const url = 'https://icanhazdadjoke.com';
const errorMsg = 'Sorry, there was a problem retrieving the joke';

const initialCallback = (result) => {
  console.log('initial callback');
  if (result.status === 200 && result.data && result.data.joke) {
    return result.data.joke;
  }
  throw new Error('no joke');
};

const finalCallback = (result) => {
  console.log('final callback');
  return (result.status === 200 && result.data && result.data.joke) ?
    result.data.joke : errorMsg;
};

const makeRequest = (url) => client.get(url);


const fetchRandom = () =>
  makeRequest(url)
    .then(initialCallback)
    .catch(() => makeRequest(url).then(finalCallback));

module.exports = fetchRandom;