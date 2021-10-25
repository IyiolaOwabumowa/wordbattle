#!/usr/bin/env nodejs
const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const path = require("path");
const axios = require("axios");

const {
  gameResults,
  isCreatorInRoom,
  addPoints,
  joinRoom,
  getRoomCreator,
  getRoomCreatorById,
  generateDeck,
  removeRematchRequest,
  getRematchRequests,
  resetRematchRequests,
  leaveRoom,
  getRoomPlayers,
  startGame,
  startStatus,
} = require("./utils/users.js");

const app = express();
const server = http.createServer(app);
const io = socketio(server);
app.use(express.static(path.join(__dirname, "/../build")));

//app.use(express.static("build"));

//Run when client connects
io.on("connection", (socket) => {
  socket.on("joinRoom", ({ playername, room, creator }, callback) => {
    const initiateJoining = () => {
      const user = joinRoom(socket.id, playername, room, creator);
      if (user.id) {
        socket.join(user.room);
        io.in(user.room).emit(
          "connected-players",
          getRoomPlayers(user.room).length
        );
        callback({
          status: "ok",
        });
      } else {
        socket.emit("full-room", user);
      }
    };

    if (isCreatorInRoom(room) && !creator) {
      initiateJoining();
    } else if (!isCreatorInRoom(room) && creator) {
      initiateJoining();
    } else {
      socket.emit("creator-not-here", "No one owns this room");
    }
  });

  socket.on("sendRematchRequest", (room) => {
    const creator = getRematchRequests(socket.id, room);
    if (creator) {
      socket
        .to(creator.id)
        .emit("receiveRematchRequest", creator.requests.length);
    } else {
      socket.emit(
        "creatorDisconnectOnRequest",
        "The creator of this room was disconnected"
      );
    }
  });

  socket.on("rejectRematchRequest", (room) => {
    const creator = resetRematchRequests(room);

    socket
      .to(creator.id)
      .emit("receiveRematchRequest", creator.requests.length);
    socket.to(room).emit("rematchResponse", "rejected");
  });

  socket.on("acceptRematchRequest", (room) => {
    resetRematchRequests(room);
  });

  socket.on("leaveRoom", (room) => {
    const roomCreator = getRoomCreator(room);

    if (roomCreator) {
      if (socket.id === roomCreator.id) {
        socket
          .to(room)
          .emit(
            "creator-not-here",
            "The creator of this room was disconnected"
          );
      }
    }

    const requestRecepient = removeRematchRequest(socket.id, room);

    if (requestRecepient) {
      socket
        .to(requestRecepient.id)
        .emit("receiveRematchRequest", requestRecepient.requests.length);
    }

    const user = leaveRoom(socket.id);

    if (user) {
      socket.leave(user.room);
      io.in(user.room).emit(
        "connected-players",
        getRoomPlayers(user.room).length
      );
    }
  });

  //Runs when a client disconnects
  socket.on("disconnect", () => {
    const roomCreator = getRoomCreatorById(socket.id);
    if (roomCreator) {
      if (socket.id === roomCreator.id) {
        socket
          .to(roomCreator.room)
          .emit(
            "creator-not-here",
            "The creator of this room was disconnected"
          );
      }
    }

    const user = leaveRoom(socket.id);

    if (user) {
      socket.leave(user.room);
      const creator = removeRematchRequest(socket.id, user.room);
      if (creator) {
        socket
          .to(creator.id)
          .emit("receiveRematchRequest", creator.requests.length);
      }
      io.in(user.room).emit(
        "connected-players",
        getRoomPlayers(user.room).length
      );
    }
  });

  socket.on("prepareToStart", ({ room }) => {
    startGame(room);
    io.in(room).emit("startGame", true);
  });

  socket.on("checkWord", (word) => {
    axios
      .get(
        `https://od-api.oxforddictionaries.com/api/v2/entries/en-gb/${word}?strictMatch=false&fields=definitions`,
        {
          headers: {
            Accept: "application/json",
            app_id: "aa01ce93",
            app_key: "42ff31ae9ce033a7a8e5f3b87531d9c3",
          },
        }
      )
      .then((res) => {
        if (res.status == 200) {
          socket.emit("answer", { word, status: 200 });
          socket.emit("playerPoints", addPoints(socket.id, 5));
        }
      })
      .catch((e) => {
        socket.emit("answer", { word, status: 404 });
      });
  });

  socket.on("readyToStart", (room) => {
    const startDetails = startStatus(socket.id);
    const deck = generateDeck();
    io.in(startDetails.room).emit("getRoomDeck", deck);

    if (startDetails.gameStarted) {
      var time = 90;
      const timeInterval = setInterval(() => {
        if (time === 1) {
          //socket.emit("endGame", )
          clearInterval(timeInterval);
        } else {
          time = time - 1;
          io.in(startDetails.room).emit("game-timer", time);
        }
      }, 1000);
    }
  });

  socket.on("gameEnd", ({ room }) => {
    const results = gameResults(socket.id);

    if (room != null) {
      io.in(room).emit("gameResults", results);
    } else {
      socket.emit("gameResults", results);
    }
  });
});

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => console.log(`server running on ${PORT}`));
