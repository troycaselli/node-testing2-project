const db = require('../../data/db-config')
const Colors = require('./colors-model')

beforeAll(async () => {
    await db.migrate.rollback()
    await db.migrate.latest()
})

beforeEach(async () => {
    await db.seed.run()
})

afterAll(async () => {
    await db.destroy()
})

test('environment is testing', () => {
    expect(process.env.NODE_ENV).toBe('testing')
})

describe('getAll', () => {
    test('resolves an array of colors', async() => {
        const colors = await Colors.getAll()
        expect(colors).toHaveLength(8)
    })
})
describe('getById', () => {
    test('resolves the desired color', async () => {
        const color1 = await Colors.getById(1)
        expect(color1).toMatchObject({color: 'red', type: 'primary'})
        const color2 = await Colors.getById(4)
        expect(color2).toMatchObject({color: 'orange', type: 'secondary'})
        const color3 = await Colors.getById(8)
        expect(color3).toMatchObject({color: 'teal', type: 'tertiary'})
    })
    test('resolves falsy if id does not exist', async () => {
        const color4 = await Colors.getById(9)
        expect(color4).toBeFalsy()
    })
})
describe('insert', () => {
    test('resolves the new color', async () => {
        const color = {color: 'black', type: null}
        const newColor = await Colors.insert(color)
        expect(newColor).toMatchObject(color)
    })
    test('adds the new color to color table', async () => {
        expect(await db('colors')).toHaveLength(8)
        const color = {color: 'black', type: null}
        await Colors.insert(color)
        expect(await db('colors')).toHaveLength(9)
    })
})
describe('update', () => {
    test('resolves the updated color', async () => {
        const id = 8
        const changes = {color: 'black', type: null}
        const updatedColor = await Colors.update(id, changes)
        expect(updatedColor).toMatchObject(changes)
    })
})
describe('remove', () => {
    test('resolves the recently deleted color', async () => {
        const id = 8
        const toBeDeleted = await Colors.getById(id)
        const deleted = await Colors.remove(id)
        expect(toBeDeleted).toEqual(deleted)
    })
    test('deletes color from table', async () => {
        expect(await db('colors')).toHaveLength(8)
        await Colors.remove(7)
        await Colors.remove(8)
        expect(await db('colors')).toHaveLength(6)
    })
})