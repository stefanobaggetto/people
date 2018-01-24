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

people.route('/people/:id')
.put((req, res) => {
    var id = req.params.id
    const i = arrayPeople.findIndex(item => {return item.id === id})
    if (i==-1) res.sendStatus(404) //elemento non trovato
    else {
        if (req.body.nome) arrayPeople[i].nome = req.body.nome
        if (req.body.cognome) arrayPeople[i].cognome = req.body.cognome
        res.status(200)
        res.json(arrayPeople[i])
    }
  })
.delete((req, res) => {
    var id = req.params.id
    const i = arrayPeople.findIndex(item => {return item.id === id})
    if (i==-1) res.sendStatus(404) //elemento non trovato
    else {
        arrayPeople.splice(i,1) //elimina l'elemento
        res.status(200)
        res.json({message: 'deleted'})
        /*res.json(cancellato})*/
    }
  })
//get one
  .get((req, res) => {
    var id = req.params.id
    const i = arrayPeople.findIndex(item => {return item.id === id})
    if (i==-1) res.sendStatus(404)
    else{
      res.status(200)
      res.json(arrayPeople[i])
    }
  });

module.exports = people
