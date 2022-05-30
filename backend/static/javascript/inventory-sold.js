

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
    let number = `inventory-sold-data-id-number-${x}`
    let sold_item_id = document.getElementById(number).innerHTML.split(' ')
    let id_value = document.getElementById('')
    return `<input name="id" value="${sold_item_id[2]}" hidden>
        <input type="date" name="date_sold" id="id_date_sold" placeholder="Enter Date Sold">
        <input type="number" name="obj_id" value="${id_number}" hidden>
        <input type="text" name="url" value="/api/endpoint3" hidden>
        <button type="submit">Submit</button>`
}

function updateInventorySoldDate(x, id_number) {
    console.log(`updateInventorySoldDate: ${x} ${id_number}`)
    document.getElementById('inventory-sold-update-btn-group').innerHTML = ''
    document.querySelector('#div-inventory-update').className = 'div-inventory-update'
    document.getElementById('update-inventory-change-display').innerHTML = '<div id="inner"></div>'
    document.getElementById('inner').innerHTML = dateChangeDisplayer(x, id_number)
}

function updateInventorySold(number, id_number) {
    console.log(`updateInventorySold: ${number} ${id_number}`)
    let new_div;
    if (!document.getElementById('inventory-sold-update-btn-group')) {
        new_div = document.createElement('div')
        new_div.setAttribute('id', 'inventory-sold-update-btn-group')
    } else  new_div = document.getElementById('inventory-sold-update-btn-group')
        let classInput = ''
        new_div.innerHTML = `<button onclick="updateInventorySoldDate(${number}, ${id_number})" class="${classInput}">Update Date</button>
            <button class="${classInput}">Update Info</button>
            <button class="${classInput}">Update Other Info</button>
            <button class="${classInput}">Change Customer</button>`

        document.querySelectorAll('.inventory-sold-btn-group')
        document.getElementById('update-sold-information-btn').insertAdjacentElement('afterend', new_div)
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
        let dxhr = new XMLHttpRequest()
        dxhr.responseType = 'json'
        dxhr.open('GET', '/api/endpoint3?obj_id=' + obj_id.toString())
        dxhr.onload = ()=> {
            console.log(dxhr.response)
            let answer = dxhr.response.response
            document.getElementById('update-inventory-change-display').innerHTML = ''
            document.getElementById('div-inventory-update').className = 'none'
            document.getElementById('sold-data-one-' + obj_id).innerHTML = `Sold
            Data: ${answer[0].id} --- Sold on: ${answer[0].date_sold}`
            document.getElementById('inventory-sold-data-id-number-' + obj_id.toString()).innerHTML = `Sold Data: ${answer[0].id} --- Sold on: ${answer[0].date_sold}`
            document.getElementById('sold-data-ul-' + obj_id.toString()).innerHTML = `
                        <li>Purchased By: ${answer[0].purchased_by_id}</li>
                        <li>Date Sold: ${answer[0].date_sold}</li>
                        <li>Info: ${answer[0].info}</li>
                        <li>More Info: ${answer[0].other}</li>
                        <li>Date Created: ${answer[0].created_date}</li>`
        }
        dxhr.send()

    }
    my_FormData.entries()
    xhr.send(my_FormData)
}