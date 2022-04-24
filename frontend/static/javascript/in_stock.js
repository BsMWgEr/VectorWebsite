    function Scroll() {
        if ((document.body.scrollTop > 300) || (document.documentElement.scrollTop > 300)) {
            document.getElementById('filter').className = 'filters';
        } else document.getElementById('filter').className = 'display-none';
    }

/*

{% if admin %}


    let change_display = document.getElementById('super-form')



    const gh = document.getElementById('super-div')
    let p1 = {selection: false, count: 0, id: 0}
    function superButton(x) {
        if (p1.count === 0 && p1.selection === false) {
            p1 = {selection: true, count: 1, id: x};
            document.getElementById('instock-main').className = 'instock-bg-red'
            document.getElementById('main').className = 'main-container-0margin'
            document.body.style.background = 'rgba(0,0,0,.5)'
            document.getElementById('container-' + x).className = 'border'
            gh.className = 'super-div'
            window.scrollBy(0, 800)

        } else if (p1.id !== x && p1.count === 1) {
            alert("Click your current edit item to close edit screen before editing a new item")
        }
        else {
            document.getElementById('container-' + x).className = 'container'
            document.getElementById('super-div').className = 'display-none'
            document.body.style.background = 'white'
            document.getElementById('instock-main').className = 'instock'
            document.getElementById('main').className = 'main-container'
            p1 = {selection: false, count: 0, id: 0}

        }
    }

    let name_display;
    function formatElement(element) {
        let d1;
        let d_name = element.name;
        let d_instock;

        if (element.description === "" || !element.description) {
              d1 = "NO!!!"
        } else d1 = element.description;
        if (element.type === "vector3")
            d_name = "Brand New Vector " + element.name
        name_display = element.name
        if (element.in_stock) {
            d_instock = "IN STOCK NOW"
        } else d_instock = element.due_date
        return "<div class='inner-container'>"
            + "<div class='container-left'><img src='./../../media/" + element.picture + "' height='140' width='212'>{% if x.sold %}<img class='sold-img' src='./../static/images/sold.gif'>{% endif %}</div>"
            + "<div id='selector' class='container-right'>"
            + "<h1 id='ee-id' class='ee-id'>" + element.id + "</h1>"
            + "<p  class='color-vector'>" + d_name + "</p>"
            + "<p>Serial #</p><p id='serial-number-description-" + element.id + "' class='color-vector'>" + element.serial_number + "</p>"
            + "<p>" + d_instock + "</p>"
            + "<p id='size-description-" + element.id + "' class='color-vector'>" + element.size + "</p>"
            + "<div id='description-info-" + element.id + "' class='description'>" + d1 + "</div>"
            + "<p>$</p>" + "<p id='price-decription-" + element.id + "' class='price-vector'>" + element.price + "</p>"
            + "<p id='po-number-description-" + element.id + "'>" + element.po_number + "</p>"
            + "<a class='color-vector' id='color-vector-a' href='./../../media/" + element.confirmation_r + "'>SEE CONFIRMATION REPORT</a>"
            + "</div>"
            + "</div>"
    }

    function noBorder(x) {
        document.getElementById('container-' + x).className = 'container'
    }

    function NameChange() {
        change_display.innerHTML =
            "<input class='id-input-superdiv' type='number' name='id' id='id'>"
            + "<input class='string-input-superdiv' type='text' name='name' id='name' placeholder='Enter Name'>"
            + "<button class='button-submit-superdiv' id='btn' type='submit'>Update Name</button>"
        document.getElementById('id').defaultValue = p1.id
        document.getElementById('name').defaultValue = document.getElementById('name-display-' + p1.id).innerHTML




    }

    function updateFields(event){
            event.preventDefault()
            let my_form = event.target
            const new_form = new FormData(my_form)
            const url = '/api'
            const method = 'POST'
            const xhr = new XMLHttpRequest()
            xhr.open(method, url)
            xhr.onload = function() {
                const serverResponse = xhr.response
                loadNewElement(my_form)

            }
            new_form.entries()
            console.log(new_form)
            xhr.send(new_form)
        }

    function loadNewElement(my_form) {
         const my_Form = my_form
         const new_form = new FormData(my_Form)
         const xhr = new XMLHttpRequest()
         const method = 'POST'
         const url = '/endpoint'
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
                 console.log(obj)
                 let current = formatElement(obj)
                 final_str += current
                 document.getElementById('container-' + obj.id).innerHTML = final_str

             }

         }
         new_form.entries()
         xhr.send(new_form)

     }


    function PriceChange() {
            change_display.innerHTML =
                "<input type='number' name='id' id='id' placeholder='Enter ID'>"
                + "<input type='text' name='price' id='price' placeholder='Enter Price'>"
                + "<button id='btn' type='submit'>Update Price</button>"
            document.getElementById('id').defaultValue = p1.id
            document.getElementById('price').defaultValue = document.getElementById('price-description-' + p1.id).innerHTML
    }

    function sizeChange() {
        change_display.innerHTML =
            "<input type='number' name='id' id='id' >"
            + "<input type='text' name='size' id='size' placeholder='Enter Size'>"
            + "<button id='btn' type='submit'>Update Size</button>"
        document.getElementById('id').defaultValue = p1.id
        document.getElementById('size').defaultValue = document.getElementById('size-description-' + p1.id).innerHTML

    }

    function dueDateChange() {
        change_display.innerHTML =
            "<input type='number' name='id' id='id' placeholder='Enter ID'>"
            + "<input type='text' name='due_date' id='due_date' placeholder='Change Due Date'>"
            + "<button id='btn' type='submit'>Update Due Date</button>"
        document.getElementById('id').defaultValue = p1.id
        document.getElementById('due_date').defaultValue = document.getElementById('due_date-description-' + p1.id).innerHTML
    }

     function descriptionChange() {
         change_display.innerHTML =
            "<input style='display: flex; float: top;' type='number' name='id' id='id' placeholder='Enter ID'>"
            + "<textarea  rows='4' cols='40' name='description' id='description' placeholder='Change Description'></textarea>"
            + "<button onmouseout='closeFields()' style='display: flex; float: top' id='btn' type='submit'>Update Description</button>"
         document.getElementById('id').defaultValue = p1.id
         document.getElementById('description').defaultValue = document.getElementById('description-info-' + p1.id).innerHTML
    }

    function inStockChange() {
        let x;
        let y;
        if (document.getElementById('p-instock-' + p1.id).innerHTML === 'IN STOCK NOW') {
            y = "checked";
            x = ""
        } else {
            x = "checked"
            y = "";
        }
        change_display.innerHTML =
            "<input type='number' name='id' id='id' placeholder='Enter ID'>"
            + "<label for='in_stock'>False</label> "
            + "<input type='radio' name='in_stock' id='in_stock' value='False' placeholder='Change In Stock' " + x + ">"
            + "<label for='in_stock'>True</label> "
            + "<input type='radio' name='in_stock' id='in_stock' value='True' placeholder='Change In Stock' " + y + ">"
            + "<button id='btn' onmouseout='closeFields()' type='submit'>Update In Stock</button>"
        document.getElementById('id').defaultValue = p1.id
    }

    function soldChange() {
        let x;
        let y;
        if (document.getElementById('sold-img-' + p1.id)) {
            y = "checked";
            x = ""
        } else {
            x = "checked"
            y = "";
        }
        change_display.innerHTML =
            "<input type='number' name='id' id='id' placeholder='Enter ID'>"
            + "<label for='sold'>False</label> "
            + "<input type='radio' name='sold' id='sold' value='False' placeholder='Change Sold' " + x + ">"
            + "<label for='sold'>True</label> "
            + "<input type='radio' name='sold' id='sold' value='True' placeholder='Change Sold' " + y + ">"
            + "<button id='btn' onmouseout='closeFields()' type='submit'>Update Sold</button>"
        document.getElementById('id').defaultValue = p1.id
        document.getElementById('sold-info-' + p1.id).innerHTML
    }

    function deleteContainer() {
        change_display.innerHTML =
            "<input class='d1' type='number' name='id' id='id' placeholder='Enter ID to Delete'>"
            + "<label class='d4' for='delete'>Check Box to DELETE Item #"
            + "<input class='d2' type='checkbox' name='delete' id='delete' value='True'> "
            + "<button class='d3' id='d3' onclick='alertM()' onmouseout='closeFields()' type='submit'>PERMANENT DELETE</button>"
        document.getElementById('id').defaultValue = p1.id
    }

    function SerialNumberChange() {
        change_display.innerHTML =
            "<input type='number' name='id' id='id' placeholder='Enter ID'>"
            + "<input type='text' name='serial_number' id='serial_number' placeholder='Enter Serial #'>"
            + "<button type='submit'>Change Serial #</button>"
        document.getElementById('id').defaultValue = p1.id
        document.getElementById('serial_number').defaultValue = document.getElementById('serial-number-' + p1.id).innerHTML
    }

    function ChangeImage() {

    }

    function ChangeConfirmFile() {

    }



    {% endif %}

*/