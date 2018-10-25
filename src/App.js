import React from 'react';
import { Route, Switch } from 'react-router'; // react-router v4

import Home from './components/Home/App.js';
import Details from './components/Details';
import List from './components/MeteoriteList'
import NotFound from './components/NotFound';

class App extends React.Component {
  render() {
    return (
      <div>
        { /* your usual react-router v4 routing */ }
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/list" component={List} />
          <Route path="/details/:meteoriteId" component={Details} />
          <Route component={NotFound} /> {/* place this at end */}
        </Switch>
      </div>
    );
  }
}

export default App;
