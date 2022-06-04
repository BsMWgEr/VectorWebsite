
function createSearchURL() {
    let type = ''
    let name = ''
    let size = ''
    if (sessionStorage.getItem('type')) {
        type = sessionStorage.getItem('type')
        type = 'filter_by_type=' + type
    } else type = 'filter_by_type=none'
    if (sessionStorage.getItem('name')) {
        name = sessionStorage.getItem('name')
        name = '&filter_by_name=' + name
    } else name = ''
    if (sessionStorage.getItem('size')) {
        size = sessionStorage.getItem('size')
        size = '&filter_by_size=' + size
    }else size = ''
    return `?${type}${name}${size}`
}

function superFilter(filter_by, x) {

    let current_url = document.location.href
    let new_str = ''
    let url = ''
    if (filter_by === 'name') {
        for (let i = 0; i < x.length; i++) {
            if (x[i] === ' ') {
                new_str += '_'
            } else new_str += x[i]
        }
    }

    current_url = current_url.split('.')
    current_url = current_url[2].split('/')
    let str;
    switch (filter_by) {
        case 'type':
            sessionStorage.clear()
            sessionStorage.setItem('type', `${x}`)
            str = createSearchURL()
            break
        case 'name':
            sessionStorage.setItem('name', `${new_str}`)
            str = createSearchURL()
            break
        case 'size':
            sessionStorage.setItem('size', x)
            str = createSearchURL()
            break
        case 'display':
            str = `?display=all`
            sessionStorage.clear()
    }

    url = `https://vectorrigs.herokuapp.com/manager/${current_url[2]}/${str}`
    window.location.assign(url)

    console.log(filter_by,x, new_str, url)
}

function clearAllFilters() {
    sessionStorage.clear()
    let current_url = document.location.href.split('/')
    let new_url = `${current_url[0]}/${current_url[1]}/${current_url[2]}/${current_url[3]}/${current_url[4]}`
    console.log(current_url)
    window.location.assign(new_url)
}

