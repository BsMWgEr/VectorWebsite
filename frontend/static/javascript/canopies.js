function Scroll() {
        if ((document.body.scrollTop > 300) || (document.documentElement.scrollTop > 300)) {
            document.getElementById('filter').className = 'filters';

        } else {
            document.getElementById('filter').className = 'display-opac';

        }
        if ((document.body.scrollTop > 1000) || (document.documentElement.scrollTop > 1000)) {
            document.getElementById('filter2').className = 'filters2';
        } else document.getElementById('filter2').className = 'display-none';
    }

    function navHover() {

    }
