// PlaceBet.js
import React, { useState } from 'react';

const PlaceBet = ({ onPlaceBet }) => {
  const [betAmount, setBetAmount] = useState(0);
  const [selectedNumber, setSelectedNumber] = useState(0);

  const handlePlaceBet = () => {
    onPlaceBet(selectedNumber, betAmount);
    // Reset input fields after placing the bet
    setBetAmount(0);
    setSelectedNumber(0);
  };

  return (
    <div>
      <h3>Place a Bet</h3><br/>
      <input
        type="number"
        value={betAmount}
        onChange={(e) => setBetAmount(e.target.value)}
        placeholder="Enter Bet Amount"
      /><br/>
      <input
        type="number"
        value={selectedNumber}
        onChange={(e) => setSelectedNumber(e.target.value)}
        placeholder="Enter Selected Number (0-30)"
        min="0"
        max="30"
      /><br/>
      <button onClick={handlePlaceBet}>Place Bet</button>
    </div>
  );
};

export default PlaceBet;
