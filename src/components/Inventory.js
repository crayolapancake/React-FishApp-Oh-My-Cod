import React from "react";
import PropTypes from "prop-types";
import firebase from "firebase";
import AddFishForm from "./AddFishForm";
import EditFishForm from "./EditFishForm";
import Login from "./Login";
import base, { firebaseApp } from "../base";    // import named and default

class Inventory extends React.Component {

  static propTypes = {
    fishes: PropTypes.object,
    updateFish: PropTypes.func,
    deleteFish: PropTypes.func,
    loadSampleFishes: PropTypes.func,
    addFish: PropTypes.func
  }

  state = {
    uid: null,
    owner: null,
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged( user => {
      if(user) {
        this.authHandler({ user });
      }
    })
  };

  authHandler = async (authData) => {
    // 1. look up durrent store in FB DB
    console.log("authData", authData);
    const store = await base.fetch(this.props.storeId, { context: this });
    // 2 .claim store if there's no owner
    if(!store.owner) {
      await base.post(`${this.props.storeId}/owner`, {
        data: authData.user.uid
      })
    }
    // 3. set state of inventory component
    this.setState({
      uid: authData.user.uid,   //unique ID
      owner: store.owner || authData.user.uid
    })
  }

  authenticate = (provider) => {
    console.log('provider', provider)
    // need to make  provider for each login: GH, Twit &Fbook
    // dynamically look up provider using ${ }. Parenthesis at end to call function.
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    firebaseApp
      .auth()
      .signInWithPopup(authProvider)
      .then(this.authHandler);
  };

  logout = async () => {
    console.log("logging out");
    // async as waiting for firebase to log user out, then clear state
    await firebase.auth().signOut()
    this.setState({ uid: null })
  }

  render() {
    const logout = <button onClick={this.logout}>Log Out</button>;
    // 1. if no logged-in user, show log-in screen
    if (!this.state.uid) {
      return <Login authenticate={this.authenticate}/>
    }
    // 2. check if user is not the owner of the store
    if(this.state.uid !== this.state.owner) {
      return (
        <div>
          <p>Sorry, you are not the owner of this store.</p>
          {logout}
        </div>
      )
    }
    // 3. If user is owner, render Inventory.
    return (
    <div className="inventory">
      <h2>Inventory</h2>
      {logout}
      {Object.keys(this.props.fishes).map( key => (
        <EditFishForm
          key={key}
          index={key}
          fish={this.props.fishes[key]}
          updateFish={this.props.updateFish}
          deleteFish={this.props.deleteFish}
        />
      ))}
      <AddFishForm addFish={this.props.addFish}/>
      <button onClick={this.props.loadSampleFishes}
      >
        Load Sample Fishes
      </button>
    </div>
    )
  }
}

export default Inventory;
