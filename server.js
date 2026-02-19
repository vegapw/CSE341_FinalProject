const connectDB = require('./data/database');
const app = require('./app');

connectDB();

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Running on port: ${port} in ${process.env.NODE_ENV} mode`);
});