const express = require('express')
const axios = require('axios')
const cors = require('cors')
const app = express()
app.use(cors())

console.log('Starting server...')
app.get('/', async (req, res) => {

    const usersJson = await getJsonDataFrom('https://jsonplaceholder.typicode.com/users')
    const usersList = await getUsersList(usersJson)
    return res.json(usersList)
})
const PORT = 3001
app.listen(PORT)
console.log(`Server running on: http://localhost:${PORT}/`)



async function getJsonDataFrom(url) {
    try {
        const { data } = await axios(url)
        return data
    } catch (error) {
        console.error(error)
    }
}

async function getUsersList(usersJson) {
    try {
        const users = []
        for (const user of usersJson) {
            users.push({ player: user.username })
        }
        return users
    } catch (error) {
        console.error(error)
    }
}