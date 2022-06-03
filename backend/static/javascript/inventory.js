    /*

        INVENTORY PAGE MAIN FUNCTIONS

    */

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
        window.location.assign('https://vectorrigs.herokuapp.com/manager/inventory-sold/')

    }
    my_FormData.entries()
    xhr.send(my_FormData)
}


function customerDataSubmit(event, x){
    let old_x = x
    event.preventDefault()
    const my_Form = event.target
    const my_FormData = new FormData(my_Form)
    const url = my_Form.getAttribute("action")
    const method = my_Form.getAttribute("method")
    const xhr = new XMLHttpRequest()
    xhr.open(method, url, true)
    xhr.onload = function() {
        document.getElementById('create-customer-form-' + x.toString()).className = "none"
        const dxhr = new XMLHttpRequest()
        dxhr.responseType = 'json'
        dxhr.open('GET', '/api/endpoint3')
        dxhr.onload = function () {
            const serverResponse2 = dxhr.response
            console.log(serverResponse2)
            let x = dxhr.response
            console.log(x)
            let final_string = `<option value="${x.new_customers[0].id}" selected>${x.new_customers[0].first_name} ${x.new_customers[0].last_name}</option>`
            for (let i = 0; i < x.new_customers.length; i++) {
                 final_string += '<option value="' + x.new_customers[i].id + '">' + 'ID: ' + x.new_customers[i].id + x.new_customers[i].first_name
                    + ' ' + x.new_customers[i].last_name + ' email: ' + x.new_customers[i].email + '</option>'
            }
            document.getElementById('id_purchased_by-' + old_x).innerHTML = final_string
        }
        dxhr.send()

    }
    my_FormData.entries()
    xhr.send(my_FormData)

}


function updateInstockField(event) {
    event.preventDefault()
    let my_form = event.target
    const new_form = new FormData(my_form)
    const url = '/api/api'
    const method = 'POST'
    const xhr = new XMLHttpRequest()
    xhr.open(method, url)
    xhr.onload = function () {
        const serverResponse = xhr.response
        window.location.reload()
    }
    new_form.entries()
    xhr.send(new_form)
}


// Update Customer



