import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import StorePicker from './StorePicker';
import App from './App';
import NotFound from './NotFound';


const Router = () => (
  <BrowserRouter>
    <Switch>
      {/* go to this exact path / url */}
      <Route exact path="/" component={StorePicker}/>
      {/* storeId catch all for any store url */}
      <Route exact path="/store/:storeId" component={App}/>
      {/* NotFound routes */}
      <Route component={NotFound}/>
    </Switch>
  </BrowserRouter>
)

export default Router;
