// URL's
const listProductsURL = 'http://localhost:8080/products'
const listCustomersURL = 'http://localhost:8080/customers'

// INDEX - List Items
document.body.onload = () => {    
    const _products = document.querySelector('#products')
    let productsHTML = ''

    if (_products != null) {
        fetch(listProductsURL)
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

// Login
const _loginForm = document.querySelector('#loginForm')
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

// cancel order
const _cancelOrderBtns = document.querySelectorAll('.cancelOrderBtn')
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

// List Products - ADMIN
const _listProductsAdmin = document.querySelector('#listProductsAdmin')
if (_listProductsAdmin) {
    const _productsListAdmin = document.querySelector('#products-list-admin')
    let HTML = ''

    fetch(listProductsURL)
    .then(response => response.json())
    .then(data => data.forEach(product => {
        HTML += `
            <div class="product">
                <img src="https://boracolorir.com.br/wp-content/uploads/2022/02/desenhos-de-comida-para-colorir-3.jpg" alt="foto de lanche" class="productPreview">

                <div class="productTablePart">
                    <h4>Nome</h4>
                    <p class="productName">${product.name}</p>
                </div>

                <div class="productTablePart">
                    <h4>Descrição</h4>
                    <p class="productDescription">${product.description}</p>
                </div>

                <div class="productTablePart">
                    <h4>Preço</h4>
                    <span class="productPrice">${product.price.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</span>
                </div>

                <div class="productTablePart">
                    <h4>Código</h4>
                    <span class="productCode">${product._id}</span>
                </div>

                <button class="deleteItemBtn">
                    <i class="fa-solid fa-trash-can"></i>
                    Excluir
                </button>
            </div>
        `

        _productsListAdmin.innerHTML = HTML
    }))
}

// List Customers - ADMIN
const _listCustomersAdmin = document.querySelector('#listCustomersAdmin')
if (_listCustomersAdmin) {
    const _clientsListAdmin = document.querySelector('#clients-list-admin')
    let HTML = ''

    fetch(listCustomersURL)
    .then(response => response.json())
    .then(data => data.forEach(customer => {
        HTML += `
            <div class="client">
                <div class="clientTablePart">
                    <h4>Nome</h4>
                    <p class="clientName">${customer.name}</p>
                </div>

                <div class="clientTablePart">
                    <h4>E-mail</h4>
                    <p class="clientMail">${customer.email}</p>
                </div>

                <div class="clientTablePart">
                    <h4>Telefone</h4>
                    <span class="clientPhone">${customer.phone}</span>
                </div>

                <div class="clientTablePart">
                    <h4>Rua</h4>
                    <span class="clientStreet">${customer.street}</span>
                </div>

                <div class="clientTablePart">
                    <h4>Número</h4>
                    <span class="clientNumber">${customer.number}</span>
                </div>

                <div class="clientTablePart">
                    <h4>Bairro</h4>
                    <span class="clientNeighborhood">${customer.neighborhood}</span>
                </div>

                <button class="deleteItemBtn">
                    <i class="fa-solid fa-trash-can"></i>
                    Excluir
                </button>
            </div>
        `
        _clientsListAdmin.innerHTML = HTML
    }))
}

// Post new product
const _newProductPrice = document.querySelector('#newProductPrice')
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