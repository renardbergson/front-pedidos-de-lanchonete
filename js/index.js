// =================================== URL's ==================================
const productsURL = 'http://localhost:8080/products'
const customersURL = 'http://localhost:8080/customers'

// =================================== BODY ===================================
// Home
const $index = document.querySelector('#index')
if ($index) {
    logOut()
    buildProductsHTML(null)
}

// Login
const $login = document.querySelector('#login')
if ($login) {
    logOut()
    loginControl()
}

// SignUp
const $signUp = document.querySelector('#signUp')
if ($signUp) {
    logOut()
    signUp()
}

// Logged User
const $loggedUser = document.querySelector('#loggedUser')
if ($loggedUser) {
    isLogged(redirect.bind(buildProductsHTML.bind('logged')))
}

// My Orders
const $myOrders = document.querySelector('#myOrders')
if ($myOrders) {
    isLogged(redirect.bind(buildMyOrders))
} 

// List Products ADM
const $listProductsAdmin = document.querySelector('#listProductsAdmin')
if ($listProductsAdmin) {
    isLogged(redirect.bind(buildProductsADM))
}

// Add New Product ADM
const $addNewProductAdmin = document.querySelector('#addNewProductAdmin')
if ($addNewProductAdmin) {
    isLogged(redirect.bind(addNewProductADM))
}

// List Customers ADM
const $listCustomersAdmin = document.querySelector('#listCustomersAdmin')
if ($listCustomersAdmin) {
    isLogged(redirect.bind(listCustomersADM))
}

// ============================== MAIN FUNCTIONS ==============================
async function fetchAPI (method, url, item, callback) {
    if (method === 'GET') {
        const response = await fetch(url)
        const data = await response.json()
        
        callback ? callback(data) : null
    }

    if (method === 'POST') {
        const response  = await fetch(url, {
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify(item)
        })
        const data = await response.json()

        callback ? callback(data) : null
    }

    if (method === 'PUT') {
        const response  = await fetch(url, {
            method: 'PUT',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify(item)
        })
        const data = await response.json()

        callback ? callback(data) : null
    }

    if (method === 'DELETE') {
        const response = await fetch(`${url}/${item}`, {method: 'DELETE'})
        const data = await response.json()

        callback ? callback(data) : null
    }
}

function loginControl () {
    const $loginForm = document.querySelector('#loginForm')
    const $togglePassBtn = document.querySelector('#togglePassBtn')
    let state = false
    
    // password visibility control
    $togglePassBtn.onclick = () => {
        const password = $loginForm.userPass

        if (state === false) {
            state = true
            password.type = 'text'
            $togglePassBtn.firstElementChild.style.display = 'none'
            $togglePassBtn.lastElementChild.style.display = 'block'
        } else {
            password.type = 'password'
            state = false
            $togglePassBtn.firstElementChild.style.display = 'block'
            $togglePassBtn.lastElementChild.style.display = 'none'
        }
    }

    $loginForm.onsubmit = e => {
        e.preventDefault()

        const user = $loginForm.userID.value
        const pass = $loginForm.userPass.value
        
        if (!user || !pass) {
            const $emptyFieldSplash = document.querySelector('#emptyFieldSplash')
            const $gotItBtn = document.querySelector('#gotItBtn')

            splashControl($emptyFieldSplash, $gotItBtn)
            return
        }
        
        // Go and Search User
        const customer = {user, pass}
        customer ? searchAndSetUser(customer) : null
    }
}

function signUp () {
    const $signUpForm = document.querySelector('#signUpForm')
    
    $signUpForm.onsubmit = e => {
        e.preventDefault()

        const name = $signUpForm.newUserName.value
        const email = $signUpForm.newUserMail.value
        const phone = $signUpForm.newUserPhone.value
        const password = $signUpForm.newUserPass.value
        const passConfirm = $signUpForm.newUserPassConfirm.value

        if (!name || !email || !phone || !password || !passConfirm) {
            const $signUpEmptyFieldSplash = document.querySelector('#signUpEmptyFieldSplash')
            const $gotItBtn = document.querySelector('#gotItBtn')

            splashControl($signUpEmptyFieldSplash, $gotItBtn)
            return
        } 

        if (password != passConfirm) {
            const $signUpPasswordErrorSplash = document.querySelector('#signUpPasswordErrorSplash')
            const $gotItBtn2 = document.querySelector('#gotItBtn2')

            splashControl($signUpPasswordErrorSplash, $gotItBtn2)
            return
        }

        const customer = {name, email, phone, password}

        fetchAPI('POST', customersURL, customer, (data) => {
            if (data.message === 'customer succesfully sent') {
                const $signUpSuccessfulSplash = document.querySelector('#signUpSuccessfulSplash')
                const $gotToLoginBtn = document.querySelector('#gotToLoginBtn')

                $signUpForm.reset()
                splashControl($signUpSuccessfulSplash, $gotToLoginBtn, () => {
                    setTimeout(() => window.location.href = 'login.html', 500)
                })
            }
        })
    }
}

function isLogged (callback) {
    const user = sessionStorage.getItem('user')
    
    if (!user) {
        callback(false, null, null)
        return
    }
    
    const {userFirstName} = JSON.parse(user)
    callback(true, userFirstName)
}

function redirect (response, user) {
    if (response === false) {
        window.location.href = 'login.html'
        return
    }

    if (response === true && user != 'Administrador') {
        welcomeUser(user)
        this()
    }

    if (response === true && user === 'Administrador') {
        welcomeUser(user)
        this()
    }
}

function searchAndSetUser(customer) {
    fetchAPI('POST', `${customersURL}/login`, customer, data => {
        if (data.length === 0) {
            const $userNotFoundSplash = document.querySelector('#userNotFoundSplash')
            const $tryAgainBtn = document.querySelector('#tryAgainBtn')

            splashControl($userNotFoundSplash, $tryAgainBtn)
            return
        } 

        data.map(user => {
            const userID = user._id
            const userFirstName = user.name.split(' ')[0]

            // Redirect and store user
            if (userFirstName === 'Administrador') {
                window.location.href = 'products-list-admin.html'
                sessionStorage.setItem('user', JSON.stringify({userID, userFirstName}))
            } else {
                sessionStorage.setItem('user', JSON.stringify({userID, userFirstName}))
                window.location.href = 'logged-user.html'   
            }
        })
    })
}

function welcomeUser (user) {
    if (!user) {
        return
    }

    const $headerMessage = document.querySelector('#headerMessage')
    const $headerUserName = document.querySelector('#headerUserName')

    $headerUserName.innerHTML = user
    $headerMessage.classList.remove('hidden')
}

function buildProductsHTML () {
    const $products = document.querySelector('#products')
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
            $products.innerHTML = productsHTML

            const $getItemBtns = document.querySelectorAll('.getItemBtn')
            const $gotItBtn = document.querySelector('#gotItBtn') // gotIt btns

            // UNLOGGED USER 🚫
            $getItemBtns.forEach(btn => {
                btn.onclick = () => {
                    const $unloggedSplash = document.querySelector('#unloggedSplash')
                    splashControl($unloggedSplash, $gotItBtn)
                }
                return
            })

            // LOGGED USER ✅
            if (this) {
                newOrder($getItemBtns)
            }
        })
    })
}

function newOrder (btns) {
    const $gotItBtn = document.querySelector('#gotItBtn') // gotIt btns
    
    btns.forEach(button => {
        button.onclick = function () {
            const {userID} = JSON.parse(sessionStorage.getItem('user'))
            const orderID = this.dataset.id
            const order = {userID, orderID}

            fetchAPI('POST', `${customersURL}/newOrder`, order, data => {
                if (data.message === 'success') {
                    const $posOrderSplash = document.querySelector('#posOrderSplash')
                    splashControl($posOrderSplash, $gotItBtn)
                }
            })
        }  
    })
}

function buildMyOrders () {
    const {userID} = JSON.parse(sessionStorage.getItem('user'))
    const $myOrdersList = document.querySelector('#my-orders-list')
    let myOrdersHTML = ''
        
    fetchAPI('GET', `${customersURL}/${userID}`, null, data => {
        data.map(user => {
            const orders = user.orders

            if (orders.length === 0) {
                const $noOrders = document.querySelector('#noOrders')
                $noOrders.classList.add('visible')
                return
            }
            
            orders.map(order => {
                fetchAPI('GET', `${productsURL}/${order.id}`, null, data => {
                    data.map(product => {
                        myOrdersHTML += `
                            <div class="order">            
                                <div class="orderTablePart">
                                    <h4>Pedido</h4>
                                    <p class="productName">${product.name}</p>
                                </div>
        
                                <div class="orderTablePart">
                                    <h4>Descrição</h4>
                                    <p class="productDescription">${product.description}</p>
                                </div>
                    
                                <div class="orderTablePart">
                                    <h4>Data</h4>
                                    <span class="orderDate">${order.orderDate}</span>
                                </div>
        
                                <div class="orderTablePart">
                                <h4>Hora</h4>
                                    <span class="orderTime">${order.orderTime}</span>
                                </div>
                    
                                <div class="orderTablePart">
                                    <h4>Status</h4>
                                    <p class="orderStatus">${order.status}</p>
                                </div>

                                <button class="cancelOrderBtn ${order.status == 'Cancelado' ? 'inactive' : ''}" data-user=${user._id} data-order=${order.id} data-date=${order.orderDate} data-time=${order.orderTime}>
                                    <i class="fa-solid fa-ban"></i>
                                    Cancelar Pedido
                                </button>
                            </div>
                        `
                    
                        $myOrdersList.innerHTML = myOrdersHTML
                        cancelOrder()
                    })
                })
            })
        })
    })
}

function cancelOrder () {
    const $cancelOrderSplash = document.querySelector('#cancelOrderSplash')
    const $cancelOrderBtns = document.querySelectorAll('.cancelOrderBtn')
    
    $cancelOrderBtns.forEach(button => button.onclick = function () {
        const $proceedBtn = document.querySelector('#proceedBtn')
        const $abortBtn = document.querySelector('#abortBtn')
        
        const button = this
        const {user, order, date, time} = this.dataset
        
        // Abort
        splashControl($cancelOrderSplash, $abortBtn)

        // Proceed
        $proceedBtn.onclick = function () {
            $cancelOrderSplash.classList.remove('visible')
            document.querySelector('#main').classList.remove('almostHidden')

            const item = {user, order, date, time, status: 'Cancelado'}

            fetchAPI('PUT', `${customersURL}/updateOrder`, item, data => {
                if (data.message === 'success') {
                    setTimeout(() => location.reload(), 1000)
                }
            })
        }
    })
}

function logOut () {
    sessionStorage.clear('user')
}

function buildProductsADM () {
    const $productsListAdmin = document.querySelector('#products-list-admin')
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
            $productsListAdmin.innerHTML = HTML
            
            const $deleteItemBtns = document.querySelectorAll('.deleteItemBtn')
            deleteProductADM($deleteItemBtns)
        })
    })
}

function deleteProductADM (btns) {
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
                    const $delProductErrorSplash = document.querySelector('#delProductErrorSplash')
                    const $gotItBtn = document.querySelector('#gotItBtn')

                    // not allowed
                    splashControl($delProductErrorSplash, $gotItBtn)
                    return
                }

                const $delProductConfirmSplash = document.querySelector('#delProductConfirmSplash')
                const $cancelBtn = document.querySelector('#cancelBtn')
                const $proceedBtn = document.querySelector('#proceedBtn')

                // Cancel
                splashControl($delProductConfirmSplash, $cancelBtn)
                
                // Proceed
                $proceedBtn.onclick = () => {
                    fetchAPI('DELETE', productsURL, this.dataset.id, data => {
                        if (data.message === 'product succesfully removed') {
                            const $delProductSuccesSplash = document.querySelector('#delProductSuccesSplash')
                            const $goBackBtn = document.querySelector('#goBackBtn')
                            
                            $delProductConfirmSplash.classList.remove('visible')
                            splashControl($delProductSuccesSplash, $goBackBtn, () => {
                                setTimeout(() => location.reload(), 1000)
                            })  
                        }
                    })
                }
            }
        })
    }
}

function addNewProductADM () {
    const $newProductForm = document.querySelector('#newProductForm')
    const $newProductPrice = document.querySelector('#newProductPrice')
    const $pricePreview = document.querySelector('#pricePreview')
    let overpriced = false

    // price preview
    $newProductPrice.oninput = e => {
        const price = +e.target.value
        const overprice = e.target.value > 80
        
        $pricePreview.innerHTML = price.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})

        if (e.target.value === '') {
            $pricePreview.innerHTML = ''
        }

        if (overprice) {
            $pricePreview.innerHTML = 'preço acima do permitido'
            overpriced = true
        } else {
            overpriced = false
        }
    }

    // on submit
    $newProductForm.onsubmit = e => {
        e.preventDefault()

        if (overpriced === true) {
            return
        }

        const name = $newProductForm.newProductName.value
        const price = $newProductForm.newProductPrice.value
        const description = $newProductForm.newProductDescription.value
        const product = {name, price, description}

        if (!name || !price || !description) {
            const $newProductErrorSplash = document.querySelector('#newProductErrorSplash')
            const $gotItBtn = document.querySelector('#gotItBtn')

            splashControl($newProductErrorSplash, $gotItBtn)
            return
        } 

        fetchAPI('POST', productsURL, product, data => {
            if (data.message === 'product succesfully sent') {
                $newProductForm.reset()
                $pricePreview.innerHTML = ''

                const $newProductSuccesSplash = document.querySelector('#newProductSuccesSplash')
                const $returnBtn = document.querySelector('#returnBtn')

                splashControl($newProductSuccesSplash, $returnBtn)
            }
        })
    }
}

function listCustomersADM () {
    const $customersListAdmin = document.querySelector('#customers-list-admin')
    let HTML = ''

    fetchAPI('GET', customersURL, null, data => {
        data.forEach(customer => {
            if (customer.name != 'Administrador') {
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
            $customersListAdmin.innerHTML = HTML

            const $deleteCustomerBtns = document.querySelectorAll('.deleteCustomerBtn')
            deleteCustomerADM($deleteCustomerBtns)
            }
        })
    })
}

function deleteCustomerADM (btns) {
    btns.forEach(btn => {
        btn.onclick = function () {
            const previousCustomers = [
                '64f780b10bcbf9e4c7ba4b0c',
                '64f78b0b0bcbf9e4c7ba4b0d',
                '64f78ced0bcbf9e4c7ba4b0e',
                '64f78e300bcbf9e4c7ba4b10'
            ]

            if (previousCustomers.includes(this.dataset.id)) {
                const $delCustomerErrorSplash = document.querySelector('#delCustomerErrorSplash')
                const $gotItBtn = document.querySelector('#gotItBtn')

                splashControl($delCustomerErrorSplash, $gotItBtn)
                return
            } 

            const $delCustomerConfirmSplash = document.querySelector('#delCustomerConfirmSplash')
            const $proceedBtn = document.querySelector('#proceedBtn')
            const $cancelBtn = document.querySelector('#cancelBtn')
            
            // Cancel
            splashControl($delCustomerConfirmSplash, $cancelBtn)
            
            // Proceed
            $proceedBtn.onclick = () => {
                fetchAPI('DELETE', customersURL, this.dataset.id, data => {
                    if (data.message === 'customer succesfully removed') {
                        const $delCustomerSuccesSplash = document.querySelector('#delCustomerSuccesSplash')
                        const $goBackBtn = document.querySelector('#goBackBtn')

                        $delCustomerConfirmSplash.classList.remove('visible')
                        splashControl($delCustomerSuccesSplash, $goBackBtn, () => {
                            setTimeout(() => location.reload(), 500)
                        })
                    }
                })
            }
        }
    })
}

function splashControl (splash, actionButton, callback) {
    const $main = document.querySelector('#main')

    $main.classList.add('almostHidden')
    splash.classList.add('visible')

    actionButton.onclick = () => {
        splash.classList.remove('visible')
        $main.classList.remove('almostHidden')

        if (callback) {
            callback()
        }
    }
}