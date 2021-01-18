import "./TypingChallenge.css";
import { connect } from "react-redux";
import React, { useEffect, useState } from "react";
import testDetailsCalculator from "../../helper/testDetailsCalculator";

const TypingChallenge = (props) => {
  const [isTimeRunning, setIsTimeRunning] = useState(false);
  const [typedValue, setTypedValue] = useState("");
  const [numberOfWords, setNumberOfWords] = useState(0);
  const [numberOfCharacters, setNumberOfCharacters] = useState(0);
  const [numberOfMistakes, setNumberOfMistakes] = useState(0);
  const handleOnChange = (e) => {
    console.log(e);
    if (!isTimeRunning) {
      console.log("good");
      setIsTimeRunning(true);
    }
    console.log(e.target.value);
    setTypedValue(e.target.value);
    setNumberOfWords(
      testDetailsCalculator(props.originalValue, typedValue, "words")
    );
    if (e.nativeEvent.data == " ") {
      setNumberOfCharacters(
        testDetailsCalculator(props.originalValue, typedValue, "characters")
      );
      setNumberOfMistakes(
        testDetailsCalculator(props.originalValue, typedValue, "mistakes")
      );
      props.OnTyping(numberOfWords, numberOfMistakes);
    }
  };
  useEffect(() => {
    if (props.timeRemain <= 0) {
      setIsTimeRunning(false);
      console.log(listOfWords);
      props.OnFinished(numberOfWords, numberOfMistakes, numberOfCharacters);
    }
    props.OnTicking(numberOfWords);
  }, [props.timeRemain]);

  useEffect(() => {
    if (isTimeRunning && props.timeRemain > 0) {
      const timeintervalID = window.setInterval(() => {
        props.OnCountDown();
      }, 1000);
      return () => window.clearInterval(timeintervalID);
    }
  }, [isTimeRunning]);

  const listOfWords = props.originalValue.split("").map((word, index) => {
    return (
      <>
        {!typedValue[index] ? (
          <span className="standard-word">{word}</span>
        ) : props.originalValue.split("")[index] == typedValue[index] ? (
          <span className="correctWord">{word}</span>
        ) : (
          <span className="incorrectWord">{typedValue[index]}</span>
        )}
      </>
    );
  });

  return (
    <div className="typing-challenge">
      <div className="timer-container">
        <p className="timer">00:{props.timeRemain}</p>
        <p className="timer-info">start typing to start the test</p>
      </div>

      <div className="textarea-container">
        <div className="textarea-left ">
          {/* <textarea
            className="textarea"
            disable={true}
            value={props.originalValue}
          /> */}
          <div className="textarea">{listOfWords}</div>
        </div>

        <div className="textarea-right">
          <textarea className="textarea-hidden" onChange={handleOnChange} />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    timeCount: state.timeCount,
    timeRemain: state.timeRemain,
    originalValue: state.originalValue,
  };
};

const mapDispathToProps = (dispatch) => {
  return {
    OnCountDown: () => dispatch({ type: "COUNT_DOWN" }),
    OnFinished: () =>
      dispatch({
        type: "FINISHED",
      }),
    OnTyping: (words, mistakes) =>
      dispatch({
        type: "ON_TYPING",
        payload: {
          numberOfWords: words,
          numberOfMistakes: mistakes,
        },
      }),
    OnTicking: (words) =>
      dispatch({ type: "ON_TICKING", numberOfWords: words }),
  };
};
export default connect(mapStateToProps, mapDispathToProps)(TypingChallenge);
