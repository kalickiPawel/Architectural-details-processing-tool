import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import InterpChart from './Components/InterpChart';


class App extends Component {
  render() {
    return (
      <div>
        <div class="row">
          <div class="col-sm-4">.col-sm-4</div>
          <div class="col-sm-4">.col-sm-4</div>
          <div class="col-sm-4"><InterpChart /></div>
        </div>
      </div>
    );
  }
}

export default App;
