const baseURL = 'https://vectorrigs.herokuapp.com'
let policyURL = baseURL + '/api/upload-api/'

let crsfToken = document.querySelector('#uploadForm input[name=csrfmiddlewaretoken]').value

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
            + "<button class='inputs' onclick='closeFields()' id='btn' type='submit'>Update Confirmation Report</button>"
        for (let i = 0; i < response_size; i++) {
            final_str = final_str + "<option value='" +  serverResponse4.response[i].id + "'>" + serverResponse4.response[i].name + "</option>"
        }
        document.getElementById('change-display').innerHTML = str_start + final_str + str_end



    }
    fxhr.send()
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
            + "<button class='inputs' onclick='closeFields()' id='btn' type='submit'>Update Picture</button>"
        for (let i = 0; i < response_size; i++) {
            final_str = final_str + "<option value='" +  serverResponse4.response[i].id + "'>" + serverResponse4.response[i].name + "</option>"
        }
        document.getElementById('change-display').innerHTML = str_start + final_str + str_end


    }
    fxhr.send()
}



function validateFileType(fileItem) {

    let fileType = fileItem.type // image/png image/jpeg
    let rootType = fileType.split("/")[0]
    switch (rootType) {
        case 'image':  // rootType === "image"
            return true
        case 'video':
            return true
        case 'audio':
            return true
        default:
            return true
    }
}

function fileInputChanged(){
    // console.log('changed')

    let fileInput = document.getElementById('files')
    let filesList = fileInput.files
    let displayListDiv = document.getElementById('displayList')

    for (let i = 0; i < filesList.length; i++) {
        let fileItem = filesList[i]
        let isValid = validateFileType(fileItem)
        if (isValid){
            let liItem = document.createElement("li") // <li></li>
            let content = document.createTextNode(fileItem.name + " " + fileItem.size)
            liItem.appendChild(content)
            let listLength = document.querySelectorAll("#displayList li").length
            let uploadID = listLength  + 1
            liItem.setAttribute('id', "file-upload-id-" + uploadID)

            displayListDiv.appendChild(liItem)
            // get policy and upload file
            fileItem.uploadID = uploadID
            fileItem.uploadListElID = "file-upload-id-" + uploadID

            getPolicyAndUpload(fileItem)

        }
    }
}



function getPolicyAndUpload(fileItem) {

    // data
    let data = {
        name: fileItem.name,
        raw_filename: fileItem.name,
        filetype: fileItem.type
    }
    let jsonData = JSON.stringify(data)

    let xhr = new XMLHttpRequest() // async request
    // how are send it?
    let k = fileItem.name

    xhr.open("POST", policyURL + "?=" + k, true)
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.setRequestHeader('X-CSRFTOKEN', crsfToken)
    xhr.onload = function() {
        if (xhr.status === 200) {
            // do something
            let policyResponseData = JSON.parse(xhr.responseText)

            // actual perfom upload for this single file
            usePolicyAndUpload(fileItem, policyResponseData)



        } else {
            console.log(xhr.responseText)
            alert("File upload failed")
        }
    }
    console.log(jsonData)
    xhr.send(jsonData)

}

function constructFormData(policy, fileItem) {
    let fd = new FormData() // multipart form
    let policyFields = policy.fields
    let objectEntries = Object.entries(policyFields)
    for ( const [key, value] of  objectEntries){
        fd.append(key, value)

    }
    return fd
}

function CreateImage(file_item){
    file_name = {key: file_item.name}
    const xhr = new XMLHttpRequest()
    const method = 'GET'
    const url = 'https://vectorrigs.herokuapp.com/api/createimageapi'
    const responseType = 'json'
    xhr.responseType = responseType
    xhr.open(method, url)
    xhr.onload = function () {
        const serverResponse = xhr.response
    }
    xhr.send(file_name)
}

function usePolicyAndUpload(fileItem, policyData){
    let fd = constructFormData(policyData, fileItem)
    fd.append('file', fileItem)
    let awsEndpoint = policyData.url
    let awsUploadKey = ""
    if (fileItem.type === "image/jpeg") {
        awsUploadKey = "static/images/" + fileItem.name
    } else {awsUploadKey = "static/confirmation_reports/" + fileItem.name}
    console.log(fileItem)
    console.log(policyData)



    let xhr = new XMLHttpRequest()
    fileItem.xhr = xhr
    //fileItem.xhr.abort()


    xhr.open('POST', awsEndpoint, true)
    xhr.onload = function() {
    }

    xhr.upload.onloadstart = function (event) {
        console.log("Uploading started.")
    }
    xhr.upload.onprogress = function (event) {
        let loaded = event.loaded
        let total = event.total
        let progress = Math.floor(loaded / total * 100)
        console.log("progress", Math.floor(loaded / total * 100))

        let listElementId = fileItem.uploadListElID
        let liItem = document.getElementById(listElementId)
        liItem.innerText = awsUploadKey + " " + fileItem.size + " " + progress + "%"
        liItem.setAttribute('class', 'w-' + progress)


    }

    xhr.upload.onload = function() {
        console.log(xhr.status, xhr.responseText, awsUploadKey)
        // let django know that it's done.
        // put request, key
        let djHR = new XMLHttpRequest()
        let method = 'PUT'
        let djUpdateData = {key: awsUploadKey}
        let djJsonUpdateData = JSON.stringify(djUpdateData)
        djJsonUpdateData = djJsonUpdateData
        djHR.open(method, policyURL, true)
        djHR.setRequestHeader('Content-Type', 'application/json')
        djHR.setRequestHeader('X-CSRFTOKEN', crsfToken)
        djHR.onload = function() {
            if (djHR.status === 200) {
                // do something

                let listElementId = fileItem.uploadListElID
                let liItem = document.getElementById(listElementId)
                liItem.innerText = awsUploadKey + " " + fileItem.size + " done. 100%"
                liItem.setAttribute('class', 'w-done')
                document.getElementById('file-url').innerHTML = '<a target="_blank" href=https://stockvectorrigs.s3.amazonaws.com/' + awsUploadKey + '>New Image File!!!</a>'

            } else {
                alert("Django update failed")
            }
            getUploadListPict()
        }
        console.log(djJsonUpdateData)
        djHR.send(djJsonUpdateData)

    }

    xhr.upload.addEventListener("error", function(event){
        alert("An error occurred on upload.")
    })
    // xhr.abort()
    xhr.upload.onabort = function (event) {
        console.log("File aborted")
    }
    console.log(fd)
    xhr.send(fd)
}