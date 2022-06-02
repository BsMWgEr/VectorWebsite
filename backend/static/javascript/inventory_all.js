function superFilter(filter_by, x) {
    let current_url = document.location.href

    for (let i = 0; i < x.length; i++) {
        if (x[i] === ' ') {
            x[i] = '_'
        }
    }
    current_url = current_url.split('.')
    current_url = current_url[2].split('/')
    console.log(x)
    console.log(current_url)
    let url = `/manager/${current_url[2]}/?filter_by=${x}`
    console.log(url)
    window.location.assign(url)
    console.log(filter_by, x, url)
}