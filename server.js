const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const router = express.Router();
const sequelize = require('./config/connection');
require('dotenv').config();
const PORT = process.env.PORT || 3000;

const app = express();
const { auth, requiresAuth } = require('express-openid-connect');

// Serve static files from the "./public" directory
app.use(express.static(__dirname + '/public'));
const hbs = exphbs.create({});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(
  auth({
    authRequired: false,
    auth0Logout: true,
    issuerBaseURL: 'https://dev-261nnksnma1nor5y.us.auth0.com',
    baseURL: 'http://localhost:3000',
    clientID: 'QaeXHGwxFB3ktDYXPYP8ORPipVgneXIp',
    clientSecret: process.env.CLIENT_SECRET,
    secret: 'FZTsGrPaqxmnNphYbBeKYPS3KLPitcgCGMSiggLzSRm-3UKubVfzd8jQ5Ap3AKL4',
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
