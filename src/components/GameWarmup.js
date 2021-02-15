import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { ThreeHorseLoading } from "react-loadingg";
import { usePubNub } from "pubnub-react";
import shortid from "shortid";

const GameWarmup = () => {
  const [playername, setPlayername] = useState("");
  const [roomIdVal, setRoomIdVal] = useState("");
  const [roomId, setRoomId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([{}]);
  const [isCreator, setIsCreator] = useState(false);
  const [playerCount, setPlayerCount] = useState(null);
  const [ready, setReady] = useState(false);
  const [time, setTime] = useState(5);
  const [lobbyChannel, setLobbyChannel] = useState(null);
  const [notification, setNotification] = useState(null);
  const [clicked, setClicked] = useState("warmup");
  const pubnub = usePubNub();

  useEffect(() => {
    const handleMessage = (event) => {
      const message = event.message;
      const text = message.text || message;
      const previousMessages = [...messages];
      previousMessages[0] = { ...previousMessages[0], ...text };
      setMessages(previousMessages);
    };

    const handlePresence = (event) => {
      var occupancy = event.occupancy;
      setPlayerCount(occupancy);
    };
    pubnub.addListener({ message: handleMessage });
    pubnub.addListener({ presence: handlePresence });

    return () => {
      pubnub.removeListener({ message: handleMessage });
      pubnub.removeListener({ presence: handlePresence });
    };
  }, []);

  useEffect(() => {}, [ready]);

  useEffect(() => {
    if (roomId != null) {
      setLobbyChannel("tictactoelobby--" + roomId);
      localStorage.setItem("channel", "tictactoelobby--" + roomId);
      pubnub.subscribe({
        channels: ["tictactoelobby--" + roomId],
        withPresence: true,
      });
      pubnub.publish({
        channel: "tictactoelobby--" + roomId,
        message: { owner: playername },
      });
    }
  }, [roomId]);

  useEffect(() => {
    if (playerCount === 2) {
      setReady(true);
      setLoading(false);
      const timeInterval = setInterval(() => {
        if (time > 0) {
          setTime(time - 1);
        }

        if (time === 0) {
          clearInterval(timeInterval);
        }
      }, 1000);

      return () => {
        clearInterval(timeInterval);
      };
    }
  }, [playerCount, time]);

  const onPressCreate = (e) => {
    // Create a random name for the channel

    setRoomId(shortid.generate().substring(0, 5));
  };

  const onPressJoin = (e) => {
    if (roomIdVal.length === 5) {
      pubnub
        .hereNow({
          channels: [lobbyChannel],
        })
        .then((response) => {
          if (response.totalOccupancy < 2) {
            pubnub.subscribe({
              channels: [lobbyChannel],
              withPresence: true,
            });
            pubnub.publish({
              channel: lobbyChannel,
              message: { joiner: playername },
            });
          } else {
            setNotification("This battle has already started.");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className="warmup-container">
      <div className="warmup-card">
        {!ready ? (
          <>
            {clicked === "warmup" && (
              <>
                <h1>Howdy {playername}!</h1>
                <p>What's the name you're most proud of?</p>
                <input
                  placeholder="Enter your name"
                  value={playername}
                  onChange={(e) => {
                    localStorage.setItem("name", e.target.value);
                    setPlayername(e.target.value);
                  }}
                />
                <button
                  onClick={() => {
                    setIsCreator(true);
                    localStorage.setItem("role", "owner");
                    onPressCreate();
                    setClicked("create");
                  }}
                  className="warmup-btn"
                >
                  Create Game
                </button>
                <button
                  onClick={() => {
                    setIsCreator(false);
                    localStorage.setItem("role", "joiner");
                    setClicked("join");
                  }}
                  className="warmup-btn-inv"
                >
                  Join Game
                </button>
              </>
            )}

            {clicked === "create" && (
              <>
                <p>Waiting for a player to join...</p>
                <h1 style={{ marginTop: 30 }}>{roomId}</h1>
                <p style={{ textAlign: "center", lineHeight: 2 }}>
                  Share your room id with a friend to join this room and compete
                  with you. Once someone joins, your battle starts immediately
                </p>

                <button
                  onClick={() => {
                    setClicked("warmup");
                  }}
                  className="warmup-btn"
                >
                  Go Back
                </button>
              </>
            )}
            {clicked === "join" && (
              <>
                <h1>Enter with a room id</h1>
                {notification ? (
                  <p style={{ marginBottom: 50, color: "red" }}>
                    {notification}
                  </p>
                ) : (
                  <p style={{ marginBottom: 50, textAlign: "center" }}>
                    Join this battle
                  </p>
                )}

                <input
                  placeholder="Room ID"
                  value={roomIdVal}
                  onChange={(e) => {
                    setRoomIdVal(e.target.value);

                    setLobbyChannel("tictactoelobby--" + e.target.value);
                    localStorage.setItem(
                      "channel",
                      "tictactoelobby--" + e.target.value
                    );
                  }}
                />
                <button
                  onClick={() => {
                    setLoading(true);
                    onPressJoin();
                  }}
                  className="warmup-btn"
                >
                  {loading ? (
                    <>
                      <div class="lds-ring">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                      </div>
                    </>
                  ) : (
                    "Join Game"
                  )}
                </button>
                <button
                  onClick={() => {
                    setClicked("warmup");
                  }}
                  className="warmup-btn-inv"
                >
                  Go Back
                </button>
              </>
            )}
          </>
        ) : (
          <>
            <p style={{ marginBottom: 50 }}>Battle starts in..</p>

            <h1 style={{ marginBottom: 30, fontSize: 100 }}>{time}</h1>
          </>
        )}
      </div>
    </div>
  );
};

export default GameWarmup;
