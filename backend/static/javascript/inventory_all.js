function superFilter(filter_by, x) {
    let current_url = document.location.href
    let new_str = ''
    for (let i = 0; i < x.length; i++) {
        if (x[i] === ' ') {
            new_str += '_'

        } else new_str += x[i]
    }
    current_url = current_url.split('.')
    current_url = current_url[2].split('/')
    console.log(x)
    console.log(current_url)
    let url = `/manager/${current_url[2]}/?filter_by=${new_str}`
    console.log(url)
    window.location.assign(url)
    console.log(filter_by, new_str, url)
}