const express = require('express');
const config = require('config');
const mongoose = require('mongoose');

const authRoutes = require('./routes/auth.routes');
const linksRoutes = require('./routes/link.routes');
const redirectRoutes = require('./routes/redirect.routes');

const app = express();
const PORT = config.get('port') || 5000;

app.use(express.json({ extended: true }));
app.use('/api/auth', authRoutes);
app.use('/api/link', linksRoutes);
app.use('/t', redirectRoutes);

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
    };
};

start();
