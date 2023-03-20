const express = require('express');
const router = express.Router();
const http = require('http');
router.get('/search/:query', async (req, res) => {
    
    
    const url = `https://api.jikan.moe/v4/anime?q=${query}&sfw`;
    const fetchAnime = async () => {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    };
});
    
  
//     http.get(url, (apiRes) => {
//       let data = '';
  
//       apiRes.on('data', (chunk) => {
//         data += chunk;
//       });
  
//       apiRes.on('end', () => {
//         try {
//           const searchResults = JSON.parse(data);
//           res.status(200).json(searchResults);
//         } catch (error) {
//           console.error(error);
//           res.status(500).json({ message: 'Something went wrong!' });
//         }
//       });
//     }).on('error', (error) => {
//       console.error(error);
//       res.status(500).json({ message: 'Something went wrong!' });
//     });
//   });
 
  
  module.exports = router;