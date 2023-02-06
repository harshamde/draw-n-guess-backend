// socket.id provides id of the user which can be further used to send message to that particular user
// we wil provide room-id from client side to create a room


// ============ client=================

// roomId: data.roomId,
// clientId: socket.id,
// clientName: data.userName,
// role: 'admin',



// =============================

/* 

const client ={
    clientId: number,
    roomId: number,
    name: string,
    avatar: string,
    score: number,
    rank: number,
}

const roomConfig = {
    numberOfRounds: number,
    timeForEachPlayer: number, (1min | 2min | 3min)
    customWords: string[],
}

const rooom = {
    roomId: number,
    clients: client[],
    status: | "waiting_in_lobby" | "game_started",
    config: roomConfig,
    remainingTime:{ minutes: number, seconds: number },
    leaderBoard: client[], // sorted by score
    pauseTime: 5 seconds,
    timeToChooseWord: 10 seconds,
}

*/

