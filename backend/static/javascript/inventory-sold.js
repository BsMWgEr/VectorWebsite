
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
                let selected_item = serverResonse.selected_item
                let new_str = '<option value="' + selected_item[0].id + '" selected>ID: ' + selected_item[0].id + ' Customer: ' + selected_item[0].customer_id
                    + ' ' + selected_item[0].city + ', ' + selected_item[0].state + ' ' + selected_item[0].zipcode + '</option>'
                for (let i = 1; i < answer.length; i++) {
                    new_str += '<option value="' + answer[i].id + '">Customer ID: ' + answer[i].customer_id
                        + answer[i].city + ', ' + answer[i].state + answer[i].zipcode + '</option>'
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