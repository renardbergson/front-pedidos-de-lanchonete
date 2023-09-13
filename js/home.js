// External modules
import {productsURL} from './url.js'
import {fetchAPI} from './fetch.js'

// Main
function home () {
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

export {home}