import React from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Home from './components/Home/Home';
import Todo from './components/Todo/Todo'
import MineSweeper from './components/MineSweeper/MineSweeper';


function App() {
  return (
    <Router>
        <Switch>
          <Route path="/todo">
            <Todo />
          </Route>
          <Route path="/MineSweeper">
            <MineSweeper />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
    </Router>
  );
}

export default App;
