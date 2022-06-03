function superFilter(filter_by, x) {
    let current_url = document.location.href
    let current_url2 = document.location.href
    let new_str = ''
    let url = ''
    for (let i = 0; i < x.length; i++) {
        if (x[i] === ' ') {
            new_str += '_'

        } else new_str += x[i]
    }
    current_url = current_url.split('.')
    current_url = current_url[2].split('/')
    if (current_url[3] !== '') {
        current_url2 =  current_url2 + '&'
    } else current_url2 += '?'
    console.log(x)
    console.log(current_url)
    if (filter_by === 'type') {
        url = `${current_url2}filter_by=${filter_by}&value=${new_str}`
    } else url = `${current_url2}filter_by=${filter_by}&value=${new_str}`
    console.log(url)
    window.location.assign(url)
    console.log(filter_by, new_str, url, current_url2)
}

function clearAllFilters() {
    let current_url = document.location.href.split('/')
    let new_url = `${current_url[0]}/${current_url[1]}/${current_url[2]}/${current_url[3]}/${current_url[4]}`
    console.log(current_url)
    window.location.assign(new_url)
}

