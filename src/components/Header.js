import React from "react";

const Header = ({ points, notification, time, opponent }) => {
  return (
    <div className="header">
      {notification ? (
        <p>
          <strong>{notification}</strong>
        </p>
      ) : (
        <>
          <p>
            <strong>Time Left: </strong>
            {time} seconds
          </p>
          <p>
            <strong>Points: </strong>
            {points}pts
          </p>
          <p>
            <strong>Who you're playing against: </strong>
            {opponent}
          </p>
        </>
      )}
    </div>
  );
};

export default Header;
