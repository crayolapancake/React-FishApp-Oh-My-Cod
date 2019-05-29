import React from 'react';
import { formatPrice } from '../helpers'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import PropTypes from 'prop-types';

class Order extends React.Component {

  static propTypes = {
    fishes: PropTypes.object,
    order: PropTypes.object,
    deleteOrderItem: PropTypes.func
  }
  // make separate render functions to keep it tidy
  renderOrder = (key) => {
    const fish = this.props.fishes[key];           // grab the fish you're looping over
    const count = this.props.order[key];
    const isAvailable = fish && fish.status === 'available'
    const transitionOptions = {
      classNames: "order",
      key: key,
      timeout: { enter: 250, exit: 250 }
    }

    // delay in DB mirroring state: render nothing until fish actually exists.
    if(!fish) return null;

    if (!isAvailable) {
      return (
        <CSSTransition {...transitionOptions}>
          <li
            key={key}>
            Sorry, {fish ? fish.name : 'fish'} is no longer available
          </li>
        </CSSTransition>
      )
    } else {
      return (
        <CSSTransition {...transitionOptions}>
          <li key={key}>
            <span>
              <TransitionGroup component="span" className="count">
                {/* CSSTransition has classnameS plural */}
                <CSSTransition
                  classNames="count"
                  key={count}
                  timeout={{ enter: 250, exit: 250 }}
                >
                  <span>{count}</span>
                </CSSTransition>
              </TransitionGroup>
              lbs {fish.name}
              {formatPrice(count * fish.price)}
              <button onClick={() => this.props.deleteOrderItem(key)}>
                &times;
              </button>
            </span>
          </li>
        </CSSTransition>
      )
    }
  }

  render() {
    // tally up total of order
    const orderIds = Object.keys(this.props.order);

    const total = orderIds.reduce((prevTotal, key) => {
      const fish = this.props.fishes[key];
      const count = this.props.order[key];
      const isAvailable = fish && fish.status === 'available'
      if(isAvailable) {
        return prevTotal + (count * fish.price)
      }
      return prevTotal;
    }, 0);

    return (
    <div className="order-wrap">
      <h2>Order</h2>
      <TransitionGroup
        component="ul"
        className="order">
        {orderIds.map(this.renderOrder)}
      </TransitionGroup>
      <div className="total">Total:
        <strong>{formatPrice(total)}</strong>
      </div>
    </div>
    )
  }
}

export default Order;
