require('isomorphic-fetch');
const express = require('express');

const routes = require('./routes');
const bodyParser = require('body-parser');

const app = express();


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.set('view engine', 'pug');
app.use(express.static('public'));

app.use(routes);

const server = app.listen(3000, function () {
  console.log('Server running at http://localhost:' + server.address().port)
})

