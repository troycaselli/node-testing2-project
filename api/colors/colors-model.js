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

function remove(id) {

}

module.exports = {
    getAll,
    getById,
    insert,
    update,
    remove
}