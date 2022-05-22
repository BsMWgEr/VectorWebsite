/*

        SOLD / CUSTOMER BUILD PAGE

 */

// creates new sold data object and attaches it to inventory object -> inventory item
function sendNewSoldData(event) {
    event.preventDefault()
    let my_Form = event.target
    let my_FormData = new FormData(my_Form)
    let xhr = new XMLHttpRequest()
    let method = my_Form.getAttribute('method')
    let url = my_Form.getAttribute('action')
    xhr.responseType = 'json'
    xhr.open(method, url)
    xhr.onload = function () {
        let serverResponse = xhr.response
        console.log('new sold data success')
        closeSoldDiv()
    }

    my_FormData.entries()
    xhr.send(my_FormData)
}

function openSoldCustomerSelect() {
    closeSoldChangeDiv()
    let obj_id = document.getElementById('element-object-id').innerHTML

    const xhr = new XMLHttpRequest()
    const method = 'GET'
    const url = 'https://vectorrigs.herokuapp.com/api/createimageapi' + "?sold_data=" + obj_id
    const responseType = 'json'
    xhr.responseType = responseType
    xhr.open(method, url)
    xhr.onload = function () {
        const serverResponse = xhr.response
        let response_size = serverResponse.response.length
        let item_id = serverResponse.response[0].inventory_item_id
        openSoldDiv()
        div_id_change.className = 'none'
        change_display2.innerHTML = ''
        div_change.className = 'div-change'
        let inventory_item_id = document.getElementById('e-id').innerHTML
        let middle_str = ''


        let main_str = '<select name="inventory_item" required id="id_inventory_item">'
                    +'<option value="'+ inventory_item_id +'" selected>'+ inventory_item_id +'</option>'
                +'</select>'
                +'<select name="purchased_by" required id="id_purchased_by-{{ x.id }}">'
                    +'<option value="" selected>Choose A Customer</option>'


        let last_str = '</select>'

                +'<input type="date" min="2022-01-01" max="2030-01-01" name="date_sold" id="id_date_sold" placeholder="Enter Date Sold">'
                    +'<textarea name="info" cols="40" rows="10" id="id_info"></textarea>'
                    +'<textarea name="other" cols="40" rows="10" id="id_other"></textarea>'
                    +'<input type="submit" value="Submit">'

        for (let i = 0; i < response_size; i++) {
            middle_str += '<option value="'+ serverResponse.response[i].id +'">'+ serverResponse.response[i].last_name + '   Email: ' + serverResponse.response[i].email + '</option>'
        }
        let final_str = main_str + middle_str + last_str
        document.getElementById('sold-change-display').innerHTML = final_str
        closeDivChange()
    }
    xhr.send()

}

function createSoldDetail() {
    let div_box = document.getElementById('div-box')
    if (document.getElementById('right-sold-bottom-div') === null) {
        let right_div = document.createElement('div')
        right_div.setAttribute('id', 'right-sold-bottom-div')
        let right_node = document.createTextNode("new text goes here")
        right_div.appendChild(right_node)
        div_box.appendChild(right_div)
    }
        let obj_id = document.getElementById('e-id').innerHTML
        let xhr = new XMLHttpRequest()
        let method = 'GET'
        let url = '/api/endpoint3' + '?all_sold_data=' + obj_id
        xhr.responseType = 'json'
        xhr.open(method, url)
        xhr.onload = function () {
            let serverResponse = xhr.response
            let answer = serverResponse.response
            console.log(serverResponse.response)
            let str_detail = ''
            for (let i = 0; i < answer.length; i++) {
                if (answer[i].purchased_by_id) {
                    displayPurchasedBy(answer[i].purchased_by_id)
                }
                str_detail += '<div id="" class="build-page-sold-detail"><h1>Sold Data</h1><p id="sold-id-number">'
                    + 'id: ' + answer[i].id + '</p><p>date sold: ' + answer[i].date_sold
                    + '</p><p id="build-sold-info">Info: ' + answer[i].info + '</p><p id="build-sold-other">other: ' + answer[i].other
                    + '</p><p>created_date' + answer[i].created_date + '</p><p id="build-sold-purchased_by">Purchased By: '+ answer[i].purchased_by_id +'</p></div>'
            }

            document.getElementById('right-sold-bottom-div').innerHTML = str_detail
        }
        xhr.send()
}
function displayPurchasedBy(x) {
    let div_box = document.getElementById('div-box')
    if (document.getElementById('right-sold-customer-div') === null) {
        let right_div = document.createElement('div')
        right_div.setAttribute('id', 'right-sold-customer-div')
        let right_node = document.createTextNode("new text goes here")
        right_div.appendChild(right_node)
        div_box.appendChild(right_div)
    }
    let xhr = new XMLHttpRequest()
    let method = 'GET'
    let url = '/api/endpoint3' + '?all_customer_data=' + x
    xhr.responseType = 'json'
    xhr.open(method, url)
    xhr.onload = function () {
        let serverResponse = xhr.response
        let answer = serverResponse.response
        let main_str = ''
        for (let i = 0; i < answer.length; i++) {
            main_str += '<div id="" class="build-page-customer-detail"><h1>Customer</h1><p>'
                    + 'id: ' + answer[i].id + '</p><p>First Name: ' + answer[i].first_name
                    + '</p><p>Last Name: ' + answer[i].last_name + '</p><p>Company: ' + answer[i].company
                    + '</p><p>Email: ' + answer[i].email + '</p><p>Phone Number: '+ answer[i].phone_number +'</p></div>'
        }
        document.getElementById('right-sold-customer-div').innerHTML = main_str
    }
    xhr.send()
}


function updateSoldData(event) {
    event.preventDefault()
    let my_Form = event.target
    let my_FormData = new FormData(my_Form)
    let xhr = new XMLHttpRequest()
    let method = my_Form.getAttribute('method')
    let url = my_Form.getAttribute('action')
    xhr.responseType = 'json'
    xhr.open(method, url)
    xhr.onload = function () {
        let serverResponse = xhr.response
        console.log('new sold data success')
        document.getElementById('update-sold-change-display').innerHTML = ''
        createSoldDetail()
    }

    my_FormData.entries()
    console.log(my_FormData)
    xhr.send(my_FormData)
}

function createSoldInfoChange() {
    document.getElementById('div-build-sold_customer').className = 'none'
    document.getElementById('div-build-update-sold_customer').className = 'div-build-update-sold_customer'
    document.querySelector('#sold-change-display').className = 'sold-change-display'
    let current_sold_info = document.getElementById('build-sold-info').innerHTML.split(' ')
    let new_id = document.getElementById('sold-id-number').innerHTML.split(' ')
    let sold_info = ''
    for (let i = 1; i < current_sold_info.length; i++) {
        sold_info += current_sold_info[i] + ' '
    }
    document.getElementById('update-sold-change-display').innerHTML = '<input name="id" value="'+ new_id[1] +'" hidden>'
        +'<textarea name="info" cols="40" rows="10" id="id_info">'+ sold_info +'</textarea>'
        +'<button type="submit">Submit</button>'
}

function createSoldOtherChange() {
    document.getElementById('div-build-sold_customer').className = 'none'
    document.getElementById('div-build-update-sold_customer').className = 'div-build-update-sold_customer'
    document.querySelector('#sold-change-display').className = 'sold-change-display'
    let current_sold_info = document.getElementById('build-sold-other').innerHTML.split(' ')
    let new_id = document.getElementById('sold-id-number').innerHTML.split(' ')
    let sold_info = ''
    for (let i = 1; i < current_sold_info.length; i++) {
        sold_info += current_sold_info[i] + ' '
    }
    document.getElementById('update-sold-change-display').innerHTML = '<input name="id" value="'+ new_id[1] +'" hidden>'
        +'<textarea name="other" cols="40" rows="10" id="id_other">'+ sold_info +'</textarea>'
        +'<button type="submit">Submit</button>'
}

function createSoldNewCustomer(event) {
    event.preventDefault()
    let my_Form = event.target
    let my_FormData = new FormData(my_Form)
    let xhr = new XMLHttpRequest()
    let method = my_Form.getAttribute('method')
    let url = my_Form.getAttribute('action')
    xhr.responseType = 'json'
    xhr.open(method, url)
    xhr.onload = function () {
        let serverResponse = xhr.response
        console.log('new sold data success')
        closeSoldNewCustomerDiv()

    }
    my_FormData.entries()
    xhr.send(my_FormData)
}

function openNewSoldCustomerDisplay() {
    document.querySelector('#sold-change-display').className = 'none'
    document.getElementById('div-build-new-sold_customer').className = 'div-build-new-sold_customer'
    document.getElementById('update-sold-new-customer-display').innerHTML =
            '<input type="text" name="first_name" maxLength="100" required id="id_first_name" placeholder="Enter First Name">'
            +'<input type="text" name="last_name" maxLength="100" required id="id_last_name" placeholder="Enter Last Name">'
            +'<input type="text" name="company_name" maxLength="200" id="id_company_name" placeholder="Enter Company Name">'
            +'<input type="email" name="email" maxLength="254" required id="id_email" placeholder="Enter E-Mail">'
            +'<input type="number" name="phone_number" required id="id_phone_number" placeholder="Enter Phone Number">'
            //+'<select name="purchased_item" id="id_purchased_item" multiple>'
            //    +'<option value="74">ID: 74 Type: canopies Name: ID: 38 - New Sabre-3 210 - canopies - Serial #: TBD ----- In Stock: False</option>'
            //+'</select>'
            +'<button type="submit">Submit</button>'
}

function createSoldDateChange() {
    document.querySelector('#sold-change-display').className = 'sold-change-display'
    document.getElementById('div-build-sold_customer').className = 'none'
    document.getElementById('div-build-update-sold_customer').className = 'div-build-update-sold_customer'
    let sold_id = document.getElementById('sold-id-number').innerHTML.split(' ')
    document.getElementById('update-sold-change-display').innerHTML = '<input name="id" value="'+ sold_id[1] +'" hidden>' + '<input ' +
        'type="date" ' +
        'min="2022-01-01" ' +
        'max="2030-01-01" ' +
        'name="date_sold" ' +
        'id="id_date_sold" ' +
        'placeholder="Enter Date Sold">'
        +'<button type="submit">Submit</button>'
}