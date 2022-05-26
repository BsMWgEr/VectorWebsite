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
        openShippingData()
        document.getElementById('div-build-new-shipping-data').className = 'none'
        document.getElementById('update-shipping-new-data-display').innerHTML = ''
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
        if (document.getElementById('div-build-new-shipping-data').className === 'div-build-new-shipping-data') {
            let obj_id = document.getElementById('element-object-id').innerHTML.split(' ')
            let dxhr = new XMLHttpRequest()
            dxhr.responseType = 'json'
            dxhr.open('GET', '/api/get-shipping-address?id_number=' + obj_id[2].toString())
            dxhr.onload = () => {
                let serverResonse = dxhr.response
                let answer = serverResonse.response
                let selected_item = serverResonse.selected_item
                let new_str = '<option value="' + selected_item[0].id + '" selected>ID: ' + selected_item[0].id + ' Customer: ' + selected_item[0].customer_id
                    + ' ' + selected_item[0].city + ', ' + selected_item[0].state + ' ' + selected_item[0].zipcode + '</option>'
                for (let i = 1; i < answer.length; i++) {
                    new_str += '<option value="' + answer[i].id + '">Customer ID: ' + answer[i].customer_id
                        + answer[i].city + ', ' + answer[i].state + answer[i].zipcode + '</option>'
                }
                document.getElementById('shipping-new-address-display').innerHTML = ''
                document.getElementById('div-build-new-shipping-address').className = 'none'
                document.getElementById('id_shipping_address').innerHTML = new_str
            }
            dxhr.send()
        }
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
        document.getElementById('bottom-right-inner-div').appendChild(new_shipping)
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
    let url = 'https://vectorrigs.herokuapp.com/api/get-shipping-address?shipping_customer_id=' + element[2].toString()
    xhr.responseType = 'json'
    xhr.open(method, url)
    xhr.onload = ()=> {
        let serverResponse = xhr.response
        let answer = serverResponse.response
        console.log(serverResponse)
        let selected_item = serverResponse.selected_item
        console.log(selected_item)
        let first_str = ''
        for (let i = 0; i < answer.length; i++) {
            first_str += '<option value="'+ answer[i].id +'">'+ answer[i].first_name + ' ' + answer[i].last_name +'</option>'
        }
        let second_str = ''
        if (selected_item.length === 1) {
            second_str = '<option value="'+ selected_item[0].id +'" selected>Customer: '+ selected_item[0].first_name + ' ' + selected_item[0].last_name +'</option>'
        } else {
            second_str = '<option value="" selected>Select a Customer</option>'
        }

        let new_str = ''
            + '<input type="number" value="'+ element[2] +'" name="inventory_object_id" hidden>'
            +'<select name="customer" required id="id_customer">'
                + second_str
                + first_str
            +'</select>'
            +'<input type="text" name="address" maxLength="255" required id="id_address" placeholder="Enter Address">'
            +'<input type="text" name="city" maxLength="100" required id="id_city" placeholder="Enter City">'
            +'<input type="text" name="state" maxLength="2" required id="id_state" placeholder="Enter State">'
            +'<input type="text" name="country" maxLength="100" id="id_country" placeholder="Enter Country (not required)">'
            +'<input type="text" name="zip_code" maxLength="10" required id="id_zip_code" placeholder="Enter Zip Code">'
            +'<textarea name="other" cols="40" rows="10" id="id_other" placeholder="Enter Other Info (not required)"></textarea>'
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
        let shipping_address = '<option value="" selected>Choose a Shipping Address (or Create a New One)</option>'
        for (let i = 0; i < shipping.length; i++) {
            shipping_address += '<option value="'+ shipping[i].shipping_id +'">Customer: '
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
            + '<input  type="number" name="inventory_object_id" value="'+ obj_id[2] +'" hidden>'
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