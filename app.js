// express server on port 5000
const express = require('express');
const app = express();
const PORT = 5000;

app
  .use(express.static(__dirname + '/dist'))
  .set('pages', __dirname + '/src/pages')
  .set('view engine', 'html')
  .listen(PORT, () => console.log(`Listening on ${PORT}`));