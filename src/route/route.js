const express = require("express");
const router = express.Router();
// const got = require('got');
const axios = require("axios");
const Movie = require("../model/Movie");

router.get("/", function (req, res) {
  res.render("search");
});

// http://localhost:3000/results?search=superman
router.post("/movie", async (req, res) => {
  var query = req.query.search;
  var url =
    "https://www.omdbapi.com/?t=" + query + `&apikey=${process.env.APIKey}`;
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
    })
    .catch(function (error) {
      if (error.response) {
        let { status, statusText } = error.response;
        console.log(status.statusText);
        res.status(status).send(statusText);
      } else {
        res.status(404).send(error);
      }
    });
  try {
    const match = movie.Title;
    const find = await Movie.find({ Title: match });
console.log(find.length)
    if (find.length === 0) {
    
      const newMovie = new Movie(movie);
      await newMovie.save();
      res.send(newMovie);
    } else {
      res.send("The Movies exists in Negrut Db");
    }
  } catch (error) {
    res.json(error.message);
  }
});

router.post("/movies", (req, res) => {
  res.send("it works");
});

module.exports = router;
