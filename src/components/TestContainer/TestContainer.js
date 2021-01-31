import TypingChallengeContainer from "../TypingChallengeContainer/TypingChallengeContainer";
import TryAgain from "./../TryAgain/TryAgain";
import "./TestContainer.css";
import { connect } from "react-redux";
import LeaderBoard from "../leaderBoard/LeaderBoard";
import { useState } from "react";

const TestContainer = (props) => {
  const showChallenge = props.isFinished;
  const [showLeaderBoard, setShowLeaderBoard] = useState(false);

  return (
    <div className="test-container">
      {showLeaderBoard ? (
        <LeaderBoard setShowLeaderBoard={setShowLeaderBoard} />
      ) : !showChallenge ? (
        <div className="typing-challenge-cont">
          <TypingChallengeContainer setShowLeaderBoard={setShowLeaderBoard} />
        </div>
      ) : (
        <div className="try-again-cont">
          <TryAgain />
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isFinished: state.isFinished,
  };
};
export default connect(mapStateToProps)(TestContainer);
