// URL's
const productsURL = 'http://localhost:8080/products'
const customersURL = 'http://localhost:8080/customers'

// External modules
import {fetchAPI} from './fetch.js'

// BODY
const _index = document.querySelector('#index')
const _login = document.querySelector('#login')
const _loggedUser = document.querySelector('#loggedUser')
const _listProductsAdmin = document.querySelector('#listProductsAdmin')
const _addNewProductAdmin = document.querySelector('#addNewProductAdmin')
const _listCustomersAdmin = document.querySelector('#listCustomersAdmin')

// =============================== LOGIN ===============================
if (_login) {
    const _loginForm = document.querySelector('#loginForm')
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

// ============================== PRODUCTS ==============================
// GET - Index
if (_index) {
    const _products = document.querySelector('#products')
    let productsHTML = ''

    fetchAPI('GET', productsURL, null, data => {
        data.forEach(product => {
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
    
            const _getItemBtns = document.querySelectorAll('.getItemBtn')
    
            _getItemBtns.forEach(btn => {
                btn.onclick = () => {alert('Quase lá! Faça login para continuar!')}
            })
        })
    })
}

// GET / POST - (logged user)
if (_loggedUser) {
    const _products = document.querySelector('#products')
    let productsHTML = ''

    fetchAPI('GET', productsURL, null, data => {
        data.forEach(product => {
            productsHTML += `
                <div class="product">
                    <img src="https://boracolorir.com.br/wp-content/uploads/2022/02/desenhos-de-comida-para-colorir-3.jpg" alt="foto de lanche" class="productPreview">
    
                    <div class="productDetails">
                        <h4 class="productTitle">${product.name}</h4>
    
                        <p class="productDescription">${product.description}</p>
    
                        <p>Valor <span class="productPrice">${product.price.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</span> </p>
                    </div>
    
                    <button class="getItemBtn" data-id=${product._id}>Peça Já!</button>
                </div>
            `
            _products.innerHTML = productsHTML
    
            const _getItemBtns = document.querySelectorAll('.getItemBtn')
    
            _getItemBtns.forEach(button => {
                button.onclick = function () {
                    const _main = document.querySelector('#main')
                    const _posOrderSplash = document.querySelector('#posOrderSplash')
                    const _gotItBtn = document.querySelector('#gotItBtn')
        
                    _main.classList.add('almostHidden')
                    _posOrderSplash.classList.add('visible')
            
                    _gotItBtn.onclick = () => {
                        _posOrderSplash.classList.remove('visible')
                        _main.classList.remove('almostHidden')
                    }
                }  
            })
        })
    })
}

// GET - (admin)
if (_listProductsAdmin) {
    const _productsListAdmin = document.querySelector('#products-list-admin')
    let HTML = ''

    fetchAPI('GET', productsURL, null, data => {
        data.forEach(product => {
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
        })
    })
}

// POST - (admin)
if (_addNewProductAdmin) {
    const _newProductForm = document.querySelector('#newProductForm')
    const _newProductPrice = document.querySelector('#newProductPrice')
    const _pricePreview = document.querySelector('#pricePreview')

    // price preview
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

    // submit
    _newProductForm.onsubmit = e => {
        e.preventDefault()

        const name = _newProductForm.newProductName.value
        const price = _newProductForm.newProductPrice.value
        const description = _newProductForm.newProductDescription.value

        const product = {name, price, description}

        if (!name || !price || !description) {
            return
        } else {
            fetchAPI('POST', productsURL, product, data => {
                if (data === 'product succesfully sent') {
                    _newProductForm.reset()
                    _pricePreview.innerHTML = ''
                    alert('Produto cadastrado com sucesso!')
                }
            })
        }
    }
}

// cancel order
if (_loggedUser) {
    const _cancelOrderBtns = document.querySelectorAll('.cancelOrderBtn')

    _cancelOrderBtns.forEach(button => {
        button.onclick = () => {
            const question = confirm('Tem certeza que deseja excluir este pedido?')
        
            if (question) {
                console.log('pedido excluido')
            }
        }
    })
}

// ============================== CUSTOMERS ==============================
// GET - (admin)
if (_listCustomersAdmin) {
    const _clientsListAdmin = document.querySelector('#clients-list-admin')
    let HTML = ''

    fetchAPI('GET', customersURL, null, data => {
        data.forEach(customer => {
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
        })
    })
}