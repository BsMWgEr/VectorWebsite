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
            let x = dxhr.response.new_customers
            console.log(x)
            let final_string = '<option value="" selected>Choose A Customer</option>'
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


function createUpdateCustomerButtons() {
    let sold_btn = document.querySelector('#update-sold-information-btn')
    let customer_div_btns = document.createElement('div')
    customer_div_btns.setAttribute('id', 'customer-div')
    sold_btn.append(customer_div_btns)
    let customer_div_form = document.createElement('button')

}

function updateInfoAPI() {
    event.preventDefault()
    let my_form = event.target
    const new_form = new FormData(my_form)
    const url = ''
    const method = 'GET'
    const xhr = new XMLHttpRequest()
    xhr.responseType = 'json'
    xhr.open(method, url)
    xhr.onload = function() {
        let serverResponse = xhr.response
        document.getElementById('div-build-new-sold_customer').className = 'div-build-new-sold_customer'
        document.getElementById('update-sold-new-customer-display').innerHTML =
        '<input type="text" name="first_name" maxLength="100" required id="id_first_name" placeholder="Enter First Name">'
        +'<input type="text" name="last_name" maxLength="100" required id="id_last_name" placeholder="Enter Last Name">'
        +'<input type="text" name="company_name" maxLength="200" id="id_company_name" placeholder="Enter Company Name">'
        +'<input type="email" name="email" maxLength="254" required id="id_email" placeholder="Enter E-Mail">'
        +'<input type="text" name="phone_number" required id="id_phone_number" placeholder="Enter Phone Number">'
        //+'<select name="purchased_item" id="id_purchased_item" multiple>'
        //    +'<option value="74">ID: 74 Type: canopies Name: ID: 38 - New Sabre-3 210 - canopies - Serial #: TBD ----- In Stock: False</option>'
        //+'</select>'
        +'<button type="submit">Submit</button>'

    }
    new_form.entries()
    xhr.send(new_form)
}

