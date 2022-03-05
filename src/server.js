const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { authFactory, AuthError } = require("./auth");
require('dotenv').config()
const ejsMate = require("ejs-mate");
const connectDB = require('./db')

const path = require("path");
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

connectDB()
const apiRoute = require('./route/route')
const PORT = 3000;

console.log(process.env.JWT_SECRET)

const { JWT_SECRET } = process.env;
if (!JWT_SECRET) {
  throw new Error("Missing JWT_SECRET env var. Set it and restart the server");
}
const auth = authFactory(JWT_SECRET);


app.use(bodyParser.json());

// Mounting Route
app.use('/', apiRoute)



















app.post("/auth", (req, res, next) => {
  if (!req.body) {
    return res.status(400).json({ error: "invalid payload" });
  }
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "invalid payload" });
  }

  try {
    const token = auth(username, password);
    return res.status(200).json({ token });
  } catch (error) {
    if (error instanceof AuthError) {
      return res.status(401).json({ error: error.message });
    }

    next(error);
  }
});

app.use((error, _, res, __) => {
  console.error(
    `Error processing request ${error}. See next message for details`
  );
  console.error(error);

  return res.status(500).json({ error: "internal server error" });
});

app.listen(PORT, () => {
  console.log(`auth svc running at port ${PORT}`);
});
