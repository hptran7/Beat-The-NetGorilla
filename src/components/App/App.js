import React from "react";
import "./App.css";
import TestContainer from "../TestContainer/TestContainer";
import Modal from "../Modals/Modal";

class App extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    return (
      <div className="app-container">
        <div className="main-heading">
          <div className="title">Beat the NetGorilla</div>
        </div>
        <div className="test-container-main">
          <TestContainer />
        </div>
        <div className="container">
          <Modal></Modal>
        </div>
      </div>
    );
  }
}

export default App;
