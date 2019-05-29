import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';
import base from '../base';


// RUN NPM RUN DEV TO START. POOP

class App extends React.Component {
  state = {
    fishes: {},
    order: {}
  };

  static propTypes = {
    match: PropTypes.object
  }

  componentDidMount () {
    const { params } = this.props.match;
    //first re-instate local storage
    const localStorageRef = localStorage.getItem(params.storeId)
    console.log(localStorageRef);
    if(localStorageRef){
      this.setState({ order: JSON.parse(localStorageRef) })
    }

    this.ref = base.syncState(`${params.storeId}/fishes`, {
      // firebase ref: reference to a piece of data in database
      context: this,
      state: 'fishes'           // sync fish state
    })
    // sync state with props provided from Firebase, visible with react devtools in app/ props/match/storeID
  }

  componentDidUpdate() {
    console.log(this.state.order);
    // set key then value
    localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order))
    // stringify to change from it returning [object object]
  }

  // need to listen for unchanges to prevent memory leak
  componentWillUnmount() {
    base.removeBinding(this.ref)
  }


  addFish = fish => {
    // 1.setState: take a copy of existing state.
    const fishes = {...this.state.fishes}
    // 2. add our new fish to fishes variable
    // using timestamp for keys. fish on right side is passed-in fish object from createFish method in AddFishForm
    fishes[`fish${Date.now()}`] = fish;
    //Date.now() gives number of milliseconds since 1970...

    //3. set the new fishes object to State.
    // Takes copied fishes and new fishes and overwrites existing state.
    this.setState({ fishes: fishes })
  };

  updateFish = (key, updatedFish) => {
    // take copy of current state (whole fish state object)
    const fishes = {...this.state.fishes}
    // update that state
    fishes[key] = updatedFish
    // set the fishes object with new state
    this.setState ({ fishes: fishes })
  }

  deleteFish = (key) => {
    // 1. copy state
    const fishes = {...this.state.fishes}
    // 2. update state: must be set to NULL for FIREBASE to know to delete it
    fishes[key] = null;       // "delete" (set to null) by key
    // 3. setState
    this.setState({ fishes: fishes })
  }


  loadSampleFishes = () => {
    this.setState({ fishes: sampleFishes})
  }

  addToOrder = (key) => {
    // 1. take copy, 2. add to update number in order, 3. update state object
    const order = {...this.state.order};
    order[key] = order[key] + 1 || 1;
    //  if order.fish1 exists, add 1 to total, or if it doesnt, return 1 (add one of that fish.)
    this.setState({ order: order})
  }

  deleteOrderItem = (key) => {
    const order = {...this.state.order};
    delete order[key]
    // not mirroring to firebase so can use delete method instead of setting to null
    this.setState({ order })        // shorthand for order: order
  }


  render() {
    return (
      <div className= "catch-of-the-day">
        <div className= "menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="fishes">
            {/* see vid 15 for explanation of keys & mapping */}
            {Object.keys(this.state.fishes).map( key => (
              <Fish
                key={key}
                index={key}
                details={this.state.fishes[key]}
                addToOrder={this.addToOrder}/>
                // index ={key} neccessary for addToOrder function to access a key prop
            ))}
          </ul>
        </div>
        <Order
          fishes={this.state.fishes}
          order={this.state.order}
          deleteOrderItem={this.deleteOrderItem}
        />
        <Inventory
          addFish={this.addFish}
          updateFish={this.updateFish}
          loadSampleFishes={this.loadSampleFishes}
          fishes={this.state.fishes}
          deleteFish={this.deleteFish}
          // match.params comes from react router: see in devtools:
          // <App> / match / params / storeId
          storeId={this.props.match.params.storeId}
        />

      </div>
    )
  }

  // click on add to order in Fish; updates fishes and order state; both states are passed to order; order renders order details
}

export default App;
