import CartContext from '../../context/CartContext'
import Header from '../Header'
import './index.css'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value

      const isEmpty = cartList.length === 0

      return (
        <>
          <Header />
          <div className="cart-container">
            {/* Show cart image ONLY if empty */}
            {isEmpty && (
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-cart-img.png"
                alt="cart"
                className="cart-img"
              />
            )}

            <h1>Your Cart Items</h1>

            {isEmpty ? (
              <p>No items added yet.</p>
            ) : (
              <ul className="cart-items-list">
                {cartList.map(item => (
                  <li key={item.id} className="cart-item">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="cart-item-img"
                    />

                    <div className="cart-item-details">
                      <p>{item.title}</p>
                      <p>Brand: {item.brand}</p>
                      <p>Price: Rs {item.price}/-</p>
                      <p>Quantity: {item.quantity}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </>
      )
    }}
  </CartContext.Consumer>
)

export default Cart
