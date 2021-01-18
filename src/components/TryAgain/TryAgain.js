import "./TryAgain.css";

const TryAgain = () => {
  const refreshPage = () => {
    window.location.reload(false);
  };
  return (
    <div className="try-again-container">
      <h1>Test Results</h1>

      <div className="result-container">{/* Test Results */}</div>

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
export default TryAgain;
