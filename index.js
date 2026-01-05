
const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.static('dist'))

const phoneEntry = require('./databaseConnection')


// =========== API ==============

app.get("/api/persons", (req, res) =>{
    phoneEntry.find({}).then(persons => {
      res.json(persons)
    })
})

app.get("/info", (req, res) => {
    res.send("<p>The page has " + phoneEntry.find({}).length + " people in it.</p>" 
      + "<p>" + new Date() + "</p>")
})

app.get("/api/persons/:id", (req, res) => {
    const entry = phoneEntry.findById(req.params.id).then(note =>res.json(note))

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

    newEntry = new phoneEntry({
      id: String(newId),
      name: req.body.name,
      number: req.body.number
    })


    newEntry.save().then(res.status(200).json(newPerson).end())
    
})

app.delete("/api/persons/:id", (req, res) => {
  const person = phoneEntry.findById(req.params.id).then()
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