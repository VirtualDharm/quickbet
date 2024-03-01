// TransactionHistory.js
import React from 'react';

const TransactionHistory = ({ transactionHistory }) => {
  // Dummy data for testing
  const dummyData = [
    {
      updatedAt: '2024-02-29T12:34:56Z',
      betAmount: 50,
      target: 'Red',
      result: 'Win',
      amountBefore: 100,
      amountAfter: 150,
      profitLoss: 50
    },
    {
      updatedAt: '2024-02-29T13:45:30Z',
      betAmount: 25,
      target: 'Black',
      result: 'Lose',
      amountBefore: 150,
      amountAfter: 125,
      profitLoss: -25
    }
  ];

  return (
    <div style={{ color: "white", textAlign: "center" }}>
      <p>Transaction History</p>
      <table style={{ borderCollapse: "collapse", width: "100%", border: "1px solid black" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid black" }}>Bet No.</th>
            <th style={{ border: "1px solid black" }}>Bet Time</th>
            <th style={{ border: "1px solid black" }}>Bet Value</th>
            <th style={{ border: "1px solid black" }}>Target</th>
            <th style={{ border: "1px solid black" }}>Result</th>
            <th style={{ border: "1px solid black" }}>Amount Before</th>
            <th style={{ border: "1px solid black" }}>Amount After</th>
            <th style={{ border: "1px solid black" }}>Profit/Loss</th>
          </tr>
        </thead>
        <tbody>
          {dummyData.map((transaction, index) => (
            <tr key={index}>
              <td style={{ border: "1px solid black" }}>{index + 1}</td>
              <td style={{ border: "1px solid black" }}>{new Date(transaction.updatedAt).toLocaleString()}</td>
              <td style={{ border: "1px solid black" }}>${transaction.betAmount}</td>
              <td style={{ border: "1px solid black" }}>{transaction.target}</td>
              <td style={{ border: "1px solid black" }}>{transaction.result}</td>
              <td style={{ border: "1px solid black" }}>${transaction.amountBefore}</td>
              <td style={{ border: "1px solid black" }}>${transaction.amountAfter}</td>
              <td style={{ border: "1px solid black" }}>${transaction.profitLoss}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionHistory;
