// =========== DATABASE ==============
const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

mongoose.set('strictQuery',false)

mongoose.connect(url, { family: 4 })

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

module.exprts = mongoose.model("PhoneEntry", phoneEntrySchema)