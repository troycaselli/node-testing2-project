const express = require('express')
const helmet = require('helmet')

const server = express()

server.use(express.json())
server.use(helmet())

server.get('/', (req, res) => {
    res.status(200).json({message: 'up'})
})

server.get('/colors', (req, res, next) => {
    res.json('get')
})

server.post('/colors', (req, res, next) => {
    res.json('post')
})

server.put('/colors/:id', (req, res, next) => {
    res.json('put')
})

server.delete('/colors/:id', (req, res, next) => {
    res.json('delete')
})

server.get('*', (req, res) => {
    res.status(404).json({message: `endpoint ${req.path} not found`})
})

server.use((error, req, res, next) => { // eslint-disable-line
    res.status(error.status || 500).json({
        message: error.message,
        stack: error.stack
    })
})

module.exports = server;