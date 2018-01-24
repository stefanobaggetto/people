const fetch = require('node-fetch')
const root = 'http://localhost:8080/api/people'
var personExample = {
                        	"nome": "Mario",
                        	"cognome": "1"
                        }
const postPerson = function(person){
  return fetch(root, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(person)
  })
}

const putPerson = function(id){
  var url = root + '/' + id
  return fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({ nome: "Giacomo" })
  })
}

const getPeople = function(){
  return fetch(root, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  })
}

const getOnePerson = function(id){
  return fetch(root+'/'+id, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  })
}

const deletePerson = function(id){
  return fetch(root+'/'+id, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  })
}

//testo sia la post che la get one
test('test post new person and get it back', () => {
  return postPerson(personExample)
    .then(postResponse => { return postResponse.json() })
    .then(postResponseJson => {
        personExample.nome = postResponseJson.nome
        personExample.id = postResponseJson.id //vado a salvare localmente l'id sul mio esempio
        return getOnePerson(personExample.id)
    })
    .then(getResponse => {return getResponse.json()})
    .then(jsonResponse => {expect(jsonResponse.nome).toEqual(personExample.nome)})
    //.catch(e => {console.log(e)})
})
test('test put function', () =>{
    return putPerson(personExample.id)
    .then(putResponse => { return putResponse.json() })
    .then(putResponseJson => {
        expect(putResponseJson.nome).toEqual('Giacomo') //mi aspetto che sia uguale a quello che ho cambiato
    })
})
test('test delete function', () =>{
    return deletePerson(personExample.id)
    .then(deleteResponse => { return deleteResponse.json() })
    .then(deleteResponseJson => {
        expect(deleteResponseJson.message).toEqual('deleted')
    })
})