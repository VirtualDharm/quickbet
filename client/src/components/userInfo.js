// userInfo.js
import React from 'react';

const UserInfo = ({ userName, poolAmount, userAmount }) => {
  const currentTime = new Date();
  const formattedTime = currentTime.toLocaleTimeString('en-US', { hour12: false }).slice(0, 5);
  return (
    <div>
      <h2>Hi {userName},<br/>
      current pool size: ${poolAmount}<br />
      & your available balance: ${userAmount}<br />
      at time: {formattedTime}</h2>
    </div>
  );
};

export default UserInfo;

