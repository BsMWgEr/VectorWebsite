


function loadNewElement(x) {
    const my_Form = x
    const new_form = new FormData(my_Form)
    const xhr = new XMLHttpRequest()
    const method = 'POST'
    const url = '/api/endpoint'
    const responseType = 'json'
    xhr.responseType = responseType
    xhr.open(method, url)
    xhr.onload = function () {
    const serverResponse = xhr.response
    let listItems = serverResponse.response
    let final_str = ""
    let i;
    for (i = 0; i < listItems.length; i++) {
        let obj = listItems[i]
        let current = formatElement(obj)
        final_str += current
        }
    main_display.innerHTML = final_str
    closeFields()

    }
    new_form.entries()
    xhr.send(new_form)

}

function updateFields(event){
        event.preventDefault()
        let my_form = event.target
        const new_form = new FormData(my_form)
        const url = '/api/api'
        const method = 'POST'
        const xhr = new XMLHttpRequest()
        xhr.open(method, url)
        xhr.onload = function() {
            const serverResponse = xhr.response
            loadNewElement(my_form)
        }
        new_form.entries()
        xhr.send(new_form)

    }

function PriceChange() {
    document.getElementById('deletebtn').className = 'btnchanger'
    div_id_change.className = 'none'
    change_display2.innerHTML = ''
    div_change.className = 'div-change'
    change_display.innerHTML =
        "<input type='number' name='id' id='id' placeholder='Enter ID'>"
        + "<input type='text' name='price' id='price' placeholder='Enter Price'>"
        + "<button id='btn' onsubmit='closeFields()' type='submit'>Update Price</button>"
    if (document.getElementById('e-id')) {
        document.getElementById('id').defaultValue = document.getElementById('e-id').innerHTML
    }
    document.getElementById('price').defaultValue = document.getElementById('price-info').innerHTML
}

function dueDateChange() {
    document.getElementById('deletebtn').className = 'btnchanger'
    div_id_change.className = 'none'
    change_display2.innerHTML = ''
    div_change.className = 'div-change'
    change_display.innerHTML =
        "<input type='number' name='id' id='id' placeholder='Enter ID'>"
        + "<input type='text' name='due_date' id='due_date' placeholder='Change Due Date'>"
        + "<button id='btn' onsubmit='closeFields()' type='submit'>Update Due Date</button>"
    if (document.getElementById('e-id')) {
        document.getElementById('id').defaultValue = document.getElementById('e-id').innerHTML
    }
    document.getElementById('due_date').defaultValue = document.getElementById('due-date-info').innerHTML
}

function poNumberChange() {
    document.getElementById('deletebtn').className = 'btnchanger'
    div_id_change.className = 'none'
    change_display2.innerHTML = ''
    div_change.className = 'div-change'
    change_display.innerHTML =
        "<input type='number' name='id' id='id' placeholder='Enter ID'>"
        + "<input type='text' name='po_number' id='po_number' placeholder='Change PO Number'>"
        + "<button id='btn' onsubmit='closeFields()' type='submit'>Update PO Number</button>"
    if (document.getElementById('e-id')) {
        document.getElementById('id').defaultValue = document.getElementById('e-id').innerHTML
    }
    document.getElementById('po_number').defaultValue = document.getElementById('po-number-info').innerHTML
}

function descriptionChange() {
    let desc_value = document.getElementById('desc-info').innerHTML
    document.getElementById('deletebtn').className = 'btnchanger'
    div_id_change.className = 'none'
    change_display2.innerHTML = ''
    div_change.className = 'div-change'
    change_display.innerHTML =
        "<input class='inputs' style='display: flex; float: top;' type='number' name='id' id='id' placeholder='Enter ID'>"
        + "<textarea class='inputs' rows='4' cols='40' name='description' id='description'>" + desc_value + "</textarea>"
        + "<button class='inputs' onsubmit='closeFields()' id='btn' type='submit'>Update Description</button>"
    if (document.getElementById('e-id')) {
        document.getElementById('id').defaultValue = document.getElementById('e-id').innerHTML
    }
}

function inStockChange() {
    let x;
    let y;
    if (document.getElementById('p-instock').innerHTML === 'true') {
        y = "checked";
        x = ""
    } else {
        x = "checked"
        y = "";
    }
    document.getElementById('deletebtn').className = 'btnchanger'
    div_id_change.className = 'none'
    change_display2.innerHTML = ''
    div_change.className = 'div-change'
    change_display.innerHTML =
        "<input type='number' name='id' id='id' placeholder='Enter ID'>"
        + "<label for='in_stock'>False</label> "
        + "<input type='radio' name='in_stock' id='in_stock' value='False' placeholder='Change In Stock' " + x + ">"
        + "<label for='in_stock'>True</label> "
        + "<input type='radio' name='in_stock' id='in_stock' value='True' placeholder='Change In Stock' " + y + ">"
        + "<button id='btn' onsubmit='closeFields()' type='submit'>Update In Stock</button>"
    if (document.getElementById('e-id')) {
        document.getElementById('id').defaultValue = document.getElementById('e-id').innerHTML
    }
}


function deleteContainer() {
    div_change.className = 'none'
    change_display.innerHTML = ''
    div_id_change.className = 'div-change'
    document.getElementById('form-id-change2').className = 'none'
    change_display2.innerHTML =
        "<input class='d1' type='number' name='id' id='id' placeholder='Enter ID to Delete'>"
        + "<label class='d4' for='delete'>Check Box to DELETE Item #" + document.getElementById('e-id').innerHTML + " PERMANENTLY</label>"
        + "<input class='d2' type='checkbox' name='delete' id='delete' value='True'> "
        + "<button class='d3' id='d3' onsubmit='alertM();closeFields()' type='submit'>PERMANENT DELETE</button>"
    if (document.getElementById('e-id')) {
        document.getElementById('id').defaultValue = document.getElementById('e-id').innerHTML
    }
}

function serialNumberChange(x) {
    document.getElementById('serial_number_btn').className = 'btnchanger'
    div_id_change.className = 'none'
    change_display2.innerHTML = ''
    div_change.className = 'div-change'
    change_display.innerHTML =
        "<input type='number' name='id' id='id' value='" + x + "' placeholder='Enter ID'>"
        + "<input type='text' name='serial_number' id='serial_number' placeholder='Enter Serial Number'>"
        + "<button id='btn' onsubmit='closeFields()' type='submit'>Submit New Serial Number</button>"
    if (document.getElementById('e-id')) {
        document.getElementById('id').defaultValue = document.getElementById('e-id').innerHTML
    }
    document.getElementById('serial_number').defaultValue = serial_number_
    console.log(serial_number_)
}

function idChange() {
    document.getElementById('deletebtn').className = 'btnchanger'
    div_change.className = 'none'
    change_display.innerHTML = ''
    div_id_change.className = 'div-change'
    document.getElementById('form-id-change2').className = 'id-dropdown-form'
    change_display2.innerHTML = "<input type='number' name='id' id='id' placeholder='Enter ID to Display'>"
        + "<button onsubmit='openUpdateBtn()' type='submit'>Show Container</button>"
}



function PictureChange() {
    uploadFormDisplay()
    document.getElementById('deletebtn').className = 'btnchanger'
    div_id_change.className = 'none'
    change_display2.innerHTML = ''
    div_change.className = 'div-change'
    getUploadListPict()
    document.getElementById('upload-file-div').innerHTML = "<h3 style='color: white;'>Upload A New Picture</h3>"
        + "<input type='file' name='file' id='files' multiple='multiple' accept='image/*' />"
    let fileInput = document.getElementById('files')
    fileInput.addEventListener('change', fileInputChanged)
}

function getUploadListPict() {
    let fxhr = new XMLHttpRequest()
    let method = "GET"
    let url = 'https://vectorrigs.herokuapp.com/api/upload-helper'
    let responseType = 'json'
    fxhr.responseType = responseType
    fxhr.open(method, url + '?=images/')
    fxhr.onload = function () {
        let serverResponse4 = fxhr.response
        console.log(serverResponse4.response)
        let response_size = serverResponse4.response.length
        let final_str = ''
        let str_start = "<div id='displayList'>"
                + "<p>Upload List</p>"
                + "<div id='file-url'></div>"
            + "</div>"
            + "<input type='number' name='id' id='id' value='" + document.getElementById('e-id').innerHTML + "'>"
            + "<select name='picture' id='id_picture'>"
                + '<option selected>Choose A New Picture - Current ' + document.getElementById('p-tag-picture').innerHTML + ' </option>'

        let str_end = "</select>"
            + "<button class='inputs' onsubmit='closeFields()' id='btn' type='submit'>Update Picture</button>"
        for (let i = 0; i < response_size; i++) {
            final_str = final_str + "<option value='" +  serverResponse4.response[i].id + "'>" + serverResponse4.response[i].name + "</option>"
        }
        document.getElementById('change-display').innerHTML = str_start + final_str + str_end


    }
    fxhr.send()
}

function ConfirmChange() {
    uploadFormDisplay()
    document.getElementById('deletebtn').className = 'btnchanger'
    div_id_change.className = 'none'
    change_display2.innerHTML = ''
    div_change.className = 'div-change'
    getUploadListCR()
    document.getElementById('upload-file-div').innerHTML = "<h3 style='color: white;'>Upload A New Report</h3>"
        + "<input type='file' name='file' id='files' multiple='multiple' accept='application/pdf' />"
    let fileInput = document.getElementById('files')
    fileInput.addEventListener('change', fileInputChanged)
}

function getUploadListCR() {
    let fxhr = new XMLHttpRequest()
    let method = "GET"
    let url = 'https://vectorrigs.herokuapp.com/api/upload-helper'
    let responseType = 'json'
    fxhr.responseType = responseType
    fxhr.open(method, url + '?=confirmation_reports/')
    fxhr.onload = function () {
        let serverResponse4 = fxhr.response
        console.log(serverResponse4.response)
        let response_size = serverResponse4.response.length
        let final_str = ''
        let str_start = "<div id='displayList'>"
                + "<p>Upload List</p>"
                + "<div id='file-url'></div>"
            + "</div>"
            + "<input type='number' name='id' id='id'  value='" + document.getElementById('e-id').innerHTML + "''>"
            + "<select name='confirmation_r' id='id_confirmation_r'>"
                + '<option value="" selected>Choose A New Confirmation Report - Current ' + document.getElementById('p-tag-confirmation_r').innerHTML + ' </option>'

        let str_end = "</select>"
            + "<button class='inputs' onsubmit='closeFields()' id='btn' type='submit'>Update Confirmation Report</button>"
        if (serverResponse4.response[0]) {
            for (let i = 0; i < response_size; i++) {
                final_str = final_str + "<option value='" +  serverResponse4.response[i].id + "'>" + serverResponse4.response[i].name + "</option>"
            }
        } else {final_str = "<option id='' >No Reports.. You need to Upload a new report.</option>"}
        document.getElementById('change-display').innerHTML = str_start + final_str + str_end
    }
    fxhr.send()
}


