const lists = require('./db.json')
let listId = 4

const items = require('./db2.json')
let itemId = 6


module.exports = {

    //get Lists
    getLists: (req, res) => {
        res.status(200).send(lists)
    },

    addList: (req, res) => {
        //destructure item list
        const {name} = req.body

        let addListObject = {
            id: listId,
            name: name
        }

        lists.push(addListObject)
        listId++
        res.status(200).send(lists)
    },

    deleteList: (req, res) => {
        const index = lists.findIndex(el => el.id === +req.params.id)
       
        lists.splice(index, 1)

       res.status(200).send(lists)
    },



    ///////// list items


    getItems: (req, res) => {
        res.status(200).send(items)
    },

    addItem: (req, res) => {
        //destructure item list
        const {item, key} = req.body

        let addItemObject = {
            listId: key,
            id: itemId,
            item: `${item}`
        }

        items.push(addItemObject)
        itemId++
        res.status(200).send(items)
    },

    deleteItem: (req, res) => {
        const index = items.findIndex(el => el.id === +req.params.id)
       
        items.splice(index, 1)

       res.status(200).send(items)
    }
}