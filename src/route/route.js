const express = require("express");
const router = express.Router();
// const got = require('got');
const axios = require("axios");
const Movie = require("../model/Movie");
const {movie} = require('../controller/movie')
const {authFactory, AuthError} = require('../auth')


router.get("/",  function (req, res) {
  res.render("search");
});


router.post("/movie", authFactory, AuthError, movie);

router.post("/movies", (req, res) => {
  res.send("it works");
});

module.exports = router;
