import "./TryAgain.css";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const TryAgain = (props) => {
  const [totalPoint, setTotalPoint] = useState(null);
  const [showPostScore, setShowPostScore] = useState(false);
  const [userName, setUserName] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(true);
  const history = useHistory();

  useEffect(() => {
    setTotalPoint(
      point(props.words, props.differences, props.wpm, props.level)
    );
    setMessage("");
    if (props.wpm < 15) {
      setSuccess(false);
    }
  }, []);
  const refreshPage = () => {
    history.go(0);
  };
  const showpostScoreDiv = () => {
    setShowPostScore(!showPostScore);
  };
  const handleOnInputChange = (e) => {
    setUserName(e.target.value);
  };
  const handleOnSubmitScore = async () => {
    console.log("submit");
    let words = props.words;
    let differences = props.differences;
    let wpm = props.wpm;
    axios
      .post("https://beat-netgorilla.herokuapp.com/post-score", {
        userName: userName,
        wpm: wpm,
        point: totalPoint,
        differences: differences,
        words: words,
      })
      .then((result) => {
        if (result.data.message == "success") {
          setMessage("Your Score has been posted");
        }
      });
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
    console.log(words, misspelledWords, wpm, level);
    let correctpercentage = ((words - misspelledWords) / words) * 100;
    let point = (correctpercentage * +wpm * levelMultiply).toFixed(0);
    return point;
  };
  return (
    <div className="try-again-container">
      <h1>Test Results</h1>
      {!success ? (
        <p>
          Unfortunately, you are too slow, the gorilla has taken over the world!
        </p>
      ) : null}
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
        Try Again
      </button>
      {success ? (
        <button
          className="start-again-btn"
          onClick={() => {
            showpostScoreDiv();
          }}
        >
          Post Score
        </button>
      ) : null}

      {showPostScore ? (
        <div>
          <input
            placeholder="Please enter your name..."
            className="input-name"
            onChange={handleOnInputChange}
          ></input>
          <button className="submit-btn" onClick={handleOnSubmitScore}>
            Post Score!
          </button>
          {message ? <p>{message}</p> : null}
        </div>
      ) : null}
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
