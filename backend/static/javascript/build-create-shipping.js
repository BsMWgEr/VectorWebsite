function createNewShipping(event) {
    event.preventDefault()
    let my_form = event.target
    let my_FormData = new FormData(my_form)
    let xhr = new XMLHttpRequest()
    let method = my_form.getAttribute('method')
    let url = my_form.getAttribute('action')
    xhr.responseType = 'json'
    xhr.open(method, url)
    xhr.onload = ()=> {
        let serverResonse = xhr.response
        console.log(serverResonse)

    }
    my_FormData.entries()
    xhr.send(my_FormData)
}

function createNewShippingAddress(event) {
    event.preventDefault()
    let my_form = event.target
    let my_FormData = new FormData(my_form)
    let xhr = new XMLHttpRequest()
    let method = my_form.getAttribute('method')
    let url = my_form.getAttribute('action')
    xhr.responseType = 'json'
    xhr.open(method, url)
    xhr.onload = ()=> {
        let serverResonse = xhr.response
        console.log(serverResonse)

    }
    my_FormData.entries()
    xhr.send(my_FormData)
}

function openShippingData() {
    let div_box = document.getElementById('div-box')
    let shipping = document.getElementById('bottom-shipping-div')
    let obj_id = document.getElementById('element-object-id').innerHTML.split(' ')
    if (shipping === null) {
        let new_shipping = document.createElement('div')
        new_shipping.setAttribute('id', 'bottom-shipping-div')
        div_box.appendChild(new_shipping)
    }
    let xhr = new XMLHttpRequest()
    let method = 'GET'
    let url = '/api/get-shipping-data-api?obj_id=' + obj_id[2].toString()
    xhr.responseType = 'json'
    xhr.open(method, url)
    xhr.onload = ()=> {
        let serverResponse = xhr.response
        let answer = serverResponse.response
        let str_detail = ''
        for (let i = 0; i < answer.length; i++) {
            str_detail += '<div id="" class="bottom-shipping-detail"><h1>Shipping Data</h1>'
            + '<p>Inventory Item: '+ answer[i].inventory_item +'</p>'
            + '<p>Sold Detail: '+ answer[i].sold_detail +'</p>'
            + '<p>Shipping Address: '+ answer[i].shipping_address +'</p>'
            + '<p>Date Shipped: '+ answer[i].date_shipped +'</p>'
            + '<p>Tracking Number: '+ answer[i].tracking_number +'</p>'
            + '<p>Shipping Info 1: '+ answer[i].shipper_info1 +'</p>'
            + '<p>Shipping Info 2: '+ answer[i].shipper_info2 +'</p>'
            + '<p>Created Date: '+ answer[i].created_date +'</p>'

        }
        if (str_detail === '') {
            document.getElementById('bottom-shipping-div').innerHTML = '<h1>NO SHIPPING DATA</h1>'
        } else {
            document.getElementById('bottom-shipping-div').innerHTML = str_detail
        }
    }
    xhr.send()
}

function openNewShippingAddressForm() {
    document.getElementById('div-build-new-shipping-address').className = 'div-build-new-shipping-address'
    let element = document.getElementById('element-object-id').innerHTML.split(' ')
    let xhr = new XMLHttpRequest()
    let method = 'GET'
    let url = 'https://vectorrigs.herokuapp.com/api/endpoint3'
    xhr.responseType = 'json'
    xhr.open(method, url)
    xhr.onload = ()=> {
        let serverResponse = xhr.response
        let answer = serverResponse.response
        let first_str = ''
        for (let i = 0; i < answer.length; i++) {
            first_str += '<option value="'+ answer[i].id +'" selected>'+ answer[i].first_name + ' ' + answer[i].last_name +'</option>'
        }

        let new_str = ''
            +'<select name="customer" required id="id_customer">'
                + first_str
            +'</select>'
            +'<input type="text" name="address" maxLength="255" required id="id_address">'
            +'<input type="text" name="city" maxLength="100" required id="id_city">'
            +'<input type="text" name="state" maxLength="2" required id="id_state">'
            +'<input type="text" name="country" maxLength="100" id="id_country">'
            +'<input type="text" name="zip_code" maxLength="10" required id="id_zip_code">'
            +'<textarea name="other" cols="40" rows="10" id="id_other"></textarea>'
            +'<button type="submit">Submit</button>'
        document.getElementById('shipping-new-address-display').innerHTML = new_str
    }

    xhr.send()
}

function openNewShippingDataForm() {
    let obj_id = document.getElementById('element-object-id').innerHTML.split(' ')
    const xhr = new XMLHttpRequest()
    const method = 'GET'
    const url = '/api/get-shipping-data-api' + "?other_id=" + obj_id[2].toString()
    const responseType = 'json'
    xhr.responseType = responseType
    xhr.open(method, url)
    xhr.onload = function () {
        const serverResponse = xhr.response
        let sold_info = serverResponse.response
        let shipping = serverResponse.shipping
        let item = serverResponse.inventory_item
        let shipping_address = ''
        for (let i = 0; i < shipping.length; i++) {
            shipping_address += '<option value="'+ shipping[i].shipping_id +'" selected>Customer ID: '
                + shipping[i].customer_id + ' -- ' + shipping[i].city + ', ' + shipping[i].state + ' '
                + shipping[i].zipcode +'</option>'
        }
        console.log(serverResponse)
        console.log(shipping)
        console.log(sold_info)
        console.log(item)

        main_str = '<select name="inventory_item" required id="id_inventory_item" hidden>'
                + '<option value="' + item[0].inventory_item_id +'" selected>'+ item[0].name + '--' + item[0].serial_number +'</option>'
            + '</select>'
            + '<select name="sold_detail" required id="id_sold_detail" hidden>'
                + '<option value="'+ sold_info[0].sold_data_id +'" selected>'+ sold_info[0].sold_data +'</option>'
            + '</select>'
            + '<select name="shipping_address" required id="id_shipping_address">'
                + shipping_address
            + '</select>'
            + '<input type="date" name="date_shipped" id="id_date_shipped">'
            + '<input type="text" name="tracking_number" maxlength="200" id="id_tracking_number" placeholder="Enter Tracking Number">'
            + '<input type="text" name="Shipper_info1" maxlength="200" id="id_Shipper_info1" placeholder="Enter Shipping Info 1">'
            + '<textarea name="Shipper_info2" cols="40" rows="10" id="id_Shipper_info2" placeholder="Enter Shipping Info 2"></textarea>'
            + '<button type="submit">Submit</button>'
        document.querySelector('#div-build-new-shipping-data').className = 'div-build-new-shipping-data'
        document.querySelector('#update-shipping-new-data-display').innerHTML = main_str
    }
    xhr.send()
}