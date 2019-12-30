const express = require('express');
const app = express();
const port = 3000;
const database = require('./conf');

app.get('/', (request, response) => {
  response.send('Bienvenue sur Express');
});

app.get('/api/rabbits', (req, res) => {
  database.query('SELECT * from rabbit', (err, results) => {
    if (err) {
      res.status(500).send('Erreur lors de la récupération des rabbits');
    } else {
      res.json(results);
    }
  });
});

app.get('/api/rabbits/:name', (req, res) => {
  const rabbitName = req.params.name;

  database.query('SELECT * FROM rabbit WHERE name=?', [rabbitName], (err, results) => {
    if(err) {
      res.status(500).send('Erreur lors de la recherche par name');
    }else{
      res.json(results[0]);
    }
  });
});




app.listen(port, (err) => {
  if (err) {
    throw new Error('Something bad happened...');
  }

  console.log(`Server is listening on ${port}`);
});