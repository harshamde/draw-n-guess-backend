
const clientPayload = {
    clientId: 0,
    roomId: 0,
    name: "",
    avatar: "",
    score: 0,
    rank: 0,
}

const roomConfigPayload = {
    numberOfRounds: 0,
    timeForEachPlayer: 0, //(1min | 2min | 3min)
    customWords: [],
};

const roomPayload = {
    roomId: 0,
    clients: [],
    status: "waiting_in_lobby",
    config: {},
    remainingTime: { minutes: 0, seconds: 0 },
    leaderBoard: [], // clients array sorted according to score
    pauseTime: 5,
    timeToChooseWord: 10,
};

module.exports = { roomConfigPayload, roomPayload, clientPayload }