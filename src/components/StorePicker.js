import React from 'react';
import { getFunName } from '../helpers';
import PropTypes from 'prop-types';

class StorePicker extends React.Component {

  static propTypes = {
    history: PropTypes.object,
  }

  myInput = React.createRef();

  //this is undefined until you bind method
  // arrow function sets own this context
  // gotToStore is a property, set to arrow func which binds this to    StorePicker component
  gotToStore = (event) => {
    // 1.prevents page submit / refresh
    event.preventDefault()
    // 2.get text from input
    console.log(this.myInput.current.value);
    const storeName = this.myInput.current.value;
    // 3. change page to new path by using prop's history (check out STorePicker in react Dev tools to see props and their methods available)
    this.props.history.push(`/store/${storeName}`)
  }

  componentDidMount() {
    console.log("mounted!");
    console.log("this", this);  // this is class instancce, StorePicker
  }

  render() {
    return (
      // listening for form submit, NOT button click!!
      // no () so method isn't called when component mounts.
      <form className="store-selector" onSubmit={this.gotToStore}>
        <h2>Please Enter a Store</h2>
        {/* runs getFunName when component mounts */}
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
