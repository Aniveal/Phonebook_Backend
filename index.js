
const express = require('express')
const app = express()
const cors = require('cors')

require('dotenv').config()

app.use(cors())
app.use(express.json())
app.use(express.static('dist'))



const PhoneEntry = require('./databaseConnection')

console.log(PhoneEntry)


// =========== API ==============

app.get("/api/persons", (req, res) =>{
    console.log("GET /api/persons")
    PhoneEntry.find({}).then(persons => {
      res.json(persons)
    })
})

app.get("/info", (req, res) => {
    res.send("<p>The page has " + PhoneEntry.find({}).length + " people in it.</p>" 
      + "<p>" + new Date() + "</p>")
})

app.get("/api/persons/:id", (req, res, next) => {
    PhoneEntry.findById(req.params.id).then(
      note =>
        res.json(note))
      .catch(
        error => next(error)
      )

})

app.put("/api/persons:id", (req, res) => {

  console.log("put request: " + req.params.id + ", " + req.params.id)
  PhoneEntry.findById(req.params.id).then( entry =>
  {
    console.log("put request: " + req.params.id)
    entry.name = req.params.name
    entry.save().then(res.status(200).json(entry).end())
  })
  .catch(error => next(error))

})

app.post("/api/persons", (req, res) => {

    newEntry = new PhoneEntry({
      name: req.body.name,
      number: req.body.number
    })

    newEntry.save().then(res.status(200).json(newEntry).end())
    
})

app.delete("/api/persons/:id", (req, res) => {
  PhoneEntry.deleteOne({id: req.params._id}).then(response =>
  {
    console.log(response)
    if(response.deletedCount === 0)
    {
      res.status(404).end()
    }
    else
    {
      res.status(200).end()
    }
  })
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if
    (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

// this has to be the last loaded middleware, also all the routes should be registered before this!
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})