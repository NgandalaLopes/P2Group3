const express = require("express");
const router = express.Router();
const AnimeSearchModel = require("../models/animeSearchModel.js");
const AnimeSearchView = require("../views/animeSearchView.js");
const AnimeSearchController = require("../controllers/animeSearchController.js");

// Create instances of the model, view, and controller
const model = new AnimeSearchModel();
const view = new AnimeSearchView();
const controller = new AnimeSearchController(model, view);

// Set up the search route
router.get("/", (req, res) => {
  const query = req.query.q;
  model.searchAnime(query).then(() => {
    const animeList = model.animeList;
    const animeListHtml = view.renderAnimeList(animeList);
    res.send(animeListHtml);
  });
});

module.exports = router;