// External modules
import {home} from './home.js'
import {login} from './login.js'
import {listProducts, signUp, cancelOrder} from './customer.js'
import {listProduts, deleteProduct, listCustomers, addNewProduct} from './admin.js'

// BODY
const _index = document.querySelector('#index')
const _newUser = document.querySelector('#newUser')
const _login = document.querySelector('#login')
const _loggedUser = document.querySelector('#loggedUser')
const _myOrders = document.querySelector('#myOrders')
const _listProductsAdmin = document.querySelector('#listProductsAdmin')
const _addNewProductAdmin = document.querySelector('#addNewProductAdmin')
const _listCustomersAdmin = document.querySelector('#listCustomersAdmin')

// ================================ BOTH ================================
// Home
_index ? home() : null

// Login
_login ? login() : null

// ============================== CUSTOMER ==============================
// List Products 
_loggedUser ? listProducts() : null

// Sign Up
_newUser ? signUp() : null

// Cancel Order
_myOrders ? cancelOrder() : null

// ================================ ADMIN ===============================
// List Products
_listProductsAdmin ? listProduts() : null

// Delete Products
_listProductsAdmin ?  deleteProduct() : null

// List Customers
_listCustomersAdmin ? listCustomers() : null

// New Product 
_addNewProductAdmin ? addNewProduct() : null