 let navigation = false
function ScrollingNavBar() {
    if (document.documentElement.scrollTop === 100 || document.body.scrollTop === 100) {
        window.scroll(0,110)
    }
    if (!navigation) {
        if (document.documentElement.scrollTop >= 100 || document.body.scrollTop >= 100) {
            document.getElementById('nav-button').className = 'nav-button'
            document.getElementById('left-nav').className = 'none'
            document.getElementById('nav-home').className = 'nav-container2'
            document.getElementById('links').className = 'links3'
            document.getElementById('logo-div').className = 'logo3'
            document.getElementById('phone-number').className = 'phone-number3'
            document.getElementById('f-book').className = 'f-book3'
            document.getElementById('login').className = 'none'
            document.getElementById('sidebar-search').className = 'sidebar-search2'

        } else {
            document.getElementById('left-nav').className = 'left-nav'
            document.getElementById('nav-button').className = 'none'
            document.getElementById('nav-home').className = 'nav-container'
            document.getElementById('links').className = 'links'
            document.getElementById('logo-div').className = 'logo'
            document.getElementById('phone-number').className = 'phone-number'
            document.getElementById('f-book').className = 'f-book'
            document.getElementById('login').className = 'login'
            document.getElementById('sidebar-search').className = 'sidebar-search'

        }
    }
}

function NavButton() {
    navigation = true
    if (document.getElementById('left-nav').className === 'none') {
        document.getElementById('nav-home').className = 'nav-container3'
        document.getElementById('left-nav').className = 'left-nav3'
        document.body.style.backgroundColor = 'black'
        document.getElementById('nav-button').innerHTML = 'Close Navigation'



    } else {
        document.getElementById('nav-button').innerHTML = '<p>NAVIGATION</p>'
        document.body.style.backgroundColor = 'white'
        navigation = false
        document.getElementById('left-nav').className = 'none'
        document.getElementById('nav-button').className = 'nav-button'
        document.getElementById('nav-home').className = 'nav-container2'

    }
}

function CloseSidebarScroll() {
    document.body.style.backgroundColor = 'white'
    navigation = false
    document.getElementById('left-nav').className = 'none'
    document.getElementById('nav-button').className = 'nav-button'
    document.getElementById('nav-home').className = 'nav-container2'
}

function closeNavButton() {
    document.getElementById('nav-home').style.display = 'none'
    document.getElementById('close-mobile-nav-button').className = 'none'

}

function openNavButton() {
    document.getElementById('nav-home').style.display = 'block'
    document.getElementById('close-mobile-nav-button').className = 'close-mobile-nav-btn'
}

 function pageSizer() {
    if (window.screen.width < 900) {
        document.getElementById('open-mobile-nav-button').className = 'open-mobile-nav-btn'
        let new_element = document.createElement('div')
        document.getElementById('mobile_nav').append(new_element)
        let button_element = document.getElementById('open-mobile-nav-button')
        document.getElementById('mobile_nav').className = 'mobile-nav'
        new_element.appendChild(button_element)



    } else {
        document.getElementById('open-mobile-nav-button').className = 'none'
    }
}