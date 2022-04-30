    const price_change = document.getElementById("form-price-change")
    const name_change = document.getElementById('form-name-change')
    const id_change = document.getElementById('form-id-change')
    const element = document.getElementById('form')
    const main_display = document.getElementById('container-display')
    const div_name_change = document.getElementById('div-form-name-change')
    const div_change = document.getElementById('div-change')
    const change_display = document.getElementById('change-display')
    const change_display2 = document.getElementById('change-display-id')
    const display_name = document.getElementById('change-display-name')
    const main_container = document.getElementById('container-main')
    const change_display3 = document.getElementById('form-id-change2')
    const div_id_change = document.getElementById('div-id-change')



    function handleFormSubmit(event){
        event.preventDefault()
        const my_Form = event.target
        const my_FormData = new FormData(my_Form)
        const url = my_Form.getAttribute("action")
        const method = my_Form.getAttribute("method")
        const xhr = new XMLHttpRequest()
        xhr.open(method, url)
        xhr.onload = function() {
            const serverResponse = xhr.response
            loadElement(event)

        }
        my_FormData.entries()
        xhr.send(my_FormData)

    }

    function loadElement(event) {
        let item
        let object
        event.preventDefault()
        let my_form = event.target
        const new_form = new FormData(my_form)
        const xhr = new XMLHttpRequest()
        const method = 'GET'
        const url = '/api/cookie'
        const responseType = 'json'
        xhr.responseType = responseType
        xhr.open(method, url)
        xhr.onload = function() {
            const serverResponse = xhr.response
            let listItems = serverResponse.response
            console.log(listItems)
            let final_str = ""
            let i;
            let return_info;
            for (i=0;i<listItems.length; i++){
                let obj = listItems[i]
                return_info = listItems[i]
                let current = formatElement(obj)
                if (obj.id) {
                    item = obj.id
                }
                if (obj.object_id) {
                    object = obj.object_id
                }
                final_str += current
            }
            main_display.innerHTML = final_str
            document.getElementById('item-update-btn-group').className = 'item-update-btn-group'
            alert("New Item successfully created!\nA new INVENTORY OBJECT has been created with your new ITEM!\n" +
                "New Item ID #: " + item.toString() + "\nNew Inventory Object ID #: " + object.toString())

    }
    new_form.entries()
    xhr.send(new_form)
    }

    function loadNewInventoryItem() {
        let item
        let object
        const xhr = new XMLHttpRequest()
        const method = 'GET'
        const url = '/api/build_api_new'
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
                if (obj.id) {
                    item = obj.id
                }
                if (obj.object_id) {
                    object = obj.object_id
                }
                let current = formatElement(obj)
                final_str += current
            }
            main_display.innerHTML = final_str

            alert("New Item successfully created!\nA new INVENTORY OBJECT(" + object.toString() + ") has been created with your new Item!\n" +
                "New Item ID #: " + item.toString() + "\nNew Inventory Object ID #: " + object.toString())

        }

        xhr.send()
     }

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
             document.getElementById('item-update-btn-group').className = 'item-update-btn-group'
             closeFields()
         }
         new_form.entries()
         xhr.send(new_form)

     }





    let serial_number_;
    let serial_number_display;
    let sold_display;
    function formatElement(element) {
         if (element.serial_number === 0) {
            serial_number_display = 'Serial # TBD'
         } else {
             serial_number_display = "Serial #: " + element.serial_number
             serial_number_ = element.serial_number
         }
         if (element.sold) {
             sold_display = "<img class='sold-img' src='{% static 'images/sold.gif' %}'>"
         } else sold_display = " "
         return "<div class='container' onclick='closeFields()'>"
            + "<div class='inner-container'>"
            + "<div class='container-left'><img src='https://stockvectorrigs.s3.amazonaws.com/static/" + element.picture + "' height='140' width='212'>" + sold_display + "</div>"
            + "<div id='selector' class='container-right'>"
            + "<p>Brand New Vector</p><p id='name-display' class='color-vector'>" + element.name + "</p>"
            + "<p class='color-vector'>" + serial_number_display + "</p>"
            + "<p id='p-instock'>" + element.in_stock + "</p>"
            + "<p id='due-date-info'>" + element.due_date + "</p>"
            + "<p id='size-info' class='color-vector'>" + element.size + "</p>"
            + "<div id='desc-info' class='description'>" + element.description + "</div>"
            + "<p>$</p><p id='price-info' class='price-vector'>" + element.price + "</p>"
            + "<p>Due On : " + element.due_date + "</p>"
            + "<p id='po-number-info'>" + element.po_number + "</p>"
            + "<a class='color-vector' id='color-vector-a' href='https://stockvectorrigs.s3.amazonaws.com/static/" + element.confirmation_r + "'>SEE CONFIRMATION REPORT</a>"
            + "</div>"
            + "</div>"
            + "</div>"
            + "<div class='bottom-display' id='div-box'>"
            + "<h1 id='h1-info-tag'>Current Build: ID# </h1><h1 id='e-id'>" + element.id + "</h1>"

            + "<h1 class='stocking-tag' id='gh2'>ITEM IN-STOCK: " + element.in_stock + "</h1>"
            + "<p>Item ID #: " + element.id + "</p>"
            + "<p>Inventory Object ID #: " + element.object_id + "</p>"
            + "<p class='serial-tag' id='gh1'>" + serial_number_display + "</p>"
            + "<p>Type: " + element.type + "</p>"
            + "<p id='p-tag-name'>Name: " + element.name + "</p>"+ "<p id='p-tag-size'>Size: " + element.size + "</p>" + "<p>Due Date:" + element.due_date + "</p>"
            + "<p id='p-tag-confirmation_r'>Confirmation Report: " + element.confirmation_r + "</p>" + "<p id='p-tag-picture'>Picture File: " + element.picture + "</p>"
            + "<p>Description: " + element.description + "</p>"
             + "<p>PO Number: " + element.po_number + "</p>"
            + "</div>"

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
/*
    function soldChange() {
            let x;
            let y;
            if (document.getElementById('gh3').innerHTML === 'ITEM SOLD: true') {
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
                + "<label for='sold'>False</label> "
                + "<input type='radio' name='sold' id='sold' value='False' " + x + ">"
                + "<label for='sold'>True</label> "
                + "<input type='radio' name='sold' id='sold' value='True' " + y + ">"
                + "<button id='btn' onmouseout='closeFields()' type='submit'>Update Sold</button>"
            if (document.getElementById('e-id')) {
                document.getElementById('id').defaultValue = document.getElementById('e-id').innerHTML
            }
    }
*/
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
            + "<button onsubmit='closeFields()' type='submit'>Show Container</button>"


    }



    function closeFields() {
        document.getElementById('deletebtn').className = 'btnchanger'
        div_change.className = 'none'
        change_display.innerHTML = ''
        div_id_change.className = 'none'
        change_display2.innerHTML = ''

    }

    function closeCreateForm(){
        //document.getElementById('item-update-btn-group').className = 'none'
        document.getElementById('create-form').className = 'none'
        document.getElementById('display-form-btn').className = 'btnchanger'
    }

    function openCreateForm() {
        document.getElementById('item-update-btn-group').className = 'item-update-btn-group'
        document.getElementById('create-form').className = 'div-form'

    }

    function closeUpdateGroup() {
        document.getElementById('item-update-btn-group').className = 'none'
        document.getElementById('container-display').innerHTML = ''
    }


    function alertM() {
        alert('Container Deleted!')
    }


