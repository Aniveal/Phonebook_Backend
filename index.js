
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

app.get("/api/persons/:id", (req, res) => {
    PhoneEntry.findById(req.params.id).then(
      note =>
        res.json(note))

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

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})