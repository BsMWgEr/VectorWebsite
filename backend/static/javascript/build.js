/*

    Main Functions for BUILD PAGE which are not specific to a Section

 */

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

    let serial_number_;
    let serial_number_display;
    let sold_display;

    function openUpdateBtn() {
        document.getElementById('display_update-btn').className = 'btnchanger'
        document.getElementById('display_sold-btn').className = 'btnchanger'
        document.getElementById('display_shipping-btn').className = 'btnchanger'
    }


    function closeUpdateBtn() {
        document.getElementById('display_update-btn').className = 'none'
        document.getElementById('display_sold-btn').className = 'none'
        document.getElementById('display_shipping-btn').className = 'none'
    }


// This Function is the end process of the Build and Update forms
// This takes in updated and processed server response data which orginates from the DB
// THis organizes the data into the graphical container on page dynamically
    function formatElement(element) {

         if (element.serial_number === 0) {
            serial_number_display = 'Serial # TBD'
         } else {
             serial_number_display = "Serial #: " + element.serial_number
             serial_number_ = element.serial_number
         }

         let confirmation_report = ""
         let confirmation_report2 = "<p id='p-tag-confirmation_r'>Confirmation Report: None</p>"
         if (element.confirmation_r !== "null") {
             confirmation_report = "<a class='color-vector' id='color-vector-a' href='https://stockvectorrigs.s3.amazonaws.com/static/" + element.confirmation_r + "'>SEE CONFIRMATION REPORT</a>"
             confirmation_report2 = "<p id='p-tag-confirmation_r'>Confirmation Report: " + element.confirmation_r + "</p>"
         }
         openUpdateBtn()

         return "<div class='container' onclick='closeFields()'>"
            + "<div class='inner-container'>"
            + "<div class='container-left'><img src='https://stockvectorrigs.s3.amazonaws.com/static/" + element.picture + "' height='140' width='212'></div>"
            + "<div id='selector' class='container-right'>"
            + "<p id='name-display' class='color-vector'>" + element.name + "</p>"
            + "<p class='color-vector'>" + serial_number_display + "</p>"
            + "<p id='p-instock'>In Stock: " + element.in_stock + "</p>"
            + "<p id='due-date-info'>Due: " + element.due_date + "</p>"
            + "<p id='size-info' class='color-vector'>" + element.size + "</p>"
            + "<div id='desc-info' class='description'>" + element.description + "</div>"
            + "<p>$</p><p id='price-info' class='price-vector'>" + element.price + "</p>"
            + "<p>Due On : " + element.due_date + "</p>"
            + "<p>PO #: </p><p id='po-number-info'>" + element.po_number + "</p>"
            + confirmation_report
            + "</div>"
            + "</div>"
            + "</div>"
            + "<div class='bottom-display' id='div-box'>"
            + "<h1 id='h1-info-tag'>Current Build: ID# </h1><h1 id='e-id'>" + element.id + "</h1>"
            + "<h1 class='stocking-tag' id='gh2'>ITEM IN-STOCK: " + element.in_stock + "</h1>"
            + "<p>Item ID #: " + element.id + "</p>"
            + "<p id='element-object-id'>" + element.object_id + "</p>"
            + "<p class='serial-tag' id='gh1'>" + serial_number_display + "</p>"
            + "<p>Type: " + element.type + "</p>"
            + "<p id='p-tag-name'>Name: " + element.name + "</p>"+ "<p id='p-tag-size'>Size: " + element.size + "</p>" + "Due Date:<p id='due-date-info-raw'>" + element.due_date + "</p>"
            + confirmation_report2 + "<p id='p-tag-picture'>Picture File: " + element.picture + "</p>"
            + "<p>Description: " + element.description + "</p>"
             + "<p>PO Number: " + element.po_number + "</p>"
            + "</div>"

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
        document.getElementById('create-form-upload-btns').className = 'none'
        document.getElementById('display-form-btn').className = 'btnchanger'
        document.getElementById('create-form-upload-btns').className = 'none'
        document.getElementById('create-upload-div').innerHTML = ''
        document.getElementById('container-main').style.marginLeft = '2%'
        document.getElementById('container-main').style.maxWidth = '100%'
        document.getElementById('display-right').style.marginLeft = '0px'
    }

    function openCreateForm() {
        document.getElementById('item-update-btn-group').className = 'item-update-btn-group'
        document.getElementById('create-form').className = 'div-form'

    }

    function closeUpdateGroup() {
        document.getElementById('item-update-btn-group').className = 'none'
        document.getElementById('container-display').innerHTML = ''
        document.getElementsByClassName('display_update-btn').className = 'btnchanger'

    }

    function openUpdateGroup() {
        closeCreateForm()
        document.getElementById('item-update-btn-group').className = 'item-update-btn-group'
        document.getElementById('sold-update-btn-group').className = 'none'
        document.getElementById('shipping-update-btn-group').className = 'none'
        document.getElementsByClassName('display_update-btn').className = 'none'

    }

    function openSoldGroup() {
        closeCreateForm()
        document.getElementById('item-update-btn-group').className = 'none'
        document.getElementById('sold-update-btn-group').className = 'item-update-btn-group'
        document.getElementById('shipping-update-btn-group').className = 'none'

    }

    function closeUpdateGroups() {
        document.getElementById('item-update-btn-group').className = 'none'
        document.getElementById('sold-update-btn-group').className = 'none'
        document.getElementById('shipping-update-btn-group').className = 'none'
    }

    function openShippingGroup() {
        closeCreateForm()
        document.getElementById('item-update-btn-group').className = 'none'
        document.getElementById('sold-update-btn-group').className = 'none'
        document.getElementById('shipping-update-btn-group').className = 'item-update-btn-group'

    }

    function alertM() {
        alert('Container Deleted!')
    }

    function uploadFormDisplay() {
        document.getElementById('uploadForm').className = 'uploadForm'
    }

    function uploadFormOff() {
        document.getElementById('uploadForm').className = 'none'
    }


    function createFormUploadBtns() {
        document.getElementById('create-form-upload-btns').className = 'create-form-upload-btns'
        document.getElementById('create-upload-div').innerHTML = "<div id='displayList'>"
                + "<p>Upload List</p>"
                + "<div id='file-url'></div>"
                + "</div>"
    }

    function openSoldDiv() {
        document.getElementById('div-build-sold_customer').className = 'div-build-sold_customer'
    }







