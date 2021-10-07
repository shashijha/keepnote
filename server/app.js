const express = require('express');

function requireHTTPS(req, res, next) {
  // The 'x-forwarded-proto' check is for Heroku
  if (!req.secure && req.get('x-forwarded-proto') !== 'https') {
      return res.redirect('https://' + req.get('host') + req.url);
  }
  next();
}

function generateApp(inputApp) {
  const app = inputApp || express();

  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers",
    	"Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');    
    next();
  });

  app.use(requireHTTPS);
  app.use(express.static('./dist/keepnote'));
  app.get('/*', function(req, res) {
    res.sendFile('index.html', {root: './dist/keepnote/'}
  );
  });
  // app.use(require('./api'));

  return app;
}

module.exports = generateApp;





