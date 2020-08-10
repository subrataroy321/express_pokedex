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
app.get('/', (req, res) => {
  let offset = req.query.offset;
  if(!offset) {
    offset = '0';
  } else if (parseInt(offset) < '0') {
    offset = '0';
  }
  let pokemonUrl = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=20`;
  
  axios.all([
    axios.get(pokemonUrl),
    // axios calls to get the images from API.
    axios.get(`https://pokeapi.co/api/v2/pokemon/${(parseInt(offset)+1).toString()}`),
    axios.get(`https://pokeapi.co/api/v2/pokemon/${(parseInt(offset)+2).toString()}`),
    axios.get(`https://pokeapi.co/api/v2/pokemon/${(parseInt(offset)+3).toString()}`),
    axios.get(`https://pokeapi.co/api/v2/pokemon/${(parseInt(offset)+4).toString()}`),
    axios.get(`https://pokeapi.co/api/v2/pokemon/${(parseInt(offset)+5).toString()}`),
    axios.get(`https://pokeapi.co/api/v2/pokemon/${(parseInt(offset)+6).toString()}`),
    axios.get(`https://pokeapi.co/api/v2/pokemon/${(parseInt(offset)+7).toString()}`),
    axios.get(`https://pokeapi.co/api/v2/pokemon/${(parseInt(offset)+8).toString()}`),
    axios.get(`https://pokeapi.co/api/v2/pokemon/${(parseInt(offset)+9).toString()}`),
    axios.get(`https://pokeapi.co/api/v2/pokemon/${(parseInt(offset)+10).toString()}`),
    axios.get(`https://pokeapi.co/api/v2/pokemon/${(parseInt(offset)+11).toString()}`),
    axios.get(`https://pokeapi.co/api/v2/pokemon/${(parseInt(offset)+12).toString()}`),
    axios.get(`https://pokeapi.co/api/v2/pokemon/${(parseInt(offset)+13).toString()}`),
    axios.get(`https://pokeapi.co/api/v2/pokemon/${(parseInt(offset)+14).toString()}`),
    axios.get(`https://pokeapi.co/api/v2/pokemon/${(parseInt(offset)+15).toString()}`),
    axios.get(`https://pokeapi.co/api/v2/pokemon/${(parseInt(offset)+16).toString()}`),
    axios.get(`https://pokeapi.co/api/v2/pokemon/${(parseInt(offset)+17).toString()}`),
    axios.get(`https://pokeapi.co/api/v2/pokemon/${(parseInt(offset)+18).toString()}`),
    axios.get(`https://pokeapi.co/api/v2/pokemon/${(parseInt(offset)+19).toString()}`),
    axios.get(`https://pokeapi.co/api/v2/pokemon/${(parseInt(offset)+20).toString()}`)
  ])
  .then(axios.spread((res_1, res_2, res_3, res_4, res_5, res_6, res_7, res_8, res_9, res_10, res_11, res_12, res_13, res_14, res_15, res_16, res_17, res_18, res_19, res_20, res_21) => {
    // array of responses from all axios calls
    var resArray = [ res_2.data, res_3.data, res_4.data, res_5.data, res_6.data, res_7.data, res_8.data, res_9.data, res_10.data, res_11.data, res_12.data, res_13.data, res_14.data, res_15.data, res_16.data, res_17.data, res_18.data, res_19.data, res_20.data, res_21.data]
    
    res.render('index', { pokemonArray: resArray, offset: offset  });
  }))
  
});

// Imports all routes from the pokemon routes file
app.use('/pokemon', require('./routes/pokemon'));

const server = app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});

module.exports = server;
