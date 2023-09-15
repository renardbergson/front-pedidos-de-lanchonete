// external modules
import {customersURL} from './url.js'
import {fetchAPI} from './fetch.js'

// Login
function login () {
    const _loginForm = document.querySelector('#loginForm')
    const _togglePassBtn = document.querySelector('#togglePassBtn')
    let state = false
    
    // password visibility control
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

        const user = _loginForm.userID.value
        const pass = _loginForm.userPass.value
        
        if (!user || !pass) {
            return
        }
        
        // ADMIN
        if (user === 'admin' && pass === 'admin') {
            window.location.href = 'products-list-admin.html'
        }
        
        // CUSTOMER
        const customer = {user, pass}
        customer ? fetchUser(customer) : null
    }
}

function fetchUser(customer) {
    fetchAPI('POST', `${customersURL}/login`, customer, data => {
        if (data.length === 0) {
            alert('Usuário não encontrado!')
        } else {
            data.map(user => {
                const userID = user._id
                const userFirstName = user.name.split(' ')[0]
 
                sessionStorage.setItem('user', JSON.stringify({userID, userFirstName}))
                window.location.href = 'logged-user.html'
            })
        }
    })
}

export {login}