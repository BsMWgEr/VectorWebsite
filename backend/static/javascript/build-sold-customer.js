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
                +'<button type="button" >Create A New Customer</button>'
                +'<input type="date" min="2022-01-01" max="2030-01-01" name="date_sold" id="id_date_sold" placeholder="Enter Date Sold">'
                    +'<textarea name="info" cols="40" rows="10" id="id_info"></textarea>'
                    +'<textarea name="other" cols="40" rows="10" id="id_other"></textarea>'
                    +'<input type="submit" value="Submit">'

        for (let i = 0; i < response_size; i++) {
            middle_str += '<option value="'+ serverResponse.response[i].id +'">'+ serverResponse.response[i].last_name + '   Email: ' + serverResponse.response[i].email + '</option>'
        }
        let final_str = main_str + middle_str + last_str
        document.getElementById('sold-change-display').innerHTML = final_str

    }
    xhr.send()

}

