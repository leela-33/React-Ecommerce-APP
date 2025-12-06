// src/components/ProductItemDetails/index.js
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import CartContext from '../../context/CartContext'

import Header from '../Header'
import SimilarProductItem from '../SimilarProductItem'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class ProductItemDetails extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    productData: {},
    similarProducts: [],
    quantity: 1,
  }

  componentDidMount() {
    this.getProductDetails()
  }

  getFormattedProduct = data => ({
    id: data.id,
    title: data.title,
    brand: data.brand,
    price: data.price,
    description: data.description,
    imageUrl: data.image_url,
    totalReviews: data.total_reviews,
    rating: data.rating,
    availability: data.availability,
  })

  getProductDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {id} = match.params

    const apiUrl = `https://apis.ccbp.in/products/${id}`
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }

    const response = await fetch(apiUrl, options)

    if (response.ok) {
      const data = await response.json()
      const updatedProduct = this.getFormattedProduct(data)
      const updatedSimilarProducts = data.similar_products.map(each =>
        this.getFormattedProduct(each),
      )

      this.setState({
        productData: updatedProduct,
        similarProducts: updatedSimilarProducts,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onClickContinueShopping = () => {
    const {history} = this.props
    history.replace('/products')
  }

  onClickIncrement = () => {
    this.setState(prevState => ({quantity: prevState.quantity + 1}))
  }

  onClickDecrement = () => {
    this.setState(prevState => {
      if (prevState.quantity > 1) {
        return {quantity: prevState.quantity - 1}
      }
      return {quantity: 1}
    })
  }

  renderFailureView = () => (
    <div className="product-details-failure-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
        alt="failure view"
        className="product-details-error-image"
      />
      <h1 className="product-details-failure-heading">Product Not Found</h1>
      <button
        type="button"
        className="continue-shopping-button"
        onClick={this.onClickContinueShopping}
      >
        Continue Shopping
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div data-testid="loader" className="product-details-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height={80} width={80} />
    </div>
  )

  renderProductDetailsView = () => {
    const {productData, similarProducts, quantity} = this.state
    const {
      id,
      title,
      brand,
      price,
      description,
      imageUrl,
      totalReviews,
      rating,
      availability,
    } = productData

    return (
      <CartContext.Consumer>
        {value => {
          const {addToCart} = value

          const onAdd = () => {
            const product = {
              id,
              title,
              brand,
              price,
              imageUrl,
              quantity,
            }
            addToCart(product)
          }

          return (
            <div className="product-item-details-body">
              <div className="product-item-details-main">
                <img
                  src={imageUrl}
                  alt="product"
                  className="product-details-image"
                />

                <div className="product-details-text">
                  <h1 className="product-details-title">{title}</h1>
                  <p className="product-details-price">Rs {price}/-</p>

                  <div className="rating-reviews-container">
                    <div className="rating-box">
                      <p className="rating-value">{rating}</p>
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                        alt="star"
                        className="rating-star"
                      />
                    </div>
                    <p className="total-reviews">{totalReviews} Reviews</p>
                  </div>

                  <p className="product-details-description">{description}</p>

                  <p className="product-details-info">
                    <span className="product-details-label">Available:</span>{' '}
                    {availability}
                  </p>

                  <p className="product-details-info">
                    <span className="product-details-label">Brand:</span>{' '}
                    {brand}
                  </p>

                  <hr className="product-details-divider" />

                  <div className="quantity-controller-container">
                    <button
                      type="button"
                      className="quantity-controller-button"
                      data-testid="minus"
                      onClick={this.onClickDecrement}
                    >
                      <BsDashSquare />
                    </button>

                    <p className="quantity-value">{quantity}</p>

                    <button
                      type="button"
                      className="quantity-controller-button"
                      data-testid="plus"
                      onClick={this.onClickIncrement}
                    >
                      <BsPlusSquare />
                    </button>
                  </div>

                  <button
                    type="button"
                    className="add-to-cart-button"
                    onClick={onAdd}
                  >
                    ADD TO CART
                  </button>
                </div>
              </div>

              <h1 className="similar-products-heading">Similar Products</h1>
              <ul className="similar-products-list">
                {similarProducts.map(eachProduct => (
                  <SimilarProductItem
                    key={eachProduct.id}
                    productDetails={eachProduct}
                  />
                ))}
              </ul>
            </div>
          )
        }}
      </CartContext.Consumer>
    )
  }

  renderContent = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProductDetailsView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="product-item-details-container">
          {this.renderContent()}
        </div>
      </>
    )
  }
}

export default ProductItemDetails
