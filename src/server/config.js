require(`dotenv`).config();
const path = require(`path`);

const config = {
    mode: process.env.NODE_ENV,
    port: process.env.NODE_ENV === `dev` ? 8080 : 8888,
    staticDir: path.resolve(__dirname, `../../../dist/`)
};

module.exports = config;
