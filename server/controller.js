const lists = require('./db.json')
let listId = 3


module.exports = {

    //get items
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
    }
}