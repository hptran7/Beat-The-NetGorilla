import "./TypingChallenge.css";
import { connect } from "react-redux";
import React, { useEffect, useState, useRef } from "react";
import testDetailsCalculator from "../../helper/testDetailsCalculator";
import { Icon, InlineIcon } from "@iconify/react";
import refreshIcon from "@iconify-icons/mdi/refresh";
import { randomElementSelector } from "../../helper/randomSelector";

const TypingChallenge = (props) => {
  const [isTimeRunning, setIsTimeRunning] = useState(false);
  const [typedValue, setTypedValue] = useState("");
  const [numberOfWords, setNumberOfWords] = useState(0);
  const [numberOfDiferrences, setNumberOfDiferrences] = useState(0);
  const [numberOfMistakes, setNumberOfMistakes] = useState(0);
  const [currentWord, setCurrentWord] = useState(0);
  const [traps, setTraps] = useState([]);
  const [mixedWords, setMixedWords] = useState("");
  const [testQuote, setTestQuote] = useState("");
  const [refresh, setRefresh] = useState(false);
  const myRef = useRef(null);
  const executeScroll = () => myRef.current.scrollIntoView();

  const refreshText = () => {
    setRefresh(!refresh);
  };
  const shuffle = (array) => {
    let currentIndex = array.length,
      temporaryValue,
      randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  };

  const generateRandomNumberList = (number, level) => {
    const arr = [];
    while (arr.length < +number) {
      var r = Math.floor(Math.random() * level) + 1;
      if (arr.indexOf(r) === -1) arr.push(r);
    }
    return arr;
  };
  const handleOnChange = (e) => {
    executeScroll();
    setCurrentWord(currentWord + 1);
    if (!isTimeRunning) {
      setIsTimeRunning(true);
    }
    setTypedValue(e.target.value);
    setNumberOfWords(testDetailsCalculator(mixedWords, typedValue, "words"));
    setNumberOfMistakes(
      testDetailsCalculator(mixedWords, typedValue, "mistakes")
    );
    if (e.nativeEvent.data == " ") {
      setNumberOfDiferrences(
        testDetailsCalculator(mixedWords, typedValue, "differences")
      );
      props.OnTyping(numberOfWords, numberOfMistakes);
    }
    if (e.nativeEvent.inputType == "deleteContentBackward") {
      setNumberOfDiferrences(
        testDetailsCalculator(mixedWords, typedValue, "differences")
      );
      setCurrentWord(currentWord - 1);
      props.OnTyping(numberOfWords, numberOfMistakes);
    }
    if (typedValue.split("")[mixedWords.split("").length - 2]) {
      setIsTimeRunning(false);
      setNumberOfDiferrences(
        testDetailsCalculator(mixedWords, typedValue, "differences")
      );
      props.OnFinished(numberOfWords, numberOfDiferrences);
    }
  };
  useEffect(() => {
    if (props.level == 1) {
      setTraps(generateRandomNumberList(50, 3694));
    } else if (props.level == 2) {
      setTraps(generateRandomNumberList(140, 3694));
    } else if (props.level == 3) {
      setTraps(generateRandomNumberList(240, 3694));
    } else if (props.level == 4) {
      setTraps(generateRandomNumberList(340, 3694));
    } else if (props.level == 5) {
      setTraps(generateRandomNumberList(440, 3694));
    }
    if (props.testType == "words") {
      setMixedWords(shuffle(props.originalValue.split(" ")).join(" "));
    } else if (props.testType == "quotes") {
      setMixedWords(randomElementSelector(props.originalQuotes));
    }
  }, [props.level, refresh, props.testType]);
  useEffect(() => {
    if (props.timeRemain <= 0) {
      setIsTimeRunning(false);
      setNumberOfDiferrences(
        testDetailsCalculator(mixedWords, typedValue, "differences")
      );
      props.OnFinished(numberOfWords, numberOfDiferrences);
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

  const listOfWords = mixedWords.split("").map((word, index) => {
    return (
      <div className="div-inline" key={index}>
        {traps.includes(index) && word !== " " ? (
          index == currentWord ? (
            <span ref={myRef} className="current-word">
              _
            </span>
          ) : !typedValue[index] ? (
            <span className="standard-word">_</span>
          ) : mixedWords.split("")[index] == typedValue[index] ? (
            <span className="correctWord">{word}</span>
          ) : (
            <span className="incorrectWord">{typedValue[index]}</span>
          )
        ) : index == currentWord ? (
          <span ref={myRef} className="current-word">
            {word}
          </span>
        ) : !typedValue[index] ? (
          <span className="standard-word">{word}</span>
        ) : mixedWords.split("")[index] == typedValue[index] ? (
          <span className="correctWord">{word}</span>
        ) : (
          <span className="incorrectWord">{typedValue[index]}</span>
        )}
      </div>
    );
  });

  return (
    <div className="typing-challenge">
      <div className="level-container">
        <p className="level-title">Level: </p>
        <button
          className="level-button"
          onClick={() => {
            props.OnChangeLevel(1);
          }}
        >
          level 1
        </button>
        <button
          className="level-button"
          onClick={() => {
            props.OnChangeLevel(2);
          }}
        >
          level 2
        </button>
        <button
          className="level-button"
          onClick={() => {
            props.OnChangeLevel(3);
          }}
        >
          level 3
        </button>
        <button
          className="level-button"
          onClick={() => {
            props.OnChangeLevel(4);
          }}
        >
          level 4
        </button>
        <button
          className="level-button"
          onClick={() => {
            props.OnChangeLevel(5);
          }}
        >
          level 5
        </button>
      </div>
      <div className="level-container">
        <p className="level-title">Type:</p>
        <button
          className="level-button"
          onClick={() => {
            props.OnTypedChange("words");
          }}
        >
          Words
        </button>
        <button
          className="level-button"
          onClick={() => {
            props.OnTypedChange("quotes");
          }}
        >
          Quotes
        </button>
      </div>
      <div className="timer-container">
        <p className="timer">{props.timeRemain}</p>
        <p className="timer-info">start typing to begin the test</p>
      </div>
      <Icon
        icon={refreshIcon}
        width="1.25em"
        height="1.25em"
        onClick={() => {
          refreshText();
        }}
        className="refresh-icon"
      />
      <div className="textarea-container">
        <div className="textarea-left ">
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
    level: state.level,
    originalQuotes: state.originalQuotes,
    testType: state.testType,
  };
};

const mapDispathToProps = (dispatch) => {
  return {
    OnCountDown: () => dispatch({ type: "COUNT_DOWN" }),
    OnFinished: (words, differences) =>
      dispatch({
        type: "FINISHED",
        payload: {
          numberOfDiferrences: differences,
          numberOfWords: words,
        },
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
    OnChangeLevel: (level) => dispatch({ type: "CHANGE_LEVEL", level: level }),
    OnTypedChange: (testType) =>
      dispatch({ type: "TYPE_CHANGE", testType: testType }),
  };
};
export default connect(mapStateToProps, mapDispathToProps)(TypingChallenge);
