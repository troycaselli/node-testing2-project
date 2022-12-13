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

function update(id, changes) {

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