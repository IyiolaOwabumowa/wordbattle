import { gameConstants } from "../constants/game.constants";

export const gameActions = {
  acceptRequest,
  startGame,
  endGame,
  prepareToStart,
  setMusicStatus,
  getRoom,
  joinRoom,
  leaveRoom,
  saveConnectedPlayers,
  getConnectedPlayers,
  stopGameplayMusic,
};

function joinRoom(socket, playername, room, creator) {
  return (dispatch) => {
    dispatch(request());
    socket.emit("joinRoom", { playername, room, creator }, (response) => {
      if (response.status === "ok") {
        dispatch(success(room));
        localStorage.setItem("room", room);
      }
    });
  };

  function request() {
    return { type: gameConstants.JOIN_ROOM_REQUEST };
  }

  function success(room) {
    return { type: gameConstants.JOIN_ROOM_SUCCESS, room };
  }

  function failure() {
    return { type: gameConstants.JOIN_ROOM_FAILURE };
  }
}

function prepareToStart(socket, room) {
  return (dispatch) => {
    socket.emit("prepareToStart", { room });
    dispatch(success());
  };

  function success() {
    return {
      type: gameConstants.ASSIGN_CREATOR,
      creator: true,
    };
  }
}

function acceptRequest() {
  return (dispatch) => {
    dispatch(success());
  };

  function success() {
    return {
      type: gameConstants.ACCEPT_REQUEST,
      acceptRequest: true,
    };
  }
}

function startGame() {
  return (dispatch) => {
    dispatch(success());
  };

  function success() {
    return { type: gameConstants.START_GAME, gameStatus: "started" };
  }
}

function endGame() {
  return (dispatch) => {
    dispatch(success());
  };

  function success() {
    return { type: gameConstants.END_GAME, gameStatus: "ended" };
  }
}

function getRoom() {
  return (dispatch) => {
    localStorage.getItem("room");
    dispatch(success(room));
  };

  function success() {
    return { type: gameConstants.LEAVE_ROOM, room };
  }
}

function leaveRoom(socket, room) {
  return (dispatch) => {
    // socket.emit("joinRoom", { playername, room }, (response) => {
    //   if (response.status === "ok") {
    //     success(room);
    //     localStorage.setItem("room", room);
    //   }
    // });

    socket.emit("leaveRoom", room);
    localStorage.setItem("room", null);
    dispatch(success());
  };

  function success() {
    return { type: gameConstants.LEAVE_ROOM, room: null };
  }
}

function saveConnectedPlayers(count) {
  return (dispatch) => {
    localStorage.setItem("connected-players", count);
    
    dispatch(success(count));
  };

  function success(count) {
    return { type: gameConstants.CONNECTED_PLAYERS, count };
  }
}

function getConnectedPlayers() {
  return (dispatch) => {
    // socket.emit("joinRoom", { playername, room }, (response) => {
    //   if (response.status === "ok") {
    //     success(room);
    //     localStorage.setItem("room", room);
    //   }
    // });

    dispatch(success(localStorage.getItem("connected-players")));
  };

  function success(count) {
    return { type: gameConstants.CONNECTED_PLAYERS, count };
  }
}

function setMusicStatus(musicStatus) {
  return (dispatch) => {
    dispatch(success(musicStatus));
  };

  function success(musicStatus) {
    return { type: gameConstants.MUSIC_STATUS, musicStatus };
  }
}

function stopGameplayMusic(value) {
  return (dispatch) => {
    // socket.emit("joinRoom", { playername, room }, (response) => {
    //   if (response.status === "ok") {
    //     success(room);
    //     localStorage.setItem("room", room);
    //   }
    // });

    dispatch(success(value));
  };

  function success(value) {
    return { type: gameConstants.STOP_GAME_MUSIC, value };
  }
}
