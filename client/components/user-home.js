import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

/**
 * COMPONENT-This is for
 * UserHomePageDrawingLists
 */
// export const UserHome = props => {
//   const {email} = props
//   console.log('this is props==>',props)

//   return (
//     <div>
//       <h3>Welcome, {email}</h3>

//     </div>

//   )
// }

// /**
//  * CONTAINER
//  */
// const mapState = state => {
//   return {
//     email: state.user.email
//   }
// }

// export default connect(mapState)(UserHome)

// /**
//  * PROP TYPES
//  */
// UserHome.propTypes = {
//   email: PropTypes.string
// }

class UserHome extends React.Component {
  constructor(props) {
    super(props)
  }

  // componentDidMount() {
  //   this.props.getProducts()
  // }

  render() {
    // const products = this.props.products
    console.log('this.props==>', this.props)
    return (
      <div>
        <h1>All Drawings</h1>
        <h2>List of Drawings:</h2>
        {/* <div >
          {products.map(product => {
            return (
              <div  key={product.id}>
                <div >
                  <Link

                    to={`/products/${product.id}`}
                  >
                    <h2>{product.name}</h2>
                    <img src={product.imageUrl} />
                  </Link>
                  <p>{product.description}</p>
                  <h3>Price: {product.price}</h3>
                </div>
              </div>
            )
          })}
        </div> */}
        <div />
      </div>
    )
  }
}

// const mapState = state => {
//   return {
//     products: state.products
//   }
// }

// const mapDispatch = dispatch => {
//   return {
//     getProducts: () => {
//       return dispatch(fetchProducts())
//     }
//   }
// }

// export default connect(mapState, mapDispatch)(UserHome)

export default UserHome
