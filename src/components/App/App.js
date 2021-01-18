import React from "react";
import "./App.css";
import TestContainer from "../TestContainer/TestContainer";

class App extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    return (
      <div className="app-container">
        <h1 className="main-heading">Beat the NetRunner</h1>
        <div className="test-container-main">
          <TestContainer />
        </div>
      </div>
    );
  }
}

export default App;
