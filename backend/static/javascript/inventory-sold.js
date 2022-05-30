

function shippingDataSubmit(event, x){
    event.preventDefault()
    const my_Form = event.target
    const my_FormData = new FormData(my_Form)
    const url = my_Form.getAttribute("action")
    const method = my_Form.getAttribute("method")
    const xhr = new XMLHttpRequest()
    xhr.open(method, url, true)
    xhr.onload = function() {
        const serverResponse = xhr.response
        window.location.assign('https://vectorrigs.herokuapp.com/manager/inventory-shipping/')

    }
    my_FormData.entries()
    xhr.send(my_FormData)
}

function shippingAddressSubmit(event, x){
    event.preventDefault()
    const my_Form = event.target
    const my_FormData = new FormData(my_Form)
    const url = my_Form.getAttribute("action")
    const method = my_Form.getAttribute("method")
    const xhr = new XMLHttpRequest()
    xhr.open(method, url, true)
    xhr.onload = ()=> {
        document.getElementById('shipping_address_form-' + x.toString()).className = 'none'
        if (document.getElementById('shipping_data_form-' + x.toString()).className === 'shipping-data-form') {
            let obj_id = x
            let dxhr = new XMLHttpRequest()
            dxhr.responseType = 'json'
            dxhr.open('GET', '/api/get-shipping-address?id_number=' + obj_id.toString())
            dxhr.onload = () => {
                let serverResonse = dxhr.response
                let answer = serverResonse.response
                let new_str = ''
                if (serverResonse.selected_item) {
                    let selected_item = serverResonse.selected_item
                    new_str += '<option value="' + selected_item[0].id + '" selected>ID: ' + selected_item[0].id + ' Customer: ' + selected_item[0].customer_id
                        + ' ' + selected_item[0].city + ', ' + selected_item[0].state + ' ' + selected_item[0].zipcode + '</option>'
                }
                for (let i = 1; i < answer.length; i++) {
                    new_str += `<option value="${answer[i].id}">Customer ID: ${answer[i].customer_id}
                    + ${answer[i].city} , ${answer[i].state} ${answer[i].zipcode}</option>`
                }
                document.getElementById('id_shipping_address').innerHTML = new_str
            }
            dxhr.send()
        }
    }
    my_FormData.entries()
    xhr.send(my_FormData)
}

function openShippingDataForm(x) {
    document.getElementById('shipping_data_form-' + x.toString()).className = 'shipping-data-form'
}

function openShippingAddressForm(x) {
    document.getElementById('shipping_address_form-' + x.toString()).className = 'shipping-address-form'
}

function dateChangeDisplayer(x, id_number) {
    console.log(`dateChangeDisplayer: ${x} ${id_number}`)
    return `<input name="id" value="${x}" hidden>
        <input type="date" name="date_sold" id="id_date_sold" placeholder="Enter Date Sold">
        <input type="number" name="obj_id" value="${id_number}" hidden>
        <input type="text" name="url" value="/api/endpoint3" hidden>
        <button type="submit">Submit</button>`
}

function infoChangeDisplayer(x, id_number) {
    console.log(`infoChangeDisplayer: ${x} ${id_number}`)
    return `<input name="id" value="${x}" hidden>
        <textarea name="info" placeholder="Enter Sold Info Here"></textarea>
        <input type="number" name="obj_id" value="${id_number}" hidden>
        <input type="text" name="url" value="/api/endpoint3" hidden>
        <button type="submit">Submit</button>`
}

function otherChangeDisplayer(x, id_number) {
    console.log(`otherChangeDisplayer: ${x} ${id_number}`)
    return `<input name="id" value="${x}" hidden>
        <textarea name="other" placeholder="Enter Other Info Here"></textarea>
        <input type="number" name="obj_id" value="${id_number}" hidden>
        <input type="text" name="url" value="/api/endpoint3" hidden>
        <button type="submit">Submit</button>`
}

function getCustomers() {
    let xhr = new XMLHttpRequest()
    xhr.responseType = 'json'
    xhr.open('GET', '/api/endpoint3')
    xhr.onload = ()=> {
        let answer = xhr.response.response
        let select_options = ''
        for (let i = 0; i < answer.length; i++) {
            select_options += `<option value="${answer[i].id}" >${answer[i].id} ${answer[i].first_name} ${answer[i].last_name} ${answer[i].email}</option>`
        }

    }
    xhr.send()
}

