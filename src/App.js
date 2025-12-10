import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  // --------------------------------------
  // REMOVE ALL CART ITEMS
  // --------------------------------------
  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  // --------------------------------------
  // REMOVE ONE CART ITEM
  // --------------------------------------
  removeCartItem = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.filter(each => each.id !== id),
    }))
  }

  // --------------------------------------
  // INCREMENT QUANTITY
  // --------------------------------------
  incrementCartItemQuantity = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(item => {
        if (item.id === id) {
          return {...item, quantity: item.quantity + 1}
        }
        return item
      }),
    }))
  }

  // --------------------------------------
  // DECREMENT QUANTITY
  // --------------------------------------
  decrementCartItemQuantity = id => {
    this.setState(prevState => {
      const product = prevState.cartList.find(each => each.id === id)

      if (product.quantity === 1) {
        return {
          cartList: prevState.cartList.filter(each => each.id !== id),
        }
      }

      return {
        cartList: prevState.cartList.map(each => {
          if (each.id === id) {
            return {...each, quantity: each.quantity - 1}
          }
          return each
        }),
      }
    })
  }

  // --------------------------------------
  // ADD TO CART
  // --------------------------------------
  addCartItem = product => {
    this.setState(prevState => {
      const {cartList} = prevState
      const existing = cartList.find(item => item.id === product.id)

      if (existing) {
        return {
          cartList: cartList.map(item => {
            if (item.id === product.id) {
              return {...item, quantity: item.quantity + product.quantity}
            }
            return item
          }),
        }
      }

      return {cartList: [...cartList, product]}
    })
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
