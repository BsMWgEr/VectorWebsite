function handleFormSubmit(event){
    event.preventDefault()
    const my_Form = event.target
    const my_FormData = new FormData(my_Form)
    const url = my_Form.getAttribute("action")
    const method = my_Form.getAttribute("method")
    const xhr = new XMLHttpRequest()
    xhr.open(method, url)
    xhr.onload = function() {
        const serverResponse = xhr.response
        loadElement(event)

    }
    my_FormData.entries()
    xhr.send(my_FormData)

}

function loadElement(event) {
    let item
    let object
    event.preventDefault()
    let my_form = event.target
    const new_form = new FormData(my_form)
    const xhr = new XMLHttpRequest()
    const method = 'GET'
    const url = '/api/cookie'
    const responseType = 'json'
    xhr.responseType = responseType
    xhr.open(method, url)
    xhr.onload = function() {
        const serverResponse = xhr.response
        let listItems = serverResponse.response
        console.log(listItems)
        let final_str = ""
        let i;
        let return_info;
        for (i=0;i<listItems.length; i++){
            let obj = listItems[i]
            return_info = listItems[i]
            let current = formatElement(obj)
            if (obj.id) {
                item = obj.id
            }
            if (obj.object_id) {
                object = obj.object_id
            }
            final_str += current
        }
        main_display.innerHTML = final_str
        document.getElementById('item-update-btn-group').className = 'item-update-btn-group'
        alert("New Item successfully created!\nA new INVENTORY OBJECT has been created with your new ITEM!\n" +
            "New Item ID #: " + item.toString() + "\nNew Inventory Object ID #: " + object.toString())

}
new_form.entries()
xhr.send(new_form)
}

function getNames(){
    let x = document.getElementById('id_type').value
    const xhr = new XMLHttpRequest()
    const method = 'GET'
    const url = 'https://vectorrigs.herokuapp.com/api/createimageapi' + "?type="+ x
    console.log(url)
    const responseType = 'json'
    xhr.responseType = responseType
    xhr.open(method, url)
    xhr.onload = function () {
        const serverResponse = xhr.response
        let names_data = serverResponse.response
        console.log(names_data)
        let size_of_names = names_data.length
        console.log(size_of_names)
        let begining_str = '<option id="" value="" selected>Choose a Name</option>'
        let main_str = ''

        for (let i = 0; i < size_of_names; i++) {
                main_str += '<option value="'+ names_data[i].id +'">'+ names_data[i].name +'</option>'
        }
        console.log(main_str)
        document.getElementById('id_name').innerHTML = begining_str + main_str
    }
    xhr.send()
}


function setNameDescription() {
    const xhr = new XMLHttpRequest()
    const method = 'GET'
    let x = document.getElementById('id_name').value
    const url = 'https://vectorrigs.herokuapp.com/api/createimageapi' + "?description_id=" + x
    const responseType = 'json'
    xhr.responseType = responseType
    xhr.open(method, url)
    xhr.onload = function () {
        const serverResponse = xhr.response
        console.log(serverResponse)
        let description_info = serverResponse.response

        let main_str = ''
        for (let i = 0; i < description_info.length; i++) {
            main_str += description_info[i].description_info
        }
        document.getElementById('id_description').innerText = main_str
    }
    xhr.send()
}


function getSizes(){
    let x = document.getElementById('id_type').value
    const xhr = new XMLHttpRequest()
    const method = 'GET'
    const url = 'https://vectorrigs.herokuapp.com/api/createimageapi' + "?size_type="+ x
    console.log(url)
    const responseType = 'json'
    xhr.responseType = responseType
    xhr.open(method, url)
    xhr.onload = function () {
        const serverResponse = xhr.response
        let size_data = serverResponse.response
        console.log(size_data)
        let size_of_data = size_data.length
        console.log(size_of_data)
        let begining_str = '<option id="" value="" selected>Select a Size</option>'
        let main_str = ''

        for (let i = 0; i < size_of_data; i++) {
                main_str += '<option value="'+ size_data[i].id +'">'+ size_data[i].size +'</option>'
        }
        console.log(main_str)
        document.getElementById('id_size').innerHTML = begining_str + main_str
    }
    xhr.send()
}

function setSizeDescription() {
    let final_str = document.getElementById('id_description').value
    console.log(final_str)
    const xhr = new XMLHttpRequest()
    const method = 'GET'
    let x = document.getElementById('id_size').value
    const url = 'https://vectorrigs.herokuapp.com/api/createimageapi' + "?size_description_id=" + x
    const responseType = 'json'
    xhr.responseType = responseType
    xhr.open(method, url)
    xhr.onload = function () {
        const serverResponse = xhr.response
        console.log(serverResponse)
        let description_info = serverResponse.response

        let main_str = ''
        for (let i = 0; i < description_info.length; i++) {
            main_str += description_info[i].description_info
        }
         final_str = final_str + " " + main_str
        document.getElementById('id_description').innerText = final_str
    }
    xhr.send()
}

function setNewDescription() {
    let obj_id = document.getElementById('element-object-id').value
    let description_info = document.getElementById('desc_info').value
    let name_id = document.getElementById('name_change').value
    let size_id = document.getElementById('size_info').value
    const xhr = new XMLHttpRequest()
    const method = 'GET'
    let x = document.getElementById('id_size').value
    const url = 'https://vectorrigs.herokuapp.com/api/createimageapi' + "?obj_id=" + obj_id.toString() + "&name_update_id=" + name_id.toString() + "&size_update_id=" + size_id.toString()
    const responseType = 'json'
    xhr.responseType = responseType
    xhr.open(method, url)
    xhr.onload = function () {
        const serverResponse = xhr.response
        loadElement()
    }
    xhr.send()
}