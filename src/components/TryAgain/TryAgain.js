import "./TryAgain.css";
import { connect } from "react-redux";
import { useEffect, useState } from "react";

const TryAgain = (props) => {
  const [totalPoint, setTotalPoint] = useState(null);
  useEffect(() => {
    setTotalPoint(
      point(props.words, props.differences, props.wpm, props.level)
    );
  }, []);
  const refreshPage = () => {
    window.location.reload(false);
  };
  const point = (words, misspelledWords, wpm, level) => {
    let levelMultiply = 1;
    if (level == 1) {
      levelMultiply = 1.1;
    } else if (level == 2) {
      levelMultiply = 1.15;
    } else if (level == 3) {
      levelMultiply = 1.4;
    } else if (level == 4) {
      levelMultiply = 1.6;
    } else if (level == 5) {
      levelMultiply = 1.8;
    }
    let correctpercentage = ((words - misspelledWords) / words) * 100;
    let point = (correctpercentage * +wpm * levelMultiply).toFixed(0);
    return point;
  };
  return (
    <div className="try-again-container">
      <h1>Test Results</h1>

      <div className="result-container">
        <p>WPM: {props.wpm}</p>
        <p>misspelled words: {props.differences}</p>
        <p>Final Point: {totalPoint}</p>
      </div>

      <button
        className="start-again-btn"
        onClick={() => {
          refreshPage();
        }}
      >
        Start Again
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
export default connect(mapStateToProps)(TryAgain);
