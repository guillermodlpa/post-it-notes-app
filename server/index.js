/* eslint-env node */

import express from 'express';
import partials from 'express-partials';
import bodyParser from 'body-parser'; // for POST request parameters parsing into req.body automatically
import cluster from 'cluster';
import os from 'os';

import routes from './controllers/routes';

const ip = '0.0.0.0';
const port = 8000;
const numCPUs = os.cpus().length;

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

if (cluster.isMaster) {
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (deadWorker/* , code, signal*/) => {
    // Restart the worker
    const worker = cluster.fork();

    // Note the process IDs
    const newPID = worker.process.pid;
    const oldPID = deadWorker.process.pid;

    // Log the event
    /* eslint-disable no-console */
    console.log(`Worker ${oldPID} died.`);
    console.log(`Worker ${newPID} born.`);
    /* eslint-enable no-console */
  });
} else {
  app.listen(port, ip, () => {
    // Put a friendly message on the terminal
    // eslint-disable-next-line no-console
    console.log(`${Date.now()} - Server running at http://${ip}/${port} - numCPUs=${numCPUs}`);
  });
}
