
function loadNewUserForm(x) {
    localStorage.setItem('inventoryitem', x.toString())
    window.location.assign('https://vectorrigs.herokuapp.com/users/register/')
}
