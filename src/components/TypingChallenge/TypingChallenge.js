import "./TypingChallenge.css";
import { connect } from "react-redux";
import React, { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import testDetailsCalculator from "../../helper/testDetailsCalculator";
import { Icon } from "@iconify/react";
import refreshIcon from "@iconify-icons/mdi/refresh";
import { randomElementSelector } from "../../helper/randomSelector";
import outlineLeaderboard from "@iconify-icons/ic/outline-leaderboard";
import arrowChange from "@iconify-icons/si-glyph/arrow-change";

const TypingChallenge = (props) => {
  const [isTimeRunning, setIsTimeRunning] = useState(false);
  const [typedValue, setTypedValue] = useState("");
  const [numberOfWords, setNumberOfWords] = useState(0);
  const [numberOfDiferrences, setNumberOfDiferrences] = useState(0);
  const [numberOfMistakes, setNumberOfMistakes] = useState(0);
  const [currentWord, setCurrentWord] = useState(0);
  const [traps, setTraps] = useState([]);
  const [mixedWords, setMixedWords] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [showGuide, setShowguide] = useState(true);
  const myRef = useRef(null);
  const [showOptionNameRefresh, setShowOptionNameRefresh] = useState(false);
  const [showOptionNameLeaderboard, setShowOptionNameLeaderboard] = useState(
    false
  );
  const [showOptionNameRestart, setShowOptionNameRestart] = useState(false);
  const [chosenType, setChosenType] = useState("quotes");
  const [chosenLevel, setChosenLevel] = useState(null);
  const executeScroll = () => myRef.current.scrollIntoView();
  const history = useHistory();

  const punctuationMarks = [
    "!",
    "@",
    "#",
    "$",
    "%",
    "&",
    "*",
    "(",
    ")",
    ",",
    ".",
    "?",
    ":",
    ";",
    " ",
  ];

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
      let r = Math.floor(Math.random() * level) + 1;
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
      setTraps(generateRandomNumberList(50, 3000));
    } else if (props.level == 2) {
      setTraps(generateRandomNumberList(140, 3000));
    } else if (props.level == 3) {
      setTraps(generateRandomNumberList(240, 3000));
    } else if (props.level == 4) {
      setTraps(generateRandomNumberList(340, 3000));
    } else if (props.level == 5) {
      setTraps(generateRandomNumberList(440, 3000));
    }
    if (props.testType == "words") {
      setMixedWords(shuffle(props.originalValue.split(" ")).join(" "));
    } else if (props.testType == "quotes") {
      setMixedWords(randomElementSelector(props.originalQuotes));
    }
    setChosenLevel(props.level);
  }, [props.level, refresh, props.testType]);

  useEffect(() => {
    if (props.timeRemain <= 0 || (props.timeTick > 5 && props.wpm < 30)) {
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
        setShowguide(false);
        props.OnCountDown();
      }, 1000);
      return () => window.clearInterval(timeintervalID);
    }
  }, [isTimeRunning]);

  const listOfWords = mixedWords.split("").map((word, index) => {
    return (
      <div className="div-inline" key={index}>
        {traps.includes(index) && !punctuationMarks.includes(word) ? (
          index == currentWord ? (
            <span ref={myRef} className="current-word">
              _
            </span>
          ) : !typedValue[index] ? (
            <span className="standard-word">_</span>
          ) : mixedWords.split("")[index] == typedValue[index] ? (
            <span className="correctWord">{word}</span>
          ) : (
            <span className="incorrectWord">
              <u>{typedValue[index]}</u>
            </span>
          )
        ) : index == currentWord ? (
          <span ref={myRef} className="current-word">
            {word}
          </span>
        ) : !typedValue[index] ? (
          <span className="standard-word">{word}</span>
        ) : mixedWords.split("")[index] == typedValue[index] ? (
          <span className="correctWord">{word}</span>
        ) : mixedWords.split("")[index] == " " ? (
          <span className="incorrectWord">_</span>
        ) : (
          <span className="incorrectWord">{word}</span>
        )}
      </div>
    );
  });

  return (
    <div className="typing-challenge">
      <div className="level-container">
        <p className="level-title">Level: </p>
        {chosenLevel == 1 ? (
          <button
            className="chosen-level level-button"
            onClick={() => {
              props.OnChangeLevel(1);
            }}
          >
            level 1
          </button>
        ) : (
          <button
            className="level-button"
            onClick={() => {
              props.OnChangeLevel(1);
            }}
          >
            level 1
          </button>
        )}
        {chosenLevel == 2 ? (
          <button
            className="chosen-level level-button"
            onClick={() => {
              props.OnChangeLevel(2);
            }}
          >
            level 2
          </button>
        ) : (
          <button
            className="level-button"
            onClick={() => {
              props.OnChangeLevel(2);
            }}
          >
            level 2
          </button>
        )}
        {chosenLevel == 3 ? (
          <button
            className="chosen-level level-button"
            onClick={() => {
              props.OnChangeLevel(3);
            }}
          >
            level 3
          </button>
        ) : (
          <button
            className="level-button"
            onClick={() => {
              props.OnChangeLevel(3);
            }}
          >
            level 3
          </button>
        )}
        {chosenLevel == 4 ? (
          <button
            className="chosen-level level-button"
            onClick={() => {
              props.OnChangeLevel(4);
            }}
          >
            level 4
          </button>
        ) : (
          <button
            className="level-button"
            onClick={() => {
              props.OnChangeLevel(4);
            }}
          >
            level 4
          </button>
        )}
        {chosenLevel == 5 ? (
          <button
            className="chosen-level level-button"
            onClick={() => {
              props.OnChangeLevel(5);
            }}
          >
            level 5
          </button>
        ) : (
          <button
            className="level-button"
            onClick={() => {
              props.OnChangeLevel(5);
            }}
          >
            level 5
          </button>
        )}
      </div>
      <div className="level-container">
        <p className="level-title">Type:</p>
        {chosenType == "words" ? (
          <button
            className="chosen level-button"
            onClick={() => {
              props.OnTypedChange("words");
              setChosenType("words");
            }}
          >
            Words
          </button>
        ) : (
          <button
            className="level-button"
            onClick={() => {
              props.OnTypedChange("words");
              setChosenType("words");
            }}
          >
            Words
          </button>
        )}
        {chosenType == "quotes" ? (
          <button
            className="chosen level-button"
            onClick={() => {
              props.OnTypedChange("quotes");
              setChosenType("quotes");
            }}
          >
            Quotes
          </button>
        ) : (
          <button
            className="level-button"
            onClick={() => {
              props.OnTypedChange("quotes");
              setChosenType("quotes");
            }}
          >
            Quotes
          </button>
        )}
      </div>
      <div className="timer-container">
        <p className="timer">{props.timeRemain}</p>
        {showGuide ? (
          <p className="timer-info">
            start typing in the box to begin the game
          </p>
        ) : null}
      </div>
      <div className="second-option">
        <div className="icons-row">
          <Icon
            icon={refreshIcon}
            width="1.25em"
            height="1.25em"
            onClick={() => {
              refreshText();
            }}
            className="refresh-icon"
            onMouseEnter={() => {
              setShowOptionNameRefresh(true);
            }}
            onMouseLeave={() => {
              setShowOptionNameRefresh(false);
            }}
          />
          <Icon
            icon={outlineLeaderboard}
            width="1.25em"
            height="1.25em"
            className="refresh-icon"
            onClick={() => {
              props.OnShowLeaderBoard();
            }}
            onMouseEnter={() => {
              setShowOptionNameLeaderboard(true);
            }}
            onMouseLeave={() => {
              setShowOptionNameLeaderboard(false);
            }}
          />
          <Icon
            icon={arrowChange}
            width="1em"
            height="1em"
            className="refresh-icon"
            onMouseEnter={() => {
              setShowOptionNameRestart(true);
            }}
            onMouseLeave={() => {
              setShowOptionNameRestart(false);
            }}
            onClick={() => {
              history.go(0);
            }}
          />
        </div>
        <div className="optionName">
          {showOptionNameRefresh ? (
            <p className="hidden-refresh">refresh</p>
          ) : null}
          {showOptionNameLeaderboard ? (
            <p className="hidden-leaderboard">leaderboard</p>
          ) : null}
          {showOptionNameRestart ? (
            <p className="hidden-leaderboard">Restart Game</p>
          ) : null}
        </div>
      </div>
      <div className="textarea-container">
        <div className="card">
          <span className="moving-line line-1"></span>
          <div className="textarea">{listOfWords}</div>
        </div>

        <textarea className="textarea-hidden" onChange={handleOnChange} />
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
    isFinished: state.isFinished,
    wpm: state.wpm,
    timeTick: state.timeTick,
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
    OnShowLeaderBoard: () => dispatch({ type: "SHOW_LEADERBOARD" }),
  };
};
export default connect(mapStateToProps, mapDispathToProps)(TypingChallenge);
