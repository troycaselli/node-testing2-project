const express = require('express')
const helmet = require('helmet')

const Colors = require('./colors/colors-model')

const server = express()

server.use(express.json())
server.use(helmet())

server.get('/', (req, res) => {
    res.status(200).json({message: 'up'})
})

server.get('/colors', async (req, res, next) => {
    try {
        const colors = await Colors.getAll()
        res.status(200).json(colors)
    } catch (err) {
        next(err)
    }
})

server.post('/colors', async (req, res, next) => {
    try {
        const newColor = await Colors.insert(req.body)
        res.status(200).json(newColor)
    } catch (err) {
        next(err)
    }
})

server.put('/colors/:id', async (req, res, next) => {
    try {
        const updatedColor = await Colors.update(
            req.params.id, 
            req.body
        )
        res.status(201).json(updatedColor)
    } catch (err) {
        next(err)
    }
})

server.delete('/colors/:id', async (req, res, next) => {
    try {
        const deleted = await Colors.remove(req.params.id)
        if(!deleted) {
            next({status: 404, message: `Color with id ${req.params.id} does not exist`})
        } else {
            res.status(200).json(deleted)
        }
    } catch (err) {
        next(err)
    }
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