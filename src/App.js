import React, { useState, useEffect } from "react";
import PubNub from "pubnub";
import { PubNubProvider, usePubNub } from "pubnub-react";
import "./App.css";
import WordBoard from "./components/WordBoard";
import GameWarmup from "./components/GameWarmup";
import GamePlay from "./components/GamePlay";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Results from "./components/Results";

function App() {
  //localStorage.clear()
  const [playerCount, setPlayerCount] = useState(null);
  const [time, setTime] = useState(5);
  const [count, setCount] = useState(null);
  const [channelName, setChannelName] = useState(null);
  const uuid = PubNub.generateUUID();
  const pubnub = new PubNub({
    publishKey: "pub-c-99b71c64-0ace-4bc8-bedf-58fffe94ef2c",
    subscribeKey: "sub-c-8c8fcba4-6d9b-11eb-a2ab-226faaaba132",

    uuid: uuid,
  });


  useEffect(() => {
    const handlePresence = (event) => {
      var occupancy = event.occupancy;
      var channelName = event.channel;
      setChannelName(channelName);
      setCount(occupancy);
    };
    pubnub.addListener({ presence: handlePresence });
  }, []);

  useEffect(() => {
    if (count === 2) {
      const timeInterval = setInterval(() => {
        if (time > 0) {
          setTime(time - 1);
        }

        if (time === 0) {
          setPlayerCount(count);
          clearInterval(timeInterval);
        }
      }, 1000);

      return () => {
        clearInterval(timeInterval);
      };
    }
  }, [count, time]);
  return (
    <PubNubProvider client={pubnub}>
      <Router>
        <Route
          path="/"
          exact
          component={
            playerCount === 2
              ? () => <GamePlay channelName={channelName} />
              : GameWarmup
          }
        />
        <Route
          path="/results"
          exact
          component={() => <Results channelName={channelName} />}
        />
      </Router>
    </PubNubProvider>
  );
}

export default App;
