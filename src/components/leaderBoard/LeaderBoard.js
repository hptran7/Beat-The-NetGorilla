import "./leaderBoard.css";
import { connect } from "react-redux";
import { useEffect, useState } from "react";

const LeaderBoard = (props) => {
  useEffect(() => {}, []);

  return (
    <div className="try-again-container">
      <h1>LeaderBoard</h1>

      <div className="result-container"></div>
      <button
        onClick={() => {
          props.setShowLeaderBoard(false);
        }}
      >
        Test{" "}
      </button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    differences: state.differences,
    words: state.words,
    wpm: state.wpm,
    level: state.level,
  };
};
export default connect(mapStateToProps)(LeaderBoard);
