const express = require('express');
const config = require('config');
const mongoose = require('mongoose');

const app = express();

const PORT = config.get('port');

app.use(express.json());

app.use('/api/auth', require('./routes/auth.routes'));

async function start() {
  try {
    await mongoose.connect(config.get('mongoUri'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log('DB Connected!');
  } catch (error) {
    console.log('Server error', error.message);
    process.exit(1);
  }
}

start();

app.listen(PORT, () => console.log(`App has been started on port ${PORT}!`));
