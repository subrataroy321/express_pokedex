var express = require('express');
var router = express.Router();
var db = require('../models');
const axios = require('axios');

// GET /pokemon - return a page with favorited Pokemon
router.get('/', (req, res) => {
  db.pokemon.findAll().then((poke) => {
    res.render('pokemons/index', {myPokes: poke, added: req.query.added});
  })
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  // TODO: Get form data and add a new record to DB
  console.log(req.body.url);
  db.pokemon.findOrCreate({
    where: {
      name: req.body.name,
      imgUrl: req.body.url
    }
  }).then(([poke,created]) => {
    res.redirect(`/pokemon?added=${poke.name}`);
  }).catch(err => {
    console.log(err);
  })
});

// GET /pokemon/show - return a page with Pokemon Details
router.get('/:name', (req,res) => {
  let pokeUrl = `http://pokeapi.co/api/v2/pokemon/${req.params.name}`;
  axios.get(pokeUrl).then(response => {
    res.render('pokemons/show', {pokeData: response.data});
  })
})

// DELETE /pokemon - get the name of a pokemon and delete it from the database
router.delete('/:pokeName', (req, res) => {
  console.log(req)
  db.pokemon.destroy({
    where: { name: req.params.pokeName }
  }).then((response) => {
    // do something when done deleting
    res.redirect(`/pokemon`);
  });
})

module.exports = router;
