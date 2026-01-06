// =========== DATABASE ==============
const mongoose = require('mongoose')


const url = process.env.MONGODB_URL
const password = encodeURIComponent(String(process.env.PASSWORD))
const username = process.env.MONGODB_USER

const finalURI = "mongodb+srv://"+username+":"+ password +"@" + url

console.log("url: " + finalURI)

mongoose.set('strictQuery',false)

mongoose.connect(finalURI, { family: 4 })

const phoneEntrySchema = new mongoose.Schema({
  name: String,
  number: String,
})

phoneEntrySchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model("PhoneEntry", phoneEntrySchema)