
/*

JAVASCRIPT FOR UPDATE ITEMS SCREEN ON THE BUILD PAGE

 */


// NameChange() from build.html activates this function and hits -> api endpoint -> create_image_api (backend.views) -> hits DB
function setNewDescription() {
        let obj_id = document.getElementById('element-object-id').innerHTML
        let description_info = document.getElementById('desc-info').innerHTML
        let name_id = document.getElementById('name_change').value
        let size_id = document.getElementById('size-info').innerHTML
        const xhr = new XMLHttpRequest()
        const method = 'GET'
        const url = 'https://vectorrigs.herokuapp.com/api/createimageapi' + "?obj_id=" + obj_id.toString() + "&name_update_id=" + name_id.toString() + "&size_update_id=" + size_id.toString()
        const responseType = 'json'
        xhr.responseType = responseType
        xhr.open(method, url)
        xhr.onload = function () {
            const serverResponse = xhr.response

        }
        xhr.send()
    }
// Creates the container display activated from update forms through updateFields()
// Dynamically display updates to inventory_item as you make changes
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

// THis is performing the actual changes to Iventory Items from the build update page
// Updates inventory item fields from invdividual dynamically created forms --> backend.api_view --> performs DB functions -->  hits loadNewElement()
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

    // Dynamic Price update form --> displays to build page on the update screen
    // activated from main update-button-group on build.html
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

    // Dynamic DueDate update form --> displays to build page on the update screen
   // activated from main update-button-group on build.html
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

    // Dynamic PO# update form --> displays to build page on the update screen
   // activated from main update-button-group on build.html
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

    // Dynamic Description update form --> displays to build page on the update screen
   // activated from main update-button-group on build.html
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

    // Dynamic InStock update form --> displays to build page on the update screen
   // activated from main update-button-group on build.html
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


// Dynamic Delete Item update form --> displays to build page on the update screen
   // activated from main update-button-group on build.html
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

    // Dynamic serialNumber update form --> displays to build page on the update screen
   // activated from main update-button-group on build.html
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


   // activated from main update-button-group on build.html
function idChange() {
    document.getElementById('deletebtn').className = 'btnchanger'
    div_change.className = 'none'
    change_display.innerHTML = ''
    div_id_change.className = 'div-change'
    document.getElementById('form-id-change2').className = 'id-dropdown-form'
    change_display2.innerHTML = "<input type='number' name='id' id='id' placeholder='Enter ID to Display'>"
        + "<button type='submit'>Show Container</button>"
}


    // Dynamic Picture Change update form --> displays to build page on the update screen
    // Allows for instant uploads straight to item
    // This links with the build-upload-script.js to upload through aws
    // event listener onchange for the uploadForm (instant upload once file is selected)
    // Also hits DB --> creates new Media Object (upon upload)
   // activated from main update-button-group on build.html
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


// Activated from  PictureChange()
// Image list retrieval from the DB
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
        if (document.getElementById('container')) {
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
                final_str = final_str + "<option value='" + serverResponse4.response[i].id + "'>" + serverResponse4.response[i].name + "</option>"
            }
            document.getElementById('change-display').innerHTML = str_start + final_str + str_end
        } else if (document.getElementById('create-upload-form-btns')) {
            let final_str = ''
            let str_start = ''
            let main_str = ''
            let last_value = serverResponse4.response[response_size].id
            str_start = '<option value="'+ last_value +'" selected>'+ serverResponse4[response_size].name +'</option>'
            for (let i = 0; i < response_size; i++) {
                main_str += "<option value='" + serverResponse4.response[i].id + "'>" + serverResponse4.response[i].name + "</option>"
            }
            final_str = str_start + main_str
            console.log(final_str)
            document.getElementById('id_picture').innerHTML = final_str
        }

    }
    fxhr.send()
}


    // links to build-upload-script.js to upload to aws
    // THis also hit the DB --> and creates a new Media Object

   // activated from main update-button-group on build.html
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


// Confirmation report retrieval from DB -  activated from ConfirmChange()
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


