const baseUrl = 'http://localhost:4875'

//lists
const showLists = document.querySelector('#listDisplay')
const addListBtn = document.querySelector('#addListBtn')

//items
let addItemBtn = ''



//loop over lists array
const displayLists = (arr) => {
    for(let i =0; i < arr.length; i++){
        createListCard(arr[i])
    }
}

// //loop over items array
const displayItems = (itemArr) => {
    for(let i = 0; i<itemArr.length; i++){
        createItemCard(itemArr[i])
    }
}

// to create each list card and append to html
const createListCard = (list) => {
    const listCard = document.createElement('section')
    listCard.classList.add('list-card')

    listCard.innerHTML = `
    <section id="list-name">
    <p>${list.name} <button onclick="deleteList(${list.id})">x</button></p>
      </section>
     <section id="itemDisplay${list.id}"></section>

     <section id="add-item">
            <input type="text" id="itemInput${list.id}" placeholder="Add a new to-do"/>
            <button id="addItemBtn" onclick="addItem(${list.id})">+</button>
    </section>  
    `
    
    showLists.appendChild(listCard)
    addItemBtn = document.querySelector('#addItemBtn')

    
}

// // // to create an item card and append to inner html inside createListCard
const createItemCard = (item) => {
    const itemCard = document.createElement('section')
    itemCard.classList.add('item-card')

    itemCard.innerHTML = `
    <section id="itemRow">
    
    <label for=${item.id}>
    <input onclick="updateStatus(this)" type=checkbox id="${item.id}">
    <p>${item.item}</p>
    </label>
    <button onclick="deleteItem(${item.id})">X</button>
    
    
    </section>


    
    `
    let showItems = document.querySelector(`#itemDisplay${item.listId}`)
    
    showItems.appendChild(itemCard)
}

function updateStatus(selectedTask){
    //getting paragragh that contains item
    let itemName = selectedTask.parentElement.lastElementChild
    if(selectedTask.checked) {
        itemName.classList.add("checked");
    }else {
        itemName.classList.remove("checked")
    }
}

//axios request to get lists array
const getAllLists = () => {
    axios.get(`${baseUrl}/getLists`)
    .then((res) => {
        displayLists(res.data)
        console.log(res.data)
    })
    .catch((err) => {
        console.log(err)
    })
}

// //axios request to get items array
const getAllItems = () => {
    axios.get(`${baseUrl}/getItems`)
    .then((res) => {
        //filter get items from list id
        //higher order array methods to filter two tables
        res.data.filter(item => {
            return item.listId === 1
        })
        displayItems(res.data)
        console.log(res.data)
    })
    .catch((err) => {
        console.log(err)
    })
}

//delete list
const deleteList = (id) => {
    axios.delete(`${baseUrl}/deleteList/${id}`)
    .then((res) => {
        showLists.innerHTML = ''
        displayLists(res.data)
    })
}

// //delete item
const deleteItem = (id) => {
    axios.delete(`${baseUrl}/deleteItem/${id}`)
    .then((res) => {
        showLists.innerHTML = ''

        getAllLists()
        getAllItems()

        //displayItems(res.data)
    })
}

//add a new List
const addList = () => {
    let nameInput = document.querySelector('#nameInput')

    let newList = {
        name: nameInput.value
    }

    axios.post(`${baseUrl}/addList`, newList)
    .then((res) => {
        showLists.innerHTML = ''
        nameInput.value = ''

        displayLists(res.data)
    })
}

//add new item

const addItem = (listId) => {
    let itemInput = document.querySelector(`#itemInput${listId}`)
    

    let newItem = {
        key: listId,
        item: itemInput.value
    }

    axios.post(`${baseUrl}/addItem`, newItem)
    .then((res) => {

        showLists.innerHTML = ''
        itemInput.value = ''

        getAllLists()
        getAllItems()

        //displayItems(res.data)
    })

    
}



addListBtn.addEventListener('click', addList)
//addItemBtn.addEventListener('click', addItem)

getAllLists()
getAllItems()
//addItemBtn.addEventListener('click', addItem)