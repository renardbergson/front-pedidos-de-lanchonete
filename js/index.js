const _loginForm = document.querySelector('#loginForm')
const _newProductPrice = document.querySelector('#newProductPrice')
const _cancelOrderBtns = document.querySelectorAll('.cancelOrderBtn')

// INDEX - List Items
document.body.onload = () => {    
    const _products = document.querySelector('#products')
    let productsHTML = ''

    if (_products != null) {
        fetch('http://localhost:8080/products')
        .then(response => response.json())
        .then(data => data.forEach(product => {
            productsHTML += `
                <div class="product">
                    <img src="https://boracolorir.com.br/wp-content/uploads/2022/02/desenhos-de-comida-para-colorir-3.jpg" alt="foto de lanche" class="productPreview">
    
                    <div class="productDetails">
                        <h4 class="productTitle">${product.name}</h4>
    
                        <p class="productDescription">${product.description}</p>
    
                        <p>Valor <span class="productPrice">${product.price.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</span> </p>
                    </div>
    
                    <button class="getItemBtn">Peça Já!</button>
                </div>
            `
            _products.innerHTML = productsHTML

            getItem()
        }))
    }
}

// Get Item 
function getItem () {
    const _getItemBtns = document.querySelectorAll('.getItemBtn')

    _getItemBtns.forEach(button => {
        button.onclick = () => {
            const _main = document.querySelector('#main')
            const _posOrderSplash = document.querySelector('#posOrderSplash')
            const _gotItBtn = document.querySelector('#gotItBtn')

            if (_main) {
                _main.classList.add('almostHidden')
                _posOrderSplash.classList.add('visible')
        
                _gotItBtn.onclick = () => {
                    _posOrderSplash.classList.remove('visible')
                    _main.classList.remove('almostHidden')
                }
            }
        }  
    })
}

// Login
if (_loginForm != null) {
    const _togglePassBtn = document.querySelector('#togglePassBtn')
    let state = false
    
    _togglePassBtn.onclick = () => {
        const password = _loginForm.userPass

        if (state === false) {
            state = true
            password.type = 'text'
            _togglePassBtn.firstElementChild.style.display = 'none'
            _togglePassBtn.lastElementChild.style.display = 'block'
        } else {
            password.type = 'password'
            state = false
            _togglePassBtn.firstElementChild.style.display = 'block'
            _togglePassBtn.lastElementChild.style.display = 'none'
        }
    }

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

// Post new product
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

// cancel order
if (_cancelOrderBtns != null) {
    _cancelOrderBtns.forEach(button => {
        button.onclick = () => {
            const question = confirm('Tem certeza que deseja excluir este pedido?')
        
            if (question) {
                console.log('pedido excluido')
            }
        }
    })
}