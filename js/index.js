const _loginForm = document.querySelector('#loginForm')
const _userSelector = document.querySelector('#userSelector')
const _newProductPrice = document.querySelector('#newProductPrice')

if (_userSelector != null) {
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
}

if (_loginForm != null) {
    _loginForm.onsubmit = e => {
        e.preventDefault()
    
        if (_loginForm.adminID.value === 'admin' && _loginForm.userPass.value === 'admin') {
            window.location.href = 'products-list-admin.html';
        }

        if (_loginForm.userID.value === 'teste@teste.com' && _loginForm.userPass.value === 'teste') {
            window.location.href = 'logged-user.html';
        }
    }
}

if (_newProductPrice != null) {
    const _pricePreview = document.querySelector('#pricePreview')

    _newProductPrice.oninput = e => {
        const price = +e.target.value
        
        _pricePreview.innerHTML = price.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})

        if (e.target.value > 80) {
            _pricePreview.innerHTML = 'preço acima do permitido'
        }

        if (e.target.value === '') {
            _pricePreview.innerHTML = ''
        }
    }
}