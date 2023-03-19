const express = require('express');
const router = express.Router();
const sequelize = require('../config/connection');
const {Post, User,Comment }= require('../../models');
const http = require('http');

router.get('/search/:type/:query', (req, res) => {
    const { type, query } = req.params;
    const url = `http://api.jikan.moe/v3/search/${type}?q=${encodeURIComponent(query)}`;
  
    http.get(url, (apiRes) => {
      let data = '';
  
      apiRes.on('data', (chunk) => {
        data += chunk;
      });
  
      apiRes.on('end', () => {
        try {
          const searchResults = JSON.parse(data);
          res.status(200).json(searchResults);
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Something went wrong!' });
        }
      });
    }).on('error', (error) => {
      console.error(error);
      res.status(500).json({ message: 'Something went wrong!' });
    });
  });
  
  module.exports = router;