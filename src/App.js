import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { gameActions } from "./actions/game.actions";
import io from "socket.io-client";
import "./App.css";
import WordBoard from "./components/WordBoard";
import GameWarmup from "./components/GameWarmup";
import GamePlay from "./components/GamePlay";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Results from "./components/Results";
import Splash from "./components/Splash";
import gameplay from "./assets/gameplay.mp3";

function App() {
  const dispatch = useDispatch();
  const [playerCount, setPlayerCount] = useState(null);
  const [time, setTime] = useState(5);
  const [count, setCount] = useState(null);
  const [channelName, setChannelName] = useState(null);
  const [socket, setSocket] = useState(null);

  const gameStatus = useSelector((state) => state.gameReducer.gameStatus);
  const musicStatus = useSelector((state) => state.gameReducer.musicStatus);

  let gameplayMusic = useRef();

  useEffect(() => {
    gameplayMusic.current = new Audio(gameplay);
    gameplayMusic.current.volume = 0.15;
    return () => {
      gameplayMusic.current.pause();
    };
  }, []);

  useEffect(() => {
    const socket = io("http://word-battle.com"); //formerly http://localhost:4000
    setSocket(socket);

    const connectionCountHandler = (data) => {
      dispatch(gameActions.saveConnectedPlayers(data.length));
    };

    socket.on("connected-players", connectionCountHandler);
  }, []);

  if (socket) {
    return (
      <Router>
        {gameStatus === "started" && (
          <Route
            path="/"
            exact
            component={() => (
              <GamePlay socket={socket} gameplayMusic={gameplayMusic.current} />
            )}
          />
        )}

        <Route
          path="/"
          exact
          component={() => (
            <GameWarmup socket={socket} gameplayMusic={gameplayMusic.current} />
          )}
        />

        <Route
          path="/results"
          exact
          component={() => (
            <Results socket={socket} gameplayMusic={gameplayMusic.current} />
          )}
        />
      </Router>
    );
  } else {
    return <div className="splash-bg"></div>;
  }
}

export default App;
