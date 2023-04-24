// middleware.js

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');

module.exports = (app) => {
  // Helmet middleware adds various HTTP headers to make the app more secure
  app.use(helmet());

  // CORS middleware allows cross-origin requests
  app.use(cors());

  // Morgan middleware logs HTTP requests
  app.use(morgan('dev'));

  // Body parser middleware parses incoming request bodies
  app.use(express.json());

  // Error handling middleware
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });
};