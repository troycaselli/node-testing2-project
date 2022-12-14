const db = require('../data/db-config')

const request = require('supertest')
const server = require('./server')

beforeAll(async () => {
    await db.migrate.rollback()
    await db.migrate.latest()
})

beforeEach(async () => {
    await db.seed.run()
})

describe('[GET] /colors', () => {
    test('returns a 200 OK status code', async () => {
        const res = await request(server).get('/colors')
        expect(res.status).toEqual(200)
    })
    test('returns a JSON object', async () => {
        const res = await request(server).get('/colors')
        expect(res.type).toEqual('application/json')
    })
    test('responds with all the colors', async () => {
        const res = await request(server).get('/colors')
        expect(res.body).toHaveLength(8)
    })
})
describe('[POST] /colors/:id', () => {
    test('returns a 200 OK status code', async () => {
        const color = {color: 'spacegrey', type: null}
        const res = await request(server).post('/colors').send(color)
        expect(res.status).toEqual(200)
    })
    test('returns a JSON object', async () => {
        const color = {color: 'spacegrey', type: null}
        const res = await request(server).post('/colors').send(color)
        expect(res.type).toEqual('application/json')
    })
    test('responds with new color', async () => {
        const color = {color: 'spacegrey', type: null}
        const res = await request(server).post('/colors').send(color)
        expect(res.body).toMatchObject(color)
    })
})
describe('[PUT] /colors/:id', () => {
    test('returns a 201 OK status code', async () => {
        const id = 8
        const update = {color: 'spacegrey', type: null}
        const res = await request(server).put(`/colors/${id}`).send(update)
        expect(res.status).toEqual(201)
    })
    test('returns a JSON object', async () => {
        const id = 8
        const update = {color: 'spacegrey', type: null}
        const res = await request(server).put(`/colors/${id}`).send(update)
        expect(res.type).toEqual('application/json')
    })
    test('responds with updated color', async () => {
        const id = 8
        const update = {color: 'spacegrey', type: null}
        const res = await request(server).put(`/colors/${id}`).send(update)
        expect(res.body).toMatchObject(update)
    })
})
describe('[DELETE] /colors/:id', () => {
    test('returns a 200 OK status code', async () => {
        const id = 8
        const res = await request(server).delete(`/colors/${id}`)
        expect(res.status).toEqual(200)
    })
    test('returns a JSON object', async () => {
        const id = 8
        const res = await request(server).delete(`/colors/${id}`)
        expect(res.type).toEqual('application/json')
    })
    test('responds with deleted color', async () => {
        const id = 1
        const res = await request(server).delete(`/colors/${id}`)
        expect(res.body).toMatchObject({color: 'red', type: 'primary'})
    })
})
