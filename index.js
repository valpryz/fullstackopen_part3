const express = require("express")
const app = express()

const phoneNumbers = [
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

const PORT = 3001 
app.listen(PORT, () => {
    console.log(`server running at port ${PORT}`)
})