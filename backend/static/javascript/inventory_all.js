function superFilter(filter_by, value) {
    let current_url = document.location.href
    current_url = current_url.split('.')
    current_url = current_url[2].split('/')
    let xhr = new XMLHttpRequest()
    xhr.responseType = 'json'
    xhr.open('GET', `/manager/${current_url[2]}/?filter_by=${value}`)
    xhr.send()
}