//dashboard.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import SpinWheel from "./SpinWheel";
import UserInfo from "./userInfo";
import PlaceBet from "./placeBet";
import LatestBet from "./latestBet";
import TransactionHistory from "./transactionHistory";

const Dashboard = ({ token, userName, onLogout }) => {
  const [latestBet, setLatestBet] = useState("");
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [poolAmount, setPoolAmount] = useState(100);
  const [userAmount, setUserAmount] = useState(10);

  useEffect(() => {
    fetchLatestBet();
    fetchTransactionHistory();
  }, [token]);

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

  const updateTransactionHistory = (transaction) => {
    setTransactionHistory([...transactionHistory, transaction]);
  };

  const handlePlaceBet = async (selectedNumber, betAmount) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/game/placebet",
        { selectedNumber, betAmount },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLatestBet(response.data.latestBet);
      // Update transaction history
      fetchTransactionHistory();
    } catch (error) {
      console.error("Error placing bet:", error);
    }
  };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "50% 50%", height:"100vh" }}>
      {/* First Column */}
      <div style={{  borderRight: "1px solid #ccc", display: "grid", gridTemplateRows: "25% 25% 50%" }}>
        {/* UserInfo */}
        <div style={{ borderBottom: "1px solid #ccc" }}>
          <UserInfo
            userName={userName}
            poolAmount={poolAmount}
            userAmount={userAmount}
          />
          {/* Logout Button */}
          <button onClick={onLogout}  style={{position:"absolute", top:"3%", right:"3%" }}>Logout</button>
        </div>
        <div style={{ borderBottom: "1px solid #ccc", display: "grid", gridTemplateColumns: "50% 50%" }}>
          {/* LatestBet */}
          <div style={{ borderRight: "1px solid #ccc" }}>
            <LatestBet latestBet={latestBet} />
          </div>
          {/* PlaceBet */}
          <div>
            <PlaceBet onPlaceBet={handlePlaceBet} />
          </div>
        </div>
        {/* Transaction History */}
        <div style={{ borderBottom: "1px solid #ccc" }}>
          <TransactionHistory transactionHistory={transactionHistory} />
        </div>
      </div>
      {/* Second Column */}
      <div>
        <SpinWheel
          token={token}
          fetchLatestBet={fetchLatestBet}
          updateTransactionHistory={updateTransactionHistory}
          setPoolAmount={setPoolAmount}
          setUserAmount={setUserAmount}
          poolAmount={poolAmount}
        />
      </div>
    </div>
  );
};

export default Dashboard;
