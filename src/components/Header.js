import React from "react";
import { useSelector } from "react-redux";

const Header = ({ points, notification, time, opponent }) => {
  const connectedPlayers = useSelector(
    (state) => state.gameReducer.connectedPlayers
  );
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
            <strong>
              You're competing with {connectedPlayers - 1}{" "}
              {connectedPlayers - 1 == 1 ? "player" : "players"}
            </strong>
            {opponent}
          </p>
        </>
      )}
    </div>
  );
};

export default Header;
