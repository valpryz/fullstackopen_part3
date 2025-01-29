const express = require("express")
const app = express()
const morgan = require("morgan")
const cors = require('cors')

app.use(express.json())

morgan.token("output",(request, response) => JSON.stringify(request.body))
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :output"))

app.use(cors())
app.use(express.static('dist'))

let phoneNumbers = [
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

app.get('/info', (request, response) => {
    response.send(`<div>Phonebook has info for ${phoneNumbers.length} people</div><br/><div>${Date(request.params.Date)}</div>`)
})

app.get("/api/persons",(request,response) => {
    response.json(phoneNumbers)
})

app.get("/api/persons/:id", (request, response) => {
    const id = request.params.id
    const phoneNumber = phoneNumbers.find(person => id === person.id)

    if(phoneNumber) {
        response.json(phoneNumber)
    }else {
        response.status(404).end()
    }
})

app.delete("/api/persons/:id", (request, response) => {
    const id = request.params.id
    phoneNumbers = phoneNumbers.filter(number => number.id !== id)

    response.status(204).end()
})

app.post("/api/persons", (request, response) => {
    const body = request.body
    body.id = String(Math.ceil(Math.random() * 10000))

    if(!body.name || !body.number){
        return response.status(400).json({
            error: "Content missing !"
        })
    }else if(phoneNumbers.some(number => number.name.toLowerCase() === body.name.toLowerCase())){
        return response.status(400).json({
            error: "Name must be unique !"
        })
    }else {
        phoneNumbers = phoneNumbers.concat(body)
        response.json(body)
    }
})


const PORT = process.env.PORT || 3001 
app.listen(PORT, () => {
    console.log(`server running at port ${PORT}`)
})