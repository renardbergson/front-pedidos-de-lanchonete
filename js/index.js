const _loginForm = document.querySelector('#loginForm')
const _newProductPrice = document.querySelector('#newProductPrice')
const _cancelOrderBtn = document.querySelector('#cancelOrderBtn')

if (_loginForm != null) {
    _loginForm.onsubmit = e => {
        e.preventDefault()
    
        if (_loginForm.userID.value === 'admin' && _loginForm.userPass.value === 'admin') {
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

if (_cancelOrderBtn != null) {
    _cancelOrderBtn.onclick = () => {
        const question = confirm('Tem certeza que deseja excluir este pedido?')
    
        if (question) {
            //...
        }
    }
}