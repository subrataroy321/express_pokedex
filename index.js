require('dotenv').config();
const express = require('express');
const axios = require('axios'); 
const ejsLayouts = require('express-ejs-layouts');
const app = express();
var methodOverride = require('method-override');
const port = process.env.PORT || 3000;

app.use(require('morgan')('dev'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(ejsLayouts);
app.use(express.static('public'));
app.use(methodOverride('_method'));


// GET - main index of site
app.get('/', function(req, res) {
  let offset = req.query.offset;
  if(!offset) {
    offset = '0';
  } else if (parseInt(offset) < '0') {
    offset = '0';
  }
  let pokemonUrl = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=20`;
  // Use request to call the API
  axios.get(pokemonUrl).then(response => {
    let pokemon = response.data.results;
    // console.log(pokemon[0].url);
    res.render('index', { pokemon: pokemon.slice(0, 151), offset: offset });
  });
});

// Imports all routes from the pokemon routes file
app.use('/pokemon', require('./routes/pokemon'));

const server = app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});

module.exports = server;
