const express = require('express'),
    bodyParser = require('body-parser');
const people = express.Router()

var uuid = require('uuid-v4'); //crea id univoci

const arrayPeople = [] //array di oggetti

//presentazione
people.route('/')
  .get((req, res) => {
    res.status(200)
    res.json({message: 'Welcome to the API'})
  });

people.route('/people')
  //get di tutto l'array
    .get((req, res) => {
    res.status(200)
    res.json(arrayPeople)
  })

.post((req, res) => {
    var people = {}
    people.id = uuid()
    if (req.body.nome) people.nome = req.body.nome
    if (req.body.cognome) people.cognome = req.body.cognome
    arrayPeople.push(people)
    res.status(200)
    res.json(people)
  });

module.exports = people
