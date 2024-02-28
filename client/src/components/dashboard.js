// Dashboard.js

import React, { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = ({ token, userName, onLogout }) => {
  const [currentTime, setCurrentTime] = useState("");
  const [latestBet, setLatestBet] = useState("");
  const [betAmount, setBetAmount] = useState(0);
  const [selectedNumber, setSelectedNumber] = useState(0);
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [poolAmount, setPoolAmount] = useState(100);

  useEffect(() => {
    fetchTime();
    fetchLatestBet();
    fetchTransactionHistory();
  }, [token]);

  const fetchTime = async () => {
    try {
      const response = await axios.get("http://localhost:5000/game/time", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCurrentTime(response.data.time);
    } catch (error) {
      console.error("Error fetching time:", error);
    }
  };

  const fetchLatestBet = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/game/latestbet",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLatestBet(response.data.latestBet);
    } catch (error) {
      console.error("Error fetching latest bet:", error);
    }
  };

  const fetchTransactionHistory = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/game/transactionhistory",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTransactionHistory(response.data.transactionHistory);
    } catch (error) {
      console.error("Error fetching transaction history:", error);
    }
  };

  const handleSpinWheel = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/game/spin",
        { betNo: selectedNumber, betAmount },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { randomNumber, result, profitLoss } = response.data;
      // Update pool amount
      setPoolAmount(poolAmount + profitLoss);
      // Update transaction history
      setTransactionHistory([
        ...transactionHistory,
        {
          betNo: selectedNumber,
          betAmount,
          result,
          profitLoss,
          updatedAt: new Date().toISOString(),
        },
      ]);
      // Fetch latest bet and time
      fetchLatestBet();
      fetchTime();
    } catch (error) {
      console.error("Error spinning the wheel:", error);
    }
  };

  return (
    <div>
      <div style={{ float: "right" }}>
        <button onClick={onLogout}>Logout</button>
        <br />
        <div style={{ height: "100px", width: "100px", background: "red" }}>
          <img src="wheel_image.jpg" alt="Wheel" />
          <br />
        </div>
        <button onClick={handleSpinWheel}>Spin Wheel</button>
      </div>
      <h2>Hi {userName ? userName : "raju"},</h2>
      <p>
        Current pool size
        <br /> at time: {currentTime}
        <br /> is ${poolAmount}
      </p>
      <p>Latest bet: {latestBet}</p>
      <p>Transaction History</p>
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
            <tr>
                <th>Bet no.</th>
                <th>Username</th>
                <th>Bet Value</th>
                <th>Result</th>
                <th>Profit/Loss</th>
                <th>Updated at</th>
            </tr>
        </thead>
        <tbody>
            {transactionHistory.map((transaction, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{userName}</td>
                <td>${transaction.betAmount}</td>
                <td>{transaction.result}</td>
                <td>${transaction.profitLoss}</td>
                <td>{new Date(transaction.updatedAt).toLocaleString()}</td>
              </tr>
            ))}
        </tbody>
      </table>

      <div>
        <h3>Place a Bet</h3>
        <input
          type="number"
          value={betAmount}
          onChange={(e) => setBetAmount(e.target.value)}
          placeholder="Enter Bet Amount"
        />
        <input
          type="number"
          value={selectedNumber}
          onChange={(e) => setSelectedNumber(e.target.value)}
          placeholder="Enter Selected Number (0-30)"
          min="0"
          max="30"
        />
      </div>
    </div>
  );
};

export default Dashboard;
