const express = require('express');
const session = require('express-session');
const router = express.Router();
const sequelize = require('./config/connection');
require('dotenv').config();
const PORT = process.env.PORT || 3000;

const app = express();
const { auth, requiresAuth } = require('express-openid-connect');

// Serve static files from the "./public" directory
app.use(express.static(__dirname + '/public'));

app.use(
  auth({
    authRequired: false,
    auth0Logout: true,
    issuerBaseURL: process.env.ISSUER_BASE_URL,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    secret: process.env.SECRET,
  })
);

// Define a route handler for the homepage
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user))
})

app.use(router);

app.listen(PORT, () => {
  console.log('Server listening on: http://localhost:' + PORT);
});