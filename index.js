const express = require('express');
const app = express();
const port = 3000;
const database = require('./conf');

app.get('/', (request, response) => {
  response.send('Bienvenue sur Express');
});

//récupère l'intégralité de l'API
app.get('/api/rabbits', (req, res) => {
  database.query('SELECT * from rabbit', (err, results) => {
    if (err) {
      res.status(500).send('Erreur lors de la récupération des rabbits');
    } else {
      res.json(results);
    }
  });
});

//récupère les données en fonction du nom inscrit dans l'URL
app.get('/api/rabbits/:name', (req, res) => {
  const rabbitName = req.params.name;

  database.query('SELECT * FROM rabbit WHERE name=?', [rabbitName], (err, results) => {
    if(err) {
      res.status(500).send('Erreur lors de la recherche par name');
    }else{
      res.json(results);
    }
  });
});

//récupère plusieurs champs de la table 
app.get('/api/rabbits2/', (req, res) => {


  database.query('SELECT name, birthdate, comments FROM rabbit ORDER BY name ASC', (err, results) => {
    if(err) {
      res.status(500).send('Erreur lors de la recherche par champs');
    }else{
      res.json(results);
    }
  });
});

//récupère les données en filtrant par ordre alphabétique
app.get('/api/allRabbits', (req, res) => {


  database.query('SELECT name FROM rabbit ORDER BY name ASC', (err, results) => {
    if(err) {
      res.status(500).send('Erreur lors de la recherche par ordre alphabétique');
    }else{
      res.json(results);
    }
  });
});

//récupère les données qui commence par...
app.get('/api/C', (req, res) => {
  
  database.query('SELECT name FROM rabbit WHERE name LIKE "C%"', (err, results) => {
    if(err) {
      res.status(500).send('Erreur lors de la recherche commence par');
    }else{
      res.json(results);
    }
  });
});

//récupère les données dont la date est > à
app.get('/api/date', (req, res) => {
  
  database.query('SELECT * FROM rabbit WHERE birthdate >"2008-01-01"', (err, results) => {
    if(err) {
      res.status(500).send('Erreur lors de la recherche par date >');
    }else{
      res.json(results);
    }
  });
});



app.listen(port, (err) => {
  if (err) {
    throw new Error('Something bad happened...');
  }

  console.log(`Server is listening on ${port}`);
});