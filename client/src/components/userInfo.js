// userInfo.js
import React from 'react';

const UserInfo = ({ userName,userAmount, poolAmount }) => {
  const currentTime = new Date();
  const formattedTime = currentTime.toLocaleTimeString('en-US', { hour12: false }).slice(0, 5);
  return (
    <div style={{ color: 'white', textAlign: 'center' }}>
      <h2>Hi {userName},<br/>
      current pool size: ${poolAmount}<br />
      & your available balance: ${userAmount}<br />
      at time: {formattedTime}</h2>
    </div>
  );
};

export default UserInfo;

