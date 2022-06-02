function superFilter(filter_by, x) {
    let current_url = document.location.href
    if (x.split(' ')) {
        x = ''
        for (let i = 0; i < x.length; i++) {
            x += '%' + x[i]
        }
    }
    current_url = current_url.split('.')
    current_url = current_url[2].split('/')
    console.log(x)
    console.log(current_url)
    let xhr = new XMLHttpRequest()
    xhr.open('GET', `/manager/${current_url[2]}/?filter_by=${x}`, false)
    xhr.send()
}