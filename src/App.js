import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [counterValue, setCounterValue] = useState(null);
  const [inputValue, setInputValue] = useState(1);
  const [loading, setLoading] = useState(false);

  const updateCounterValue = (value) => {
    if (value > 0 || value <= 1000) {
      setLoading(true);
      axios
        .put(
          `https://interview-8e4c5-default-rtdb.firebaseio.com/front-end.json`,
          {
            chetan: value,
          }
        )
        .then((res) => {
          setInputValue(value);
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `https://interview-8e4c5-default-rtdb.firebaseio.com/front-end/chetan.json`
      )
      .then((res) => {
        setCounterValue(res.data);
        setInputValue(res.data);
        setLoading(false);
      });
  }, [inputValue, counterValue]);

  return (
    <div className="App">
      <div className="Counter-container">
        {loading && (
          <div className="loader-container">
            <div className="loader" />
            <p>Saving counter value</p>
          </div>
        )}
        <div className="Counter-inner-container">
          <button
            className="decrement"
            onClick={() => updateCounterValue(inputValue - 1)}
            disabled={inputValue <= 0}
          >
            -
          </button>
          <input
            className="counter-input"
            value={inputValue}
            onChange={(e) => {
              if (!isNaN(parseInt(e.target.value))) {
                updateCounterValue(parseInt(e.target.value));
              }
            }}
          />
          <button
            className="increment"
            onClick={() => updateCounterValue(inputValue + 1)}
            disabled={inputValue >= 1000}
          >
            +
          </button>
        </div>
      </div>
      <div className="Counter-value-container">
        <p>Counter value</p>
        <p>{counterValue}</p>
      </div>
    </div>
  );
}

export default App;
