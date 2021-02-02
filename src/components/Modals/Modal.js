import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import "./Modal.css";
import { Icon } from "@iconify/react";
import crownLine from "@iconify-icons/clarity/crown-line";
import closeOutlined from "@iconify-icons/ant-design/close-outlined";
import axios from "axios";

const Modal = (props) => {
  const returnMonth = (month) => {
    switch (month) {
      case "01":
        return "JAN";
      case "02":
        return "FEB";
      case "03":
        return "MAR";
      case "04":
        return "APR";
      case "05":
        return "MAY";
      case "06":
        return "JUN";
      case "07":
        return "JUL";
      case "08":
        return "AUG";
      case "09":
        return "SEP";
      case "10":
        return "OCT";
      case "11":
        return "NOV";
      case "12":
        return "DEC";
    }
  };
  const [leaderboardScore, setLeaderboardScore] = useState([]);
  const fetchLeaderboardData = async () => {
    await axios
      .get("https://beat-netgorilla.herokuapp.com/leaderboard")
      .then((result) => {
        setLeaderboardScore(result.data);
      });
  };
  const handleCloseButton = () => {
    props.OnCloseBoard();
  };
  const scoreList = leaderboardScore.map((score, index) => {
    const year = score.updatedAt.slice(0, 4);
    const month = returnMonth(score.updatedAt.slice(5, 7));
    const day = score.updatedAt.slice(8, 10);
    let date = month + "-" + day + "-" + year;
    return (
      <Fragment key={index}>
        {index == 0 ? (
          <tr bgcolor="#1a1b1c">
            <td>
              <Icon icon={crownLine} />
            </td>
            <td>{score.userName}</td>
            <td>{score.wpm}</td>
            <td>{score.point}</td>
            <td>{score.accuracy}%</td>
            <td>{date}</td>
          </tr>
        ) : index % 2 !== 0 ? (
          <tr>
            <td>{index + 1}</td>
            <td>{score.userName}</td>
            <td>{score.wpm}</td>
            <td>{score.point}</td>
            <td>{score.accuracy}%</td>
            <td>{date}</td>
          </tr>
        ) : (
          <tr bgcolor="#1a1b1c">
            <td>{index + 1}</td>
            <td>{score.userName}</td>
            <td>{score.wpm}</td>
            <td>{score.point}</td>
            <td>{score.accuracy}%</td>
            <td>{date}</td>
          </tr>
        )}
      </Fragment>
    );
  });

  useEffect(() => {
    fetchLeaderboardData();
  }, []);
  return (
    <div>
      {props.showLeaderBoard ? (
        <div className="background">
          <div className="modalWrapper">
            <span className="moving-line line1" key={1}></span>
            <span className="moving-line line2" key={2}></span>
            <span className="moving-line line3" key={3}></span>
            <span className="moving-line line4" key={4}></span>
            <div className="modal-header">
              <Icon
                icon={closeOutlined}
                onClick={() => {
                  handleCloseButton();
                }}
                className="closeBtn"
                height="1.2m"
                width="1.2em"
              />
              <h1>Leader board</h1>
            </div>
            <div className="modal-body">
              <table>
                <thead>
                  <tr className="leaderboard-title">
                    <td>#</td>
                    <td>name</td>
                    <td>wpm</td>
                    <td>point</td>
                    <td>acc</td>
                    <td>date</td>
                  </tr>
                </thead>
                <tbody>{scoreList}</tbody>
              </table>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

const dispatchStatetoProps = (dispatch) => {
  return {
    OnCloseBoard: () => dispatch({ type: "CLOSE_LEADERBOARD" }),
  };
};

const mapStateToProps = (state) => {
  return {
    showLeaderBoard: state.showLeaderBoard,
  };
};
export default connect(mapStateToProps, dispatchStatetoProps)(Modal);
