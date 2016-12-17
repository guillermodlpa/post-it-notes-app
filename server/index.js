/* eslint-env node */

import express from 'express';
import partials from 'express-partials';
import bodyParser from 'body-parser'; // for POST request parameters parsing into req.body automatically

import routes from './controllers/routes';

const ip = '0.0.0.0';
const port = 8000;

const app = express();

app.set('view engine', 'ejs');
app.use(partials());

// Returns middleware that only parses urlencoded bodies
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json request parameters. BackboneJS sends params in json format by default
app.use(bodyParser.json());

// all routes are in controllers/routes.js
routes(app);

// set public directory for assets like css and js files
app.use(express.static('app/build'));

// explicitly indicate views directory, as it was failing otherwise
app.set('views', `${__dirname}/views`);

// @TODO, make this better using different threads
// Listen on port 8000, IP defaults to 127.0.0.1
app.listen(port, ip, () => {
  /* eslint-disable no-console */
  // Put a friendly message on the terminal
  console.log(`${Date.now()} - Server running at http://${ip}/${port}`);
  /* eslint-enable no-console */
});