function customerChangeDisplayer(x,id_number) {
    console.log(`customerChangeDisplayer: ${x} ${id_number}`)
    let xhr = new XMLHttpRequest()
    xhr.responseType = 'json'
    xhr.open('GET', '/api/endpoint3')
    xhr.onload = ()=> {
        console.log(xhr.response)
        let answer = xhr.response.new_customers
        let select_options = ''
        for (let i = 0; i < answer.length; i++) {
            select_options += `<option value="${answer[i].id}" >${answer[i].id} ${answer[i].first_name} ${answer[i].last_name} ${answer[i].email}</option>`
        }
        document.getElementById('inner').innerHTML = `<input name="id" value="${x}" hidden>
            <select name="purchased_by_id"><option value="" selected>Choose a New Customer</option>${select_options}</select>
            <button type="submit">Submit</button>`
    }
    xhr.send()
}

function updateInventorySoldSwitch(type, x, id_number) {
    console.log(`updateInventorySoldDate: ${type.type} ${x} ${id_number}`)
    document.getElementById('inventory-sold-update-btn-group').innerHTML = ''
    document.querySelector('#div-inventory-update').className = 'div-inventory-update'
    document.getElementById('update-inventory-change-display').innerHTML = '<div id="inner"></div>'
    let inner = document.getElementById('inner')
    switch (type.type) {
        case 'update_date':
            inner.innerHTML = dateChangeDisplayer(x, id_number)
            break
        case 'update_info':
            inner.innerHTML = infoChangeDisplayer(x, id_number)
            break
        case 'update_other':
            inner.innerHTML = otherChangeDisplayer(x, id_number)
            break
        case 'update_customer':
            customerChangeDisplayer(x, id_number)
            break
        default:
            alert('none')
    }

}

function updateInventorySold(number, id_number) {
    console.log(`updateInventorySold: ${number} ${id_number}`)
    let new_div;
    if (!document.getElementById('inventory-sold-update-btn-group')) {
        new_div = document.createElement('div')
        new_div.setAttribute('id', 'inventory-sold-update-btn-group')
    } else  new_div = document.getElementById('inventory-sold-update-btn-group')
        let classInput = ''
        new_div.innerHTML = `<button onclick="updateInventorySoldSwitch({'type': 'update_date'}, ${number}, ${id_number})" class="${classInput}">Update Date</button>
            <button onclick="updateInventorySoldSwitch({'type': 'update_info'}, ${number}, ${id_number})" class="${classInput}">Update Info</button>
            <button onclick="updateInventorySoldSwitch({'type': 'update_other'}, ${number}, ${id_number})" class="${classInput}">Update Other Info</button>
            <button onclick="updateInventorySoldSwitch({'type': 'update_customer'}, ${number}, ${id_number})" class="${classInput}">Change Customer</button>`


        document.querySelectorAll('.inventory-sold-btn-group')
        document.getElementById('update-sold-information-btn').insertAdjacentElement('afterend', new_div)
}


function getSoldDataDisplay(obj_id) {
    let xhr = new XMLHttpRequest()
    xhr.responseType = 'json'
    xhr.open('GET', '/api/endpoint3?obj_id=' + obj_id.toString())
    xhr.onload = ()=> {
        console.log(xhr.response)
        let answer = xhr.response.response
        let customer = xhr.response.customer
        document.getElementById('update-inventory-change-display').innerHTML = ''
        document.getElementById('div-inventory-update').className = 'none'
        document.getElementById('sold-data-one-' + obj_id).innerHTML = `Sold
            Data: ${answer[0].id} --- Customer: ID:${customer[0].id} - ${customer[0].last_name}, ${customer[0].first_name} - 
            Phone #: ${customer[0].phone_number} - ${customer[0].email} - Date Sold: ${answer[0].date_sold}`
        document.getElementById('inventory-sold-data-id-number-' + obj_id.toString()).innerHTML = `
            Sold Data: ${answer[0].id} --- Sold on: ${answer[0].date_sold}`
        document.getElementById('sold-data-ul-' + obj_id.toString()).innerHTML = `
                    <li>Purchased By: ID: ${customer[0].id} - ${customer[0].last_name}, ${customer[0].first_name}
                        - Phone #: ${customer[0].phone_number} - ${customer[0].email}</li>
                    <li>Date Sold: ${answer[0].date_sold}</li>
                    <li>Info: ${answer[0].info}</li>
                    <li>More Info: ${answer[0].other}</li>
                    <li>Date Created: ${answer[0].created_date}</li>`
    }
    xhr.send()
}


function updateInventorySoldData(event, obj_id) {
    event.preventDefault()
    let my_Form = event.target
    let my_FormData = new FormData(my_Form)
    let xhr = new XMLHttpRequest()
    let method = my_Form.getAttribute('method')
    let url = my_Form.getAttribute('action')
    xhr.responseType = 'json'
    xhr.open(method, url)
    xhr.onload = function () {
        getSoldDataDisplay(obj_id)
    }
    my_FormData.entries()
    xhr.send(my_FormData)
}