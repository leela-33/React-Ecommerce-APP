import React from 'react'

const CartContext = React.createContext({
  cartList: [],
  addToCart: () => {},
  removeCartItem: () => {},
})

export default CartContext
