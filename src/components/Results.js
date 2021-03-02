import React, { useEffect, useState } from "react";
import { useHistory, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { gameActions } from "../actions/game.actions";
import MetaTags from "react-meta-tags";
import GamePlay from "./GamePlay";

const Results = ({ socket, gameplayMusic }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [results, setResults] = useState([]);
  const [notification, setNotification] = useState(null);
  const [loadResults, setLoadResults] = useState(true);
  const [sentRequest, setSentRequest] = useState(false);
  const [receivedRequests, setReceivedRequests] = useState(false);
  const [requestRejected, setRequestRejected] = useState(false);
  const [creatorDisconnected, setCreatorDisconnected] = useState(false);
  const gameStatus = useSelector((state) => state.gameReducer.gameStatus);
  const room = useSelector((state) => state.gameReducer.room);
  const creator = useSelector((state) => state.gameReducer.creator);
  const acceptRequest = useSelector((state) => state.gameReducer.acceptRequest);

  // if (acceptRequest === true) {
  //   // return (
  //   //   <GamePlay socket={socket} gameplayMusic={gameplayMusic} />
  //   //   // <div className="loading-container">
  //   //   //   <div className="loading-card">
  //   //   //     <div className="lds-ring-result">
  //   //   //       <div></div>
  //   //   //       <div></div>
  //   //   //       <div></div>
  //   //   //       <div></div>
  //   //   //     </div>
  //   //   //   </div>
  //   //   // </div>
  //   // );
  //   history.push("/");
  // }

  useEffect(() => {
    socket.emit("gameEnd", { room });

    const resultHandler = (data) => {
      // if (data == null && JSON.parse(localStorage.getItem("results"))) {
      //   setResults(JSON.parse(localStorage.getItem("results")));
      // } else {
      localStorage.setItem("results", JSON.stringify(data));
      setResults(data);
      dispatch(gameActions.acceptRequest());
      // setResults((data) => {
      //   if (data !== null) {
      //     socket.emit("leaveRoom", "bye");
      //   }
      //   return data;
      // });

      //}
    };

    const rematchHandler = (data) => {
      if (data > 1) {
        setReceivedRequests(true);
        setNotification(`${data} players have requested a rematch`);
      } else if (data == null || data == 0) {
        setNotification(null);
        setReceivedRequests(false);
      } else {
        setReceivedRequests(true);
        setNotification(`${data} player has requested a rematch`);
      }
    };
    const disconnectHandler = (data) => {
      setNotification(data);
      setSentRequest(false);
      setCreatorDisconnected(true);
    };

    const startHandler = (data) => {
      dispatch(gameActions.startGame());
      setRequestRejected(false);
      setSentRequest(false);
      setNotification(null);
    };
    const rematchResponseHandler = (data) => {
      if (data === "rejected") {
        setSentRequest(false);
        setRequestRejected(true);
        setNotification("Your rematch request was rejected");
      }
    };

    const absenceHandler = (data) => {
      setNotification(data);
      setLoading(false);
    };
    socket.on("startGame", startHandler);
    socket.on("gameResults", resultHandler);
    socket.on("rematchResponse", rematchResponseHandler);
    socket.on("receiveRematchRequest", rematchHandler);
    socket.on("creatorDisconnectOnRequest", disconnectHandler);
    socket.on("creator-not-here", absenceHandler);

    return () => {
      socket.off("gameResults", resultHandler);
      socket.off("receiveRematchRequest", rematchHandler);
      socket.off("creatorDisconnectOnRequest", disconnectHandler);
      socket.off("rematchResponse", rematchResponseHandler);
      socket.off("startGame", startHandler);
      socket.off("creator-not-here", absenceHandler);

      //socket.emit("leaveRoom", "leave");
    };
  }, []);

  if (gameStatus === "started") {
    return <Redirect to="/" />;
  }

  return (
    <>
      <MetaTags>
        <title>Battle Results | Word Battle</title>
        <meta
          name="Word Battle"
          content="You have 90 seconds to compete in a room."
        />
        <meta property="og:title" content="Stingy Cards" />
      </MetaTags>
      <div className="result-container">
        <div className="result-card">
          <div
            className={notification ? "notifications-fadeIn" : "notifications"}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <p
              className={notification ? "notif-p" : "notif-p-fadeOut"}
              style={{ color: "white" }}
            >
              {notification}
            </p>
          </div>

          <div className="result-padding">
            <h1>Top Players for this round</h1>

            {results !== null ? (
              results.slice(0, 8).map((result, index) => {
                return (
                  <p style={{ fontSize: 18, marginTop: 25 }} key={result.id}>
                    {index + 1}. {result.playername}{" "}
                    <strong>({result.points} points)</strong>
                  </p>
                );
              })
            ) : (
              <p
                style={{
                  marginTop: 20,
                  marginBottom: 40,
                  lineHeight: 2,
                  textAlign: "center",
                }}
              >
                The leaderboard for this round is no longer available. <br />
                Go home to play again with your friends
              </p>
            )}

            <div style={{ marginBottom: 30 }}></div>

            {!receivedRequests ? (
              <>
                {creatorDisconnected ? (
                  <></>
                ) : (
                  <>
                    {creator ? (
                      <div style={{ marginBottom: 30 }}></div>
                    ) : (
                      <>
                        {!results ? (
                          <></>
                        ) : (
                          <button
                            onClick={() => {
                              socket.emit("sendRematchRequest", room);
                              setSentRequest(true);
                              setNotification(
                                "Waiting for room owner to accept your rematch"
                              );
                            }}
                            style={{ marginTop: 50 }}
                            className="warmup-btn-inv"
                            disabled={sentRequest}
                          >
                            {sentRequest ? (
                              <>
                                <div className="lds-ring">
                                  <div></div>
                                  <div></div>
                                  <div></div>
                                  <div></div>
                                </div>
                              </>
                            ) : (
                              <>
                                {requestRejected === true ? (
                                  <p> {"Request Rematch Again"}</p>
                                ) : (
                                  <>
                                    <p>Request Rematch</p>
                                  </>
                                )}
                              </>
                            )}
                          </button>
                        )}
                      </>
                    )}
                  </>
                )}

                <button
                  onClick={() => {
                    dispatch(gameActions.setMusicStatus(null));
                    socket.emit("leaveRoom", room);
                    history.push("/");
                  }}
                  style={{ marginTop: 10 }}
                  className="warmup-btn-inv"
                >
                  Go Home
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    dispatch(gameActions.setMusicStatus(null));
                    dispatch(gameActions.prepareToStart(socket, room));
                    socket.emit("acceptRematchRequest", room);
                  }}
                  style={{ marginTop: 50 }}
                  className="warmup-btn-inv"
                  disabled={sentRequest}
                >
                  Accept Rematch
                </button>

                <button
                  onClick={() => {
                    socket.emit("rejectRematchRequest", room);
                    setNotification(null);
                    setReceivedRequests(false);
                  }}
                  style={{ marginTop: 10 }}
                  className="warmup-btn-inv"
                >
                  Reject Rematch
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Results;
