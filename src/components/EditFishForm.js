import React from 'react';
import PropTypes from 'prop-types';

class EditFishForm extends React.Component {

  static propTypes = {
    fish: PropTypes.shape({
      image: PropTypes.string,
      name: PropTypes.string,
      price: PropTypes.number,
      desc: PropTypes.string,
      status: PropTypes.string
    }),
    index: PropTypes.string,
    updateFish: PropTypes.func
  }


  // alternative to refs way
  handleChange = (event) => {
    console.log("event", event.currentTarget.value);
    // 1. take copy of current fish
    const updatedFish = {
      ...this.props.fish,      // grabs ALL fish props: name, price, desc, etc
      //COMPUTED PROPERTY NAMES: value being updated is also dynamic.
      // it figures out what got updated instead of being explicitly told.
      //just overwrite the one thing that changed, using name prop on elements.
      [event.currentTarget.name]: event.currentTarget.value   //
    }
    // call updated fish method passed from App
    this.props.updateFish(this.props.index, updatedFish) //index acts as a key
  }

  render() {
    return (
    <div className="fish-edit">
      <input
        type="text"
        name="name"
        // needs onChange event so user can type into input field (React rule)
        onChange={this.handleChange}
        value={this.props.fish.name}
      />
      <input
        type="text"
        name="price"
        onChange={this.handleChange}
        value={this.props.fish.price}
      />
      <select
        type="type"
        onChange={this.handleChange}
        name="status"
        value={this.props.fish.status}
      >
        <option type="available">Fresh!</option>
        <option type="unavailable">Sold Out!</option>
      </select>
      <textarea
        name="desc"
        value={this.props.fish.desc}
        onChange={this.handleChange}
        >
      </textarea>
      <input type="text"
        name="image"
        onChange={this.handleChange}
        value={this.props.fish.image}
      />
      <button onClick={() => this.props.deleteFish(this.props.index)}>Remove Fish</button>
    </div>
    )
  }
}

export default EditFishForm;
