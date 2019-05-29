import React from 'react';
import { getFunName } from '../helpers';
import PropTypes from 'prop-types';

class StorePicker extends React.Component {

  static propTypes = {
    history: PropTypes.object,
  }

  myInput = React.createRef();

  // arrow function sets own "this" context. binds this to StorePicker component
  gotToStore = (event) => {
    // 1.prevents page submit / refresh
    event.preventDefault()
    // 2.get text from input
    console.log(this.myInput.current.value);
    const storeName = this.myInput.current.value;
    // 3. change page to new path by using prop's history
    this.props.history.push(`/store/${storeName}`)
  }

  componentDidMount() {
    console.log("mounted!");
    console.log("this", this);
  }

  render() {
    return (
      // no () on {this.gotToStore} so method isn't called when component mounts.
      <form className="store-selector" onSubmit={this.gotToStore}>
        <h2>Please Enter a Store</h2>
        <input
          type="text"
          ref={this.myInput}
          required
          placeholder="Store Name"
          defaultValue={getFunName()}
        />
        <button type="submit">Visit Store -> </button>
      </form>
    )
  }
}

export default StorePicker;
