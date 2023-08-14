const _loginForm = document.querySelector('#loginForm')
const _userSelector = document.querySelector('#userSelector')

_userSelector.onchange = () => {
    const _adminField = document.querySelector('#adminField')
    const _userField = document.querySelector('#userField')
    const _loginInputFields = document.querySelectorAll('.loginInputField')

    _loginInputFields.forEach(item => {item.value = ''})

    if (_userSelector.value === 'user') {
        _adminField.style.display = 'none'
        _userField.style.display = 'block'
    } 

    if (_userSelector.value === 'admin') {
        _userField.style.display = 'none'
        _adminField.style.display = 'block'
    }
}

_loginForm.onsubmit = e => {
    e.preventDefault()

    if (_loginForm.userID.value === 'admin' && _loginForm.userPass.value === 'admin') {
        window.location.href = 'products-list-admin.html';
    }
}