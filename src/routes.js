import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Header from './components/Header/Header';
import Form from './components/PeoplesForm/PeoplesForm';
import Home from './pages/Home';


const Routes = () => (
  <BrowserRouter>
    <Header/>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/newPeople" component={Form} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
