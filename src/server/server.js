require(`dotenv`).config();
const path = require(`path`);

const config = require(`./config.js`);
const log = require(`./utils/log.js`);

const express = require(`express`);
const app = express();

const http = require(`http`);
const server = http.createServer(app);

// Set view engine.
app.set(`views`, path.resolve(__dirname, `views`));
app.set(`view engine`, `ejs`);

// Serve the static directory.
app.use(express.static(path.resolve(__dirname, `../../dist`)));

app.get(`/`, (req, res) => res.render(`index.ejs`));

server.listen(config.port);
log(`green`, `Webfront bound to port ${config.port}`);

module.exports = {
    app,
    server
};
