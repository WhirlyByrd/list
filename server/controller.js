const items = require('./db.json')
let itemId = 2


module.exports = {

    //get items
    getItems: (req, res) => {
        res.status(200).send(items)
    },

    addItem: (req, res) => {
        //destructure item list
        const {item} = req.body

        let addItemObject = {
            id: itemId,
            item: item
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