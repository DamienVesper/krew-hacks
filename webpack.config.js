require(`dotenv`).config();
const path = require(`path`);

module.exports = {
    client: {
        mode: `development`,
        entry: [`./dist/build/dist.js`],
        output: {
            path: path.resolve(__dirname, `dist/build`),
            filename: `dist.min.js`
        }
    }
};
