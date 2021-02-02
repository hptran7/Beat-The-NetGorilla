import React from "react";
import "./FrontPage.css";
const FrontPage = (props) => {
  return (
    <div className="box">
      <div className="content">
        <h1>Beat The NetGorilla</h1>
        <p>
          Hello, welcome to "Beat The NetGorilla". Your computer is being hacked
          by a gorilla. To protect your precious computer, you have to defeat
          him in a speed typing text. But beware, this gorilla is extremely
          intelligent, he will try to cheat by hiding some characters. Your job
          is to guest the correct words and type faster than him. May the odds
          be ever in your favor!
        </p>
        <a
          onClick={() => {
            props.history.push("/game");
          }}
        >
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          Start Game!
        </a>
      </div>
    </div>
  );
};

export default FrontPage;