const ghf = document.getElementById('inner-container')

    function uploadFormDisplay() {
        document.getElementById('uploadForm').className = 'uploadForm'
    }

    function uploadFormOff() {
        document.getElementById('uploadForm').className = 'none'
    }


    function getNames(){
        let x = document.getElementById('id_type').value
        const xhr = new XMLHttpRequest()
        const method = 'GET'
        const url = 'https://vectorrigs.herokuapp.com/api/createimageapi' + "?type="+ x
        console.log(url)
        const responseType = 'json'
        xhr.responseType = responseType
        xhr.open(method, url)
        xhr.onload = function () {
            const serverResponse = xhr.response
            let names_data = serverResponse.response
            console.log(names_data)
            let size_of_names = names_data.length
            console.log(size_of_names)
            let begining_str = '<option id="" value="" selected>Choose a Name</option>'
            let main_str = ''

            for (let i = 0; i < size_of_names; i++) {
                    main_str += '<option value="'+ names_data[i].id +'">'+ names_data[i].name +'</option>'
            }
            console.log(main_str)
            document.getElementById('id_name').innerHTML = begining_str + main_str
        }
        xhr.send()
}


function setNameDescription() {
    const xhr = new XMLHttpRequest()
    const method = 'GET'
    let x = document.getElementById('id_name').value
    const url = 'https://vectorrigs.herokuapp.com/api/createimageapi' + "?description_id=" + x
    const responseType = 'json'
    xhr.responseType = responseType
    xhr.open(method, url)
    xhr.onload = function () {
        const serverResponse = xhr.response
        console.log(serverResponse)
        let description_info = serverResponse.response

        let main_str = ''
        for (let i = 0; i < description_info.length; i++) {
            main_str += description_info[i].description_info
        }
        document.getElementById('id_description').innerText = main_str
    }
    xhr.send()
}

 function getSizes(){
        let x = document.getElementById('id_type').value
        const xhr = new XMLHttpRequest()
        const method = 'GET'
        const url = 'https://vectorrigs.herokuapp.com/api/createimageapi' + "?size_type="+ x
        console.log(url)
        const responseType = 'json'
        xhr.responseType = responseType
        xhr.open(method, url)
        xhr.onload = function () {
            const serverResponse = xhr.response
            let size_data = serverResponse.response
            console.log(size_data)
            let size_of_data = size_data.length
            console.log(size_of_data)
            let begining_str = '<option id="" value="" selected>Select a Size</option>'
            let main_str = ''

            for (let i = 0; i < size_of_data; i++) {
                    main_str += '<option value="'+ size_data[i].id +'">'+ size_data[i].size +'</option>'
            }
            console.log(main_str)
            document.getElementById('id_size').innerHTML = begining_str + main_str
        }
        xhr.send()
}

function setSizeDescription() {
        let final_str = document.getElementById('id_description').innerText
        console.log(final_str)
        const xhr = new XMLHttpRequest()
        const method = 'GET'
        let x = document.getElementById('id_size').value
        const url = 'https://vectorrigs.herokuapp.com/api/createimageapi' + "?size_description_id=" + x
        const responseType = 'json'
        xhr.responseType = responseType
        xhr.open(method, url)
        xhr.onload = function () {
            const serverResponse = xhr.response
            console.log(serverResponse)
            let description_info = serverResponse.response

            let main_str = ''
            for (let i = 0; i < description_info.length; i++) {
                main_str += description_info[i].description_info
            }
             final_str += main_str
            document.getElementById('id_description').innerText = final_str
        }
        xhr.send()
}


