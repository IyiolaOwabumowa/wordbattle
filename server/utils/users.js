const users = [];

const joinRoom = (id, playername, room, creator) => {
  const roomLength = users.filter((user) => user.room === room).length;
  if (roomLength == 8) {
    return "This room is full. Capacity (8 players)";
  } else {
    const user = { id, playername, room, creator, requests: [], points: 0 };
    users.push(user);
    return user;
  }
};

const leaveRoom = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

const generateDeck = () => {
  const deck = [
    {
      name: `${String.fromCharCode(97 + Math.floor(Math.random() * 26))}`,
      count: 1,
    },
    {
      name: `${String.fromCharCode(97 + Math.floor(Math.random() * 26))}`,
      count: 1,
    },
    {
      name: `${String.fromCharCode(97 + Math.floor(Math.random() * 26))}`,
      count: 1,
    },
    {
      name: `${String.fromCharCode(97 + Math.floor(Math.random() * 26))}`,
      count: 1,
    },
    {
      name: `${String.fromCharCode(97 + Math.floor(Math.random() * 26))}`,
      count: 1,
    },
    {
      name: `${String.fromCharCode(97 + Math.floor(Math.random() * 26))}`,
      count: 1,
    },
    {
      name: `${String.fromCharCode(97 + Math.floor(Math.random() * 26))}`,
      count: 1,
    },
    {
      name: `${String.fromCharCode(97 + Math.floor(Math.random() * 26))}`,
      count: 1,
    },
  ];

  return deck;
};

const getRematchRequests = (id, room) => {
  const creatorIndex = getRoomCreatorIndex(room);

  const creator = users[creatorIndex];

  if (creatorIndex !== -1) {
    users[creatorIndex] = {
      ...creator,
      requests: [...creator.requests, id],
    };

    return { id: creator.id, requests: users[creatorIndex].requests };
  } else {
    return null;
  }
};

const isCreatorInRoom = (room) => {
  const creatorIndex = getRoomCreatorIndex(room);
  const creator = users[creatorIndex];

  if (creatorIndex !== -1) {
    return true;
  } else {
    return false;
  }
};

const removeRematchRequest = (id, room) => {
  const creatorIndex = getRoomCreatorIndex(room);

  if (creatorIndex != -1) {
    const creator = users[creatorIndex];

    if (creator.requests.includes(id)) {
      const leaverIndex = creator.requests.findIndex((index) => index === id);

      if (leaverIndex != -1) {
        creator.requests.splice(leaverIndex, 1)[0];
        return creator;
      } else {
        return null;
      }
    }
  } else {
    return null;
  }
};

const resetRematchRequests = (room) => {
  const creatorIndex = getRoomCreatorIndex(room);

  const roomPlayers = getRoomPlayers(room);

  roomPlayers.map((user, idx) => (user.points = 0));

  const creator = users[creatorIndex];

  if (creatorIndex !== -1) {
    users[creatorIndex] = {
      ...users[creatorIndex],
      requests: [],
    };
  }

  if (creator) {
    return { id: creator.id, requests: users[creatorIndex].requests };
  } else {
    return null;
  }
};

const getRoomPlayers = (room) => {
  return users.filter((user) => user.room === room);
};

const getRoomCreator = (room) => {
  return users.find((user) => user.room == room && user.creator == true);
};

const getRoomCreatorById = (id) => {
  return users.find((user) => user.id == id && user.creator == true);
};

const getRoomCreatorIndex = (room) => {
  return users.findIndex((user) => user.room == room && user.creator == true);
};

const startGame = (room) => {
  const index = users.findIndex(
    (user) => user.room === room && user.creator === true
  );

  if (index !== -1) {
    users[index] = { ...users[index], gameStarted: true };
  }

  return users;
};

const startStatus = (id) => {
  const user = users.find((user) => user.id === id);

  if (user) {
    const room = user.room;

    const creator = getRoomCreator(room);

    if (creator) {
      return { gameStarted: creator.gameStarted, room: creator.room };
    } else {
      return { gameStarted: false };
    }
  } else {
    return { gameStarted: false };
  }
};

const addPoints = (id, points) => {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) {
    users[index] = {
      ...users[index],
      points: users[index].points + points,
    };

    return users[index].points;
  }
};

const gameResults = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) {
    const room = users[index].room;

    const roomPlayers = users.filter((user) => user.room === room);

    roomPlayers.map((player, idx) => {
      if (player.points) {
      } else {
        roomPlayers[idx] = {
          ...roomPlayers[idx],
          points: 0,
        };
      }
    });

    const results = roomPlayers.sort(
      (a, b) => parseFloat(b.points) - parseFloat(a.points)
    );

    return results;
  } else {
    return null;
  }
};

module.exports = {
  addPoints,
  generateDeck,
  removeRematchRequest,
  isCreatorInRoom,
  getRoomCreatorById,
  gameResults,
  getRoomCreator,
  getRematchRequests,
  resetRematchRequests,
  joinRoom,
  leaveRoom,
  getRoomPlayers,
  startGame,
  startStatus,
};
