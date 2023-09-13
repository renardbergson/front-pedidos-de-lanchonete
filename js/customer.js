// external modules
import {productsURL} from './url.js'
import {fetchAPI} from './fetch.js'

// list products
function listProducts () {
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

function cancelOrder () {
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

export {listProducts, cancelOrder}