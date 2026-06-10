const mongoose = require('mongoose')
const Person = require('./models/person')
mongoose.set('strictQuery', false)

const password = process.argv[2]
const url = `mongodb+srv://alanhassan99_db_user:${password}@cluster0.glpkyhe.mongodb.net/phoneBookApp?appName=Cluster0`

console.log('connecting to', url)
mongoose.connect(url)
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch(err => {
        console.log('MongoDB error:', err.message)
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