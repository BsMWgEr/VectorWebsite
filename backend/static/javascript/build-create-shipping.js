function createSoldNewShipping(event) {
    let my_form = event.target
    let my_FormData = new FormData(my_Form)
    let xhr = new XMLHttpRequest()
    let method = my_form.getAttribute('method')
    let url = my_Form.getAttribute('action')
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

function getShippingSoldFormData() {
    let xhr = new XMLHttpRequest()
    let method = 'GET'
    let url = 'https://vectorrigs.herokuapp.com/api/get-shipping-data-api' + '?'
}

function openNewShippingDataForm() {
    let obj_id = document.getElementById('element-object-id').innerHTML.split(' ')
    const xhr = new XMLHttpRequest()
    const method = 'GET'
    const url = 'https://vectorrigs.herokuapp.com/api/get-shipping-data-api' + "?other_id=" + obj_id[2].toString()
    const responseType = 'json'
    xhr.responseType = responseType
    xhr.open(method, url)
    xhr.onload = function () {
        const serverResponse = xhr.response
        let sold_info = serverResponse.response
        let shipping = serverResponse.shipping
        let item = serverResponse.inventory_item
        console.log(serverResponse)
        console.log(shipping)
        console.log(sold_info)
        console.log(item)
        main_str = '<select name="inventory_item" required id="id_inventory_item">'
            + '<option value="' + +'"></option>'
            + '</select>'
            + '<select name="sold_detail" required id="id_sold_detail">'
            + '<option></option>'
            + '</select>'
            + '<select name="shipping_address" required id="id_shipping_address">'
            + '<option></option>'
            + '</select>'
            + '<input type="text" name="date_shipped" id="id_date_shipped">'
            + '<input type="text" name="tracking_number" maxlength="200" id="id_tracking_number">'
            + '<input type="text" name="Shipper_info1" maxlength="200" id="id_Shipper_info1">'
            + '<textarea name="Shipper_info2" cols="40" rows="10" id="id_Shipper_info2"></textarea>'
            + '<button type="submit">Submit</button>'
    }
}