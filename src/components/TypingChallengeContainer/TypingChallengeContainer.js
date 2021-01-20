import { ChallengeDetailsCard } from "../ChallengeDetailsCard/ChallengeDetailsCard";
import "./TypingChallengeContainer.css";
import TypingChallenge from "../TypingChallenge/TypingChallenge";
import { connect } from "react-redux";

const TypingChallengeContainer = (props) => {
  return (
    <div className="typing-challenge-container">
      <div className="details-container">
        {/* Words Typed */}
        <ChallengeDetailsCard
          cardName="words Per Minutes"
          cardValue={props.wpm == "NaN" ? 0 : props.wpm}
        />

        {/* Characters Typed */}
        <ChallengeDetailsCard cardName="Level" cardValue={props.level} />

        {/* Mistakes */}
        <ChallengeDetailsCard
          cardName="mistakes"
          cardValue={props.mistakes == "-1" ? 0 : props.mistakes}
        />
      </div>

      {/* Typing Challenge */}
      <div className="type-challenge-cont">
        <TypingChallenge />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    wpm: state.wpm,
    level: state.level,
    mistakes: state.mistakes,
  };
};

export default connect(mapStateToProps)(TypingChallengeContainer);
