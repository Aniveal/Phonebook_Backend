
const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.static('dist'))

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get("/api/persons", (req, res) =>{
    res.json(persons)
})

app.get("/info", (req, res) => {
    res.send("<p>The page has " + persons.length + " people in it.</p>" 
      + "<p>" + new Date() + "</p>")
})

app.get("/api/persons/:id", (req, res) => {
    const person = persons.find(person => person.id === req.params.id)
    if(!person)
    {
      res.status(404).end()
    }
    else
    {
      res.json(person)
    }
})

app.post("/api/persons", (req, res) => {

    let newId = Math.floor(Math.random() * 10000)
    let handbrake = 0
    while(persons.find(person => person.id === newId))
    {
      newId = Math.floor(Math.random() * 10000)
      handbrake++
      if(handbrake > 1000)
      {
        res.status(500).end()
        return
      }
    }

    if(!req.body.name || !req.body.number)
    {
      res.status(400).send("Error: Must provide name and number.").end()
      return
    }

    if(persons.find(person => person.name === req.body.name))
    {
      res.status(400).send("Error: the person is allready in the phonebook. Names must be unique.").end()
      return
    }


    const newPerson = {
      id:String(newId),
      name:req.body.name,
      number:req.body.number
    }

    persons = persons.concat(newPerson)
      
    res.status(200).json(newPerson).end()
})

app.delete("/api/persons/:id", (req, res) => {
  const person = persons.find(person => person.id === req.params.id)
  if(!person)
  {
    res.status(404).end()
  }
  else
  {
    persons = persons.filter(p => p.id !== person.id)
    res.status(200).end()
  }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})