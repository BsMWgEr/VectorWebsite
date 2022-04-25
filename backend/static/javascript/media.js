const baseURL = 'https://vectorrigs.herokuapp.com'
let policyURL = baseURL + '/api/upload-api/'
let crsfToken = document.querySelector('#uploadForm input[name=csrfmiddlewaretoken]').value
let fileInput = document.getElementById('files')
fileInput.addEventListener('change', fileInputChanged)

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
            return false
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



function getPolicyAndUpload(fileItem){

    // data
    let data = {
        name: fileItem.name,
        raw_filename: fileItem.name,
        filetype: fileItem.type
    }
    let jsonData = JSON.stringify(data)

    let xhr = new XMLHttpRequest() // async request
    // how are send it?

    xhr.open("POST", policyURL, true)
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
    let x = fileItem
    let fd = new FormData() // multipart form
    let policyFields = policy.fields
    let objectEntries = Object.entries(policyFields)
    console.log(objectEntries)
    for ( let [key, value] of  objectEntries){
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
    policyData.key = fileItem.name
    console.log(policyData.key)
    let fd = constructFormData(policyData, fileItem)
    fd.append('file', fileItem)
    let awsEndpoint = policyData.url
    let awsUploadKey = "static/images/" + fileItem.name
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


