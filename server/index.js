const express = require('express')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())

//destructure functions from controller.js
const {
    getLists,
    addList,
    deleteList,
    getItems,
    addItem,
    deleteItem
} = require('./controller')

//add endpoints
app.get('/getLists', getLists)
app.post('/addList', addList)
app.delete('/deleteList/:id', deleteList)

app.get('/getItems', getItems)
app.post('/addItem', addItem)
app.delete('/deleteItem/:id', deleteItem)

app.listen(4875, () => console.log('Listening on port 4875'))