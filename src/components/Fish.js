import React from 'react';
import PropTypes from 'prop-types';
import { formatPrice } from '../helpers';

// format price call happens from helpers.


class Fish extends React.Component {

  // static because all fish elemts will have the same ones, so proptypes lives on the fish instance.
  static propTypes = {
    details:PropTypes.shape({
      image: PropTypes.string,
      name: PropTypes.string,
      price: PropTypes.number,
      desc: PropTypes.string,
      status: PropTypes.string
    }),
    addToOrder: PropTypes.func,
  }

  handleClick = () => {
    this.props.addToOrder(this.props.index)
    // pass in index as 'key' arg
    // this function could be in-line in component render.
  }

  render() {
    const { image, name, price, desc, status } = this.props.details
    const isAvailable = status === 'available';      // boolean

    return (
    <li className="menu-fish">
      <img src={image} alt={name}/>
      <h3 className="fish-name">{name}
        <span className="price">{formatPrice(price)}</span>
      </h3>
      <p>{desc}</p>
      <button
        onClick={this.handleClick}
        disabled={!isAvailable}>
        {isAvailable ? 'Add to Order' : 'Sold Out'}
      </button>
    </li>
    )
  }
}

export default Fish;
