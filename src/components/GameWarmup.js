import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { isMobile } from "react-device-detect";
import { useHistory } from "react-router-dom";
import { gameActions } from "../actions/game.actions";
import shortid from "shortid";
import Splash from "./Splash";
import CompatibilityWarning from "./CompatibilityWarning";
import MetaTags from "react-meta-tags";
import Peer from "simple-peer";

const GameWarmup = ({ socket, fade, gameplayMusic }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [playername, setPlayername] = useState("");
  const [roomIdVal, setRoomIdVal] = useState("");
  const [roomId, setRoomId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [time, setTime] = useState(5);
  const [notification, setNotification] = useState(null);
  const [clicked, setClicked] = useState("warmup");
  const [showSplash, setShowSplash] = useState(true);
  const [visible, setVisible] = useState(false);
  const [peers, setPeers] = useState([]);
  const [ready, setReady] = useState(false);
  const userAudio = useRef(new Audio());
  const peersRef = useRef([]).current;

  const connectedPlayers = useSelector(
    (state) => state.gameReducer.connectedPlayers
  );
  const players = useSelector((state) => state.gameReducer.players);
  const room = useSelector((state) => state.gameReducer.room);
  const gameStatus = useSelector((state) => state.gameReducer.gameStatus);

  const joinRoom = () => {
    if (roomIdVal.length === 5) {
      setLoading(true);
      setNotification("Waiting for room owner...");
      const creator = false;
      dispatch(gameActions.joinRoom(socket, playername, roomIdVal, creator));
    } else {
      setNotification("Enter a valid room id");
    }
  };

  useEffect(() => {
    if (players.length > 0) {
      setReady(true);
    }
  }, [connectedPlayers]);

  useEffect(() => {
    setTimeout(() => {
      setShowSplash(false);
      setTimeout(() => {
        if (!isMobile) {
          setVisible(true);
        } else {
          setMobile(true);
        }
      }, 200);
    }, 5000);

    const startHandler = (data) => {
      dispatch(gameActions.startGame());
    };

    const roomHandler = (data) => {
      setNotification(data);
      setLoading(false);
    };

    const absenceHandler = (data) => {
      setNotification(data);
      setLoading(false);
    };
    socket.on("startGame", startHandler);
    socket.on("full-room", roomHandler);
    socket.on("creator-not-here", absenceHandler);

    return () => {
      socket.off("startGame", startHandler);
      socket.off("full-room", roomHandler);
      socket.off("creator-not-here", absenceHandler);
    };
  }, []);

  useEffect(() => {
    if (ready) {
      navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
        userAudio.current.srcObject = stream;
        console.log(stream);
        const peers = [];
        players.forEach((player) => {
          if (player.id != socket.id) {
            const peer = createPeer(player.id, socket.id, stream);
            peersRef.push({
              peerId: player.id,
              peer,
            });

            peers.push(peer);
          }
        });

        setPeers(peers);

        socket.on("userJoined", (payload) => {
          const peer = addPeer(payload.signal, payload.callerId, stream);
          peersRef.push({ peerId: payload.callerId, peer });
          setPeers((peers) => [...peers, peer]);
        });

        socket.on("receivingReturnedSignal", (payload) => {
          const item = peersRef.find((peer) => peer.peerId === payload.id);
          item.peer.signal(payload.signal);
        });
      });
    }
  }, [ready]);

  const createPeer = (userToSignal, callerId, stream) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    const id = userToSignal;
    peer.on("signal", (signal) => {
      socket.emit("sendingSignal", { id, callerId, signal });
    });

    return peer;
  };

  const addPeer = (incomingSignal, callerId, stream) => {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      socket.emit("returningSignal", { signal, callerId });
    });
    peer.signal(incomingSignal);

    return peer;
  };

  useEffect(() => {}, [connectedPlayers]);

  if (showSplash) {
    return <Splash />;
  }

  if (mobile) {
    return <CompatibilityWarning />;
  }

  const AudioPlayer = ({ peer }) => {
    const ref = useRef(new Audio()).current;

    useEffect(() => {
      peer.on("stream", (stream) => {
        console.log(stream);
        ref.srcObject = stream;
      });
    }, []);
    return <audio ref={ref} controls volume="true"  autoPlay />;
  };

  return (
    <>
      <MetaTags>
        <title>
          {gameStatus === "started"
            ? "Battleground | Word Battle"
            : "Changeroom | Word Battle"}
        </title>
        <meta
          name="Word Battle"
          content="You have 90 seconds to compete in a room."
        />
      </MetaTags>
      <div className={"warmup-container"}>
        <div className={visible ? "warmup-card-fadeIn" : "warmup-card"}>
          <div
            className={notification ? "notifications-fadeIn" : "notifications"}
          >
            <p
              className={notification ? "notif-p" : "notif-p-fadeOut"}
              style={{ color: "white" }}
            >
              {notification}
            </p>
          </div>

          <div className="warmup-padding">
            <audio autoPlay  muted ref={userAudio} controls volume="true"  />
            {peersRef.map((peer, index) => {
              return <AudioPlayer key={index} peer={peer.peer} />;
            })}
            <div>
              {clicked === "warmup" && (
                <>
                  <h1>Howdy {playername.slice(0, 20)}!</h1>
                  <p>What's the name you're most proud of?</p>
                  <input
                    placeholder="Enter your name"
                    value={playername}
                    maxLength={20}
                    onChange={(e) => {
                      if (e.target.value.length > 1) {
                        setNotification(null);
                      }
                      localStorage.setItem("name", e.target.value);

                      setPlayername(e.target.value);
                    }}
                  />
                  <button
                    onClick={() => {
                      if (playername.length > 1) {
                        setNotification(null);
                        setClicked("create");
                        const creator = true;
                        setRoomId(shortid.generate().substring(0, 5));
                        setRoomId((state) => {
                          dispatch(
                            gameActions.joinRoom(
                              socket,
                              playername,
                              state,
                              creator
                            )
                          );
                          return state;
                        });
                      } else {
                        setNotification("Enter a player name");
                      }
                    }}
                    className="start-btn"
                  >
                    Create Game Room
                  </button>
                  <button
                    onClick={() => {
                      if (playername.length > 1) {
                        setClicked("join");
                      } else {
                        setNotification("Enter a player name");
                      }
                    }}
                    className="warmup-btn-inv"
                  >
                    Join Room
                  </button>
                </>
              )}

              {clicked === "create" && (
                <>
                  {connectedPlayers - 1 == 0 || connectedPlayers - 1 == -1 ? (
                    <p>Waiting for players to join...</p>
                  ) : (
                    <>
                      {connectedPlayers - 1 == 1 ? (
                        <p>
                          <strong>
                            {connectedPlayers - 1} player has joined this room
                          </strong>
                        </p>
                      ) : (
                        <p>
                          <strong>
                            {connectedPlayers - 1} players have joined this room
                          </strong>
                        </p>
                      )}
                    </>
                  )}
                  <h1 style={{ marginTop: 30 }}>{roomId}</h1>
                  <p style={{ textAlign: "center", lineHeight: 2 }}>
                    Share your room id with your friends to join this room and
                    compete with you.
                  </p>
                  {connectedPlayers - 1 >= 1 && (
                    <button
                      onClick={() => {
                        setLoading(true);
                        dispatch(gameActions.prepareToStart(socket, room));
                      }}
                      className="start-btn"
                    >
                      {loading ? (
                        <div>
                          <div className="lds-ring">
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                          </div>
                        </div>
                      ) : (
                        "Start Game"
                      )}
                    </button>
                  )}

                  <button
                    onClick={() => {
                      setNotification(null);
                      setClicked("warmup");

                      setLoading(false);
                      dispatch(gameActions.leaveRoom(socket, room));
                    }}
                    className="warmup-btn-inv"
                  >
                    Go Back
                  </button>
                </>
              )}
              {clicked === "join" && (
                <>
                  <h1>Enter with a room id</h1>

                  <p style={{ marginBottom: 50, textAlign: "center" }}>
                    {connectedPlayers - 1 >= 1 && (
                      <p>The room owner should start the game soon</p>
                    )}
                  </p>

                  <input
                    placeholder="Room ID"
                    value={roomIdVal}
                    maxLength={5}
                    onChange={(e) => {
                      if (e.target.value.length === 5) {
                        setNotification(null);
                      } else {
                        setNotification("Enter a valid room id");
                      }
                      setRoomIdVal(e.target.value);
                    }}
                  />
                  <button
                    onClick={() => {
                      joinRoom();
                    }}
                    disabled={loading}
                    className="start-btn"
                  >
                    {loading ? (
                      <>
                        <div className="lds-ring">
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
                      setNotification(null);
                      setLoading(false);
                      dispatch(gameActions.leaveRoom(socket, room));
                    }}
                    className="warmup-btn-inv"
                  >
                    Go Back
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GameWarmup;
