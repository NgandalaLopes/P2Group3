const express = require('express');
const router = express.Router();




  router.get('/search/:query', (req, res) => {
    const query = req.params.query;
    const url = `https://api.jikan.moe/v4/anime?q=${query}&sfw`;
    const fetchAnime = async () => {
        const response = await fetch(url);
        const data = await response.json();
        return data.results;
    };
    fetchAnime().then((data) => {
        res.json(data);
    });
});


    
  

  
  module.exports = router;