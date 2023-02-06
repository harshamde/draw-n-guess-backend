let roomsArray = [];

// ========================================== getRoomUsingRoomId() ===========================================================

const getRoomUsingRoomId = (roomId) => {
    const newRoomsArray = roomsArray.filter(room => room.roomId === roomId);
    return newRoomsArray[0];
};


// ========================================== getClientUsingRoomIdAndClientId() ==============================================

const getClientUsingRoomIdAndClientId = (roomId, clientId) => {
    const room = getRoomUsingRoomId(roomId);
    const clientsArray = room.roomClients.filter(client => client.clientId === clientId);

    return clientsArray[0];
};


// ========================================== isClientAlreadyPresentInRoom() =================================================

const isClientAlreadyPresentInRoom = (roomId, clientId) => {
    const room = getRoomUsingRoomId(roomId);
    for (let client of room) {
        if (client.clientId === clientId) {
            return true;
        }
    }
    return false;
};


// ========================================== doesRoomAlreadyExists() ========================================================

const doesRoomAlreadyExists = (socket, roomId) => {
    const roomAlreadyExistsInSocket = socket.adapter.rooms.has(room.roomId);
    if (roomAlreadyExistsInSocket) {
        return roomAlreadyExistsInSocket;
    }
    for (let room of roomsArray) {
        if (room.roomId === roomId) {
            return true;
        }
    }
    return false;
};


// ========================================== addNewClientToRoom() ===========================================================

const addNewClientToRoom = (roomId, client) => {
    const clientAlreadyExists = isClientAlreadyPresentInRoom(roomId, client);
    if (clientAlreadyExists) {
        return false;
    }

    const room = getRoomUsingRoomId(roomId);
    room.roomClients = [...room.roomClients, client];
    return true;
};


// ========================================== createNewRoom() ================================================================

const createNewRoom = async (socket, room) => {
    await socket.join(room.roomId);
    const roomCreated = socket.adapter.rooms.get(room.roomId).has(room.clientId);

    if (roomCreated) {
        roomsArray = [...roomsArray, room];
        return room;
    }

    return null;
};


//============================================================================================================================

const dataToExport = { addNewClientToRoom, createNewRoom, doesRoomAlreadyExists };

module.exports = dataToExport;