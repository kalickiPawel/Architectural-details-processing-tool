import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import InputZTable from './Components/InputZTable';
import InputXYPoints from './Components/InputXYPoints';
import InputMethodRadio from './Components/InputMethodRadio';
import InterpChart from './Components/InterpChart';
import SendButton from './Components/SendButton';

import { connect } from 'react-redux';

class App extends Component {
  render() {
    return (
      <div className="container" >

        <div className="row bg-light">
          <div className="col">
            <nav className="navbar navbar-light">
              <h1 className="display-4">WebInterpTool</h1>
            </nav>
          </div>
        </div>

        <div className="row align-items-center">
          <div className="col-8">
            <div className="containter">
              <div className="row bg-content align-items-center">
                <div className="col-6 pt-3 pb-3">
                  <InputXYPoints />
                </div>
                <div className="col-6">
                  <div className="row pt-3 pb-3">
                    <InputZTable xList={this.props.data.x} yList={this.props.data.y} />
                  </div>
                  <div className="row pt-3 pb-3 text-center">
                    <InputMethodRadio />
                  </div>
                  <div className="row pt-3 pb-3 text-center">
                    <div className="container">
                      <SendButton />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-4 pt-3 pb-3">
            <InterpChart xList={this.props.data.x} yList={this.props.data.y} />
          </div>
        </div >
      </div >
    );
  }
}

const mapStateToProps = (state) => {
  return {
    data: state.mouseCoords
  }
}

export default connect(mapStateToProps)(App);
