const Movie = require("../model/Movie");
const axios = require("axios");



const callApi = async(req, res, url) =>{
let movie;
await axios
.post(url)
.then(function (response) {
  movie = {
    Title: response.data.Title,
    Released: response.data.Released,
    Genre: response.data.Genre,
    Director: response.data.Director,
  };
}).catch(function (error) {
    if (error.response) {
      let { status, statusText } = error.response;
      console.log(status.statusText);
      res.status(status).send(statusText);
    } else {
      res.status(404).send(error);
    }
  });
}


module.exports = callApi;