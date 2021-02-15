import React, { useEffect, useState } from "react";
import { usePubNub } from "pubnub-react";
import { useHistory } from "react-router-dom";

const Results = ({ channelName }) => {
    
  const pubnub = usePubNub();
  const history = useHistory();
  const [results, setResults] = useState([]);
  const [reloaded, setReloaded] = useState(false);
  const [messages, setMessages] = useState(null);
  var playerInfoJSON = JSON.parse(localStorage.getItem("player-info"));

  useEffect(() => {
    //  localStorage.clear()
    // console.log(localStorage.getItem("channel"));
    if (
      localStorage.getItem("channel") === null &&
      localStorage.getItem("player-info") === null
    ) {
      history.push("/");
    } else {
      pubnub
        .publish({
          channel: localStorage.getItem("channel"),
          message: { "player-info": playerInfoJSON },
        })
        .then((res) => {
          pubnub.fetchMessages(
            {
              channels: [localStorage.getItem("channel")],
              end: res,
              count: 25,
            },
            function (status, response) {
              console.log(response);
              response.channels[localStorage.getItem("channel")].forEach(
                (item) => {
                  if (item.message["player-info"]) {
                    setResults((results) => [...results, { ...item }]);
                  }
                }
              );
            }
          );

          //   if (localStorage.getItem("reloaded") === "null") {
          //     window.location.reload();
          //     // localStorage.setItem("reloaded", true);
          //   }

          localStorage.setItem("player-info", null);
        });
    }
  }, []);

  useEffect(() => {
    // if (localStorage.getItem("reloaded") === "null") {
    //   setTimeout(() => {
    //     window.location.reload();
    //     localStorage.setItem("reloaded", true);
    //   }, 5000);
    // }
  }, []);

  useEffect(() => {
    const handleMessage = (event) => {
      const message = event.message;
      const text = message.text || message;
      const previousMessages = [...messages];
      previousMessages[0] = { ...previousMessages[0], ...text };
      setMessages(previousMessages);
    };

    pubnub.addListener({ message: handleMessage });

    return () => {
      pubnub.removeListener({ message: handleMessage });
    };
  }, []);

  if (localStorage.getItem("reloaded") === "null") {
    return (
      <div className="loading-container">
        <div className="loading-card">
          <div className="lds-ring-result">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="result-container">
        <div className="result-card">
          {/* <h1>Dotting Is and crossing Ts...</h1>
        <p>Gathering results and cross-checking answers</p> */}

          <h1>Top Players for this round</h1>

          {results &&
            results.map((result, index) => {
              return (
                <p style={{ fontSize: 23 }} key={result.uuid}>
                  {index + 1}. {result.message["player-info"].playername}{" "}
                  <strong>
                    ({result.message["player-info"].points} points)
                  </strong>
                </p>
              );
            })}

          <button
            onClick={() => {
              history.push("/");
            }}
            style={{ marginTop: 50 }}
            className="warmup-btn-inv"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }
};

export default Results;
