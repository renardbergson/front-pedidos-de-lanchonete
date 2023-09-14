//external modules
import {productsURL, customersURL} from './url.js'
import {fetchAPI} from './fetch.js'

// List products
function listProduts () {
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

// New Product
function addNewProduct () {
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

// List Customers
function listCustomers () {
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

export {listProduts, addNewProduct, listCustomers}