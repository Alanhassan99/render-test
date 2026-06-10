require('dotenv').config()
const Person = require('./models/person')
const express = require('express')
const app = express()
app.use(express.static('dist'))

app.use(express.json())
const morgan = require('morgan')

morgan.token('helu', function (req, res) {
    return JSON.stringify(req.body)
})

app.use(morgan(function (tokens, req, res) {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms', tokens.helu(req, res)
    ].join(' ')
}))



app.get('/info', (request, response) => {
    response.send(`
        <p>Phonebook has info for ${phonebook.length} people</p>
        <p>${new Date()}</p>
        `)
})

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => response.json(persons))
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = phonebook.find(person => person.id === id)
    if (person) {
        response.json(person)
    } else {
        return response.status(404).send('Person not found').end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    phonebook = phonebook.filter(person => person.id !== id)

    response.status(204).end()

})


app.post('/api/persons', (request, response) => {
    const body = request.body
    const person = new Person({
        name: body.name,
        number: body.number
    })
    person.save().then(saved => response.json(saved))
})
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
