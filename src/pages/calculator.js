import React, { useState, useEffect } from "react";
import CalHeader from "./calHeader";
import KeyPad from "./KeyPad";
import "./calculator.css";

const usedKeyCodes = [
  48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 96, 97, 98, 99, 100, 101, 102, 103,
  104, 105, 8, 13, 190, 187, 189, 191, 56, 111, 106, 107, 109, 67,
];
const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const operators = ["-", "+", "*", "/", "C"];
function Calculator() {
  const [isDarkMode, setIsDarkMode] = useState(
    JSON.parse(localStorage.getItem("calculator-app-mode")) || false
  );
  const [expression, setExression] = useState("");
  const [result, setResult] = useState("");
    const [history, setHistory] = useState(
    JSON.parse(localStorage.getItem("calculator-app-history")) || []
  );
  const clear = () => {
    setExression(""); // Clear the input when "clear" is clicked
    setResult("");    // Clear the result
    setHistory([]);   // Clear the history
  };
  const handleKeyPress = (keyCode, key) => {
    if (!keyCode) return;
    if (!usedKeyCodes.includes(keyCode)) return;
    if (numbers.includes(key)) {
      if (key === "0") {
        if (expression.length === 0) return;
      }
      calculateResult(expression + key);
      setExression(expression + key);
    } else if (operators.includes(key)) {
      if (!expression) return;
      const lastChar = expression.slice(-1);
      if (operators.includes(lastChar)) return;
      if (lastChar === ".") return;
      setExression(expression + key);
    } else if (key === ".") {
      if (!expression) return;
      const lastChar = expression.slice(-1);
      if (!numbers.includes(lastChar)) return;
      setExression(expression + key);
    } else if (keyCode === 8) {
      if (!expression) return;
      calculateResult(expression.slice(0, -1));
      setExression(expression.slice(0, -1));
    } else if (keyCode === 13) {
      if (!expression) return;
      calculateResult(expression);

      let tempHistory = [...history];
      if (tempHistory.length > 20) tempHistory = tempHistory.splice(0, 1);
      tempHistory.push(expression);
      setHistory(tempHistory);
    }
    if (key === "clear") {
      clear();
    }
  };

  const calculateResult = (exp) => {
    if (!exp) {
      setResult("");
      return;
    }
    const lastChar = exp.slice(-1);
    if (!numbers.includes(lastChar)) exp = exp.slice(0, -1);

    const answer = eval(exp).toFixed(2) + "";
    setResult(answer);
  };
  useEffect(() => {
    localStorage.setItem("calculator-app-mode", JSON.stringify(isDarkMode));
  }, [isDarkMode]);
  useEffect(() => {
    localStorage.setItem("calculator-app-history", JSON.stringify(history));
  }, [history]);

  return (
    <div
      className="app"
      tabIndex="0"
      onKeyDown={(event) => handleKeyPress(event.keyCode, event.key)}
      data-theme={isDarkMode ? "dark" : ""}
    >
      <div className="app_calculator">
        <div className="app_calculator_navbar">
         </div>
        <CalHeader expression={expression} result={result} history={history} />
        <KeyPad handleKeyPress={handleKeyPress} />
      </div>
    </div>
  );
}
export default Calculator;
