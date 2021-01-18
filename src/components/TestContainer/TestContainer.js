import TypingChallengeContainer from "../TypingChallengeContainer/TypingChallengeContainer";
import TryAgain from "./../TryAgain/TryAgain";
import "./TestContainer.css";
import { connect } from "react-redux";

const TestContainer = (props) => {
  const showChallenge = props.isFinished; // temporary var (Will be replaced while building the app)

  return (
    <div className="test-container">
      {!showChallenge ? (
        <div className="typing-challenge-cont">
          <TypingChallengeContainer />
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
