const db = require('../../data/db-config')

function getAll() {
    return db('colors')
}

function getById(color_id) {
    return db('colors')
        .where({color_id})
        .first()
}

async function insert(color) {
    const newId = await db('colors')
        .insert(color)
    return getById(newId)
}

async function update(color_id, changes) {
    await db('colors')
        .update(changes)
        .where({color_id})
    return getById(color_id)
}

async function remove(color_id) {
    const toBeDeleted = await getById(color_id)
    await db('colors')
        .where({color_id})
        .del()
    return toBeDeleted
}

module.exports = {
    getAll,
    getById,
    insert,
    update,
    remove
}