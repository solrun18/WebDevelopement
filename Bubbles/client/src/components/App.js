import React from 'react';
import NavigationBar from './NavigationBar';
import {Switch, Route, Redirect } from 'react-router-dom';

import About from './About/About';
import Bundles from './Bundles/Bundles';
import Cart from './Cart/Cart';
import Bubbles from './Bubbles/Bubbles';
import Container from './Container';
import BubbleInfo from './BubbleInfo/BubbleInfo';
import Order from './Order/Order';

function App(){
    return (
        <div className="App">
          <NavigationBar />
          <Container>
          <Switch>
              <Route exact path="/" component={ Bubbles } />
              <Route exact path="/bubbles" render={ () => <Redirect to="/" /> } />
              <Route exact path="/bundles" component={ Bundles } />
              <Route exact path="/about" component={ About } />
              <Route exact path="/cart" component={ Cart } />
              <Route exact path="/:bubbleId" component={ BubbleInfo } />
              <Route exact path="/order/:telephone" component={ Order } />
              <Route exact path="/order" component={ Order } />
          </Switch>

          </Container>
        </div>
    );
}

export default App;
