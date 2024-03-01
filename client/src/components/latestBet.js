// LatestBet.js
import React from 'react';

const LatestBet = ({ latestBet }) => {
  let message;
  if (!latestBet) {
    message = "Go play, place your 1st bet";
  } else {
    const { amount, number } = latestBet;
    if (amount > 0) {
      message = `You won $${amount} by placing a bet on number ${number}`;
    } else if (amount < 0) {
      message = `You lost $${-amount} by placing a bet on number ${number}`;
    } else {
      message = "No change in balance after the last bet";
    }
  }

  return (
    <div style={{ color: 'white', textAlign: 'center' }}>
      <h1>LatestBet :</h1>
      <p>{message}</p>
    </div>

  );
};

export default LatestBet;
