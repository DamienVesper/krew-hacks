require(`dotenv`).config();
const path = require(`path`);

const express = require(`express`);
const app = express();

const http = require(`http`);
const server = http.createServer(app);

// Set view engine.
app.set(`views`, path.resolve(__dirname, `views`));
app.set(`view engine`, `ejs`);

// Serve the static directory.
app.use(express.static(config.staticDir));

app.get(`/`, (req, res) => res.render(`index.ejs`));

module.exports = {
    app,
    server
};
