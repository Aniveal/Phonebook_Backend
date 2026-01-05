const mongoose = require('mongoose')


const args = process.argv

if(args.length < 6) {
    console.log('Please provide the password as an argument: node mongo.js <username> <password> <name> <number>')
    process.exit(1)
}

const username = args[2]
const password = args[3]
const name = args[4]
const number = args[5]

const url = process.env.MONGODB_URI

mongoose.set('strictQuery',false)

mongoose.connect(url, { family: 4 })

const phoneEntrySchema = new mongoose.Schema({
  name: String,
  number: String,
})

const PhoneEntry = mongoose.model("PhoneEntry", phoneEntrySchema)

const test2 = new PhoneEntry({
    name: name,
    number: number
})

test2.save().then(result => {
  console.log('saved!')
  mongoose.connection.close()
})


