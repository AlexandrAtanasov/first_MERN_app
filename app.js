const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const routes = require('./routes/auth.routes')

const app = express();
const PORT = config.get('port') || 5000;

app.use(express.json({ extended: true }));
app.use('/api/auth', routes);


async function start() {
    try {
      await mongoose.connect(config.get('mongoURI'), {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
      });
      app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`));
    } catch (e) {
        console.log('Server error, - ', e.message);
        // if has an error - turn off the node server
        process.exit(1);
    }
};

start();
