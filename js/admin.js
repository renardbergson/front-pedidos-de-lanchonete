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
    
                    <button class="deleteItemBtn" data-id=${product._id}>
                        <i class="fa-solid fa-trash-can"></i>
                        Excluir
                    </button>
                </div>
            `
            _productsListAdmin.innerHTML = HTML
            
            const _deleteItemBtns = document.querySelectorAll('.deleteItemBtn')
            deleteProduct(_deleteItemBtns)
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
            alert('Existem campos em branco!')
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

// Delete product
function deleteProduct (btns) {
    if (btns) {
        btns.forEach(btn => {
            btn.onclick = function () {
                const previousProducts = [
                '64ebd44070cf299b6255e2d1', 
                '64f08925e0f3b5acaf26b3de', 
                '64f0892de0f3b5acaf26b3df',
                '64f08930e0f3b5acaf26b3e0',
                '64f08934e0f3b5acaf26b3e1',
                '64f08937e0f3b5acaf26b3e2']

                if (previousProducts.includes(this.dataset.id)) {
                    alert('Não é possível excluir os produtos de exemplo! Insira um produto novo.')
                } else {
                    const question = confirm('Deseja mesmo excluir este produto')

                    if (question) {
                        fetchAPI('DELETE', productsURL, this.dataset.id, data => {
                            if (data === 'product succesfully removed') {
                                alert('Produto excluido da base de dados com sucesso!')
                                location.reload()
                            }
                        })
                    } else {
                        return
                    }
                }
            }
        })
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
    
                    <button class="deleteCustomerBtn" data-id=${customer._id}>
                        <i class="fa-solid fa-trash-can"></i>
                        Excluir
                    </button>
                </div>
            `
            _clientsListAdmin.innerHTML = HTML

            const _deleteCustomerBtns = document.querySelectorAll('.deleteCustomerBtn')
            deleteCustomer(_deleteCustomerBtns)
        })
    })
}

// Delete Customer
function deleteCustomer (btns) {
    btns.forEach(btn => {
        btn.onclick = function () {
            const previousCustomers = [
                '64f780b10bcbf9e4c7ba4b0c',
                '64f78b0b0bcbf9e4c7ba4b0d',
                '64f78ced0bcbf9e4c7ba4b0e',
                '64f78e300bcbf9e4c7ba4b10'
            ]

            if (previousCustomers.includes(this.dataset.id)) {
                alert('Não é possível excluir os clientes de exemplo! Cadastre um cliente novo.')
            } else {
                const question = confirm('Deseja mesmo excluir este cliente?')

                if (question) {
                    fetchAPI('DELETE', customersURL, this.dataset.id, data => {
                        if (data === 'customer succesfully removed') {
                            alert('Cliente excluido da base de dados com sucesso!')
                            location.reload()
                        }
                    })
                } else {
                    return
                }
            }
        }
    })
}

export {listProduts, addNewProduct, deleteProduct, listCustomers}