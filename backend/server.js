require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");

const app = express();

// var corsOptions = {
//   origin: process.env.CLIENT_ORIGIN || "http://localhost:8081"
// };
const corsOptions = {
  origin: 'http://localhost:3000', // Ustaw to na odpowiedni adres URL twojego frontendu
  credentials: true, // Pozwala na wysyłanie ciasteczek i uwierzytelnianie HTTP
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json({ limit: '20mb' }));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "projekt-js-session",
    keys: ["COOKIE_SECRET"], // should use as secret environment variable
    httpOnly: true,
    sameSite: 'strict'
  })
);

const db = require("./app/models");
const Role = db.role;

// Synchronizujemy bazę danych
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
  initial(); // Wywołanie funkcji initial() tutaj
});

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to main api page." });
});

// Middleware to verify token on all routes except sign in and sign up
const { verifyToken } = require("./app/middleware/authJwt");

// Routes that do not require authentication
require("./app/routes/auth.routes")(app);

// Apply verifyToken middleware to all routes after this point
app.use(verifyToken);

// Routes that require authentication
require("./app/routes/turorial.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/ads.routes")(app);


// set port, listen for requests
const PORT = process.env.NODE_DOCKER_PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.create({
    id: 1,
    name: "user",
  });

  Role.create({
    id: 2,
    name: "moderator",
  });

  Role.create({
    id: 3,
    name: "admin",
  });
}