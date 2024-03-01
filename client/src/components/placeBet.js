// PlaceBet.js
import React, { useState } from "react";

const PlaceBet = ({ onPlaceBet }) => {
  const [betAmount, setBetAmount] = useState('');
  const [selectedNumber, setSelectedNumber] = useState('');

  const handlePlaceBet = () => {
    onPlaceBet(selectedNumber, betAmount);
    // Reset input fields after placing the bet
    setBetAmount(0);
    setSelectedNumber(0);
  };

  return (
    <div style={{ color: "white", textAlign: "center" }}>
      <h3>Place a Bet : <button onClick={handlePlaceBet}>Click here</button></h3>
      <br />
      <input
        type="number"
        value={betAmount}
        onChange={(e) => setBetAmount(e.target.value)}
        placeholder="Enter Bet Amount"
        style={{ width: "80%"}}
      />
      <br />
      <input
        type="number"
        value={selectedNumber}
        onChange={(e) => setSelectedNumber(e.target.value)}
        placeholder="Enter Selected Number (0-30)"
        min="0"
        max="30"
        style={{ width: "80%"}}
      />
    </div>
  );
};

export default PlaceBet;
