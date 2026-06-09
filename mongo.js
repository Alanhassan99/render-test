require('dotenv').config()
const mongoose = require('mongoose')
const Person = require('./models/person')
mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

console.log('connecting to', url)
mongoose.connect(url, { family: 4 })
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch(error => {
        console.log('error connecting to MongoDB:', error.message)
    })

const personName = process.argv[3]
const personNumber = process.argv[4]
const person = new Person({
    name: personName,
    number: personNumber
})



process.argv.length === 5 ? person.save({}).then(() => mongoose.connection.close()) : process.argv.length === 3 ? Person.find({}).then(result => {
    result.forEach(person => {
        console.log(person)
    })
    mongoose.connection.close()
}) : console.log("What's up")