const baseUrl = 'http://localhost:4875'


const showLists = document.querySelector('#listDisplay')
const addListBtn = document.querySelector('#add-list')


//loop over array
const displayLists = (arr) => {
    for(let i =0; i < arr.length; i++){
        createListCard(arr[i])
    }
}

// to create each list card and append to html
const createListCard = (list) => {
    const listCard = document.createElement('section')
    listCard.classList.add('list-card')

    listCard.innerHTML = `
    <section>
    <p>${list.name} <button onclick="deleteList(${list.id})">X</button></p>
      </section>
     <section id="inner-list"></section>
    `
    showLists.appendChild(listCard)
}

//axios request to get items array
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

//delete list
const deleteList = (id) => {
    axios.delete(`${baseUrl}/deleteList/${id}`)
    .then((res) => {
        showLists.innerHTML = ''
        displayLists(res.data)
    })
}

//add a new List
// works but extra delete button is added
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



//create list item card


addListBtn.addEventListener('click', addList)
getAllLists()
