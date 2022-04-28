
let sold_data_id;
function sold_Data_form(x) {
    document.getElementById('sold_data_form-' + x.toString()).className = "sold-data-form"
    sold_data_id = x
    return sold_data_id
}
let customer_data_id;
function customer_Data_form(x) {
    document.getElementById('create-customer-form-' + x.toString()).className = "create-customer-form"
    customer_data_id = x
    return customer_data_id
}

// XHR request for new customer form -> sends to

    function DataSubmit(event, x){
        event.preventDefault()
        const my_Form = event.target
        const my_FormData = new FormData(my_Form)
        const url = my_Form.getAttribute("action")
        const method = my_Form.getAttribute("method")
        const xhr = new XMLHttpRequest()
        xhr.open(method, url, true)
        xhr.onload = function() {
            const serverResponse = xhr.response
            console.log(x)
            document.getElementById('sold_data_form-' + x).className = "none"

        }
        my_FormData.entries()
        xhr.send(my_FormData)
    }
let crsfToken = document.querySelector('#customer-form input[name=csrfmiddlewaretoken]').value
    function customerDataSubmit(event, x){
        event.preventDefault()
        const my_Form = event.target
        const my_FormData = new FormData(my_Form)
        const url = my_Form.getAttribute("action")
        const method = my_Form.getAttribute("method")
        const xhr = new XMLHttpRequest()
        xhr.open(method, url, true)
        xhr.onload = function() {
            const serverResponse = xhr.response
            console.log(x)
            document.getElementById('create-customer-form-' + x.toString()).className = "none"
            const dxhr = new XMLHttpRequest()
            dxhr.open('GET', '/api/endpoint3', true)
            dxhr.setRequestHeader('Content-Type', 'application/json')
            dxhr.setRequestHeader('X-CSRFTOKEN', crsfToken)
            dxhr.onload = function () {
                const serverResponse2 = dxhr.response
                console.log(serverResponse2.length)

            }
            dxhr.send()

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

            alert("New Item successfully created!\nA new INVENTORY OBJECT(" + object.toString() + ") has been created with your new Item!\n" +
                "New Item ID #: " + item.toString() + "\nNew Inventory Object ID #: " + object.toString())

    }
    new_form.entries()
    xhr.send(new_form)
    }

