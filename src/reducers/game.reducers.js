import { gameConstants } from "../constants/game.constants.js";
import moment from "moment";

const initialState = {
  room: null,
  gameStatus: "ended",
  stopMusic: false,
  connectedPlayers: 0,
  players: [],
};

export default function gameReducer(state = initialState, action) {
  switch (action.type) {
    case gameConstants.JOIN_ROOM_FAILURE:
      return {
        ...state,
        joinLoading: true,
      };

    case gameConstants.JOIN_ROOM_SUCCESS:
      return {
        ...state,
        joinLoading: false,
        room: action.room,
      };

    case gameConstants.LEAVE_ROOM:
      return {
        ...state,
        room: null,
      };

    case gameConstants.GET_ROOM:
      return {
        ...state,
        room: action.room,
      };

    case gameConstants.START_GAME:
      return {
        ...state,
        gameStatus: action.gameStatus,
      };
    case gameConstants.ASSIGN_CREATOR:
      return {
        ...state,
        creator: action.creator,
        acceptRequest: action.acceptRequest,
      };
    case gameConstants.ACCEPT_REQUEST:
      return {
        ...state,
        acceptRequest: action.acceptRequest,
      };
    case gameConstants.END_GAME:
      return {
        ...state,
        gameStatus: action.gameStatus,
      };
    case gameConstants.ALL_PLAYERS:
      return {
        ...state,
        players: action.players,
      };
    case gameConstants.CONNECTED_PLAYERS:
      return {
        ...state,
        connectedPlayers: action.connectedPlayers,
      };

    case gameConstants.MUSIC_STATUS:
      return {
        ...state,
        musicStatus: action.musicStatus,
      };

    case gameConstants.STOP_GAME_MUSIC:
      return {
        ...state,
        stopMusic: action.value,
      };

    default:
      return state;
  }
}
