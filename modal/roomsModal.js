let roomsArray = [];

const getRoomUsingRoomId = (roomId) => {
    const newRoomsArray = roomsArray.filter(room => room.roomId === roomId);
    return newRoomsArray[0];
};

const getClientUsingRoomIdAndClientId = (roomId, clientId) => {
    const room = getRoomUsingRoomId(roomId);
    const clientsArray = room.roomClients.filter(client => client.clientId === clientId);

    return clientsArray[0];
};

const isClientAlreadyPresentInRoom = (roomId, clientId) => {
    const room = getRoomUsingRoomId(roomId);
    for (let client of room) {
        if (client.clientId === clientId) {
            return true;
        }
    }
    return false;
};

const doesRoomAlreadyExists = (roomId) => {
    for (let room of roomsArray) {
        if (room.roomId === roomId) {
            return true;
        }
    }
    return false;
};

const addNewClientToRoom = (roomId, client) => {
    const clientAlreadyExists = isClientAlreadyPresentInRoom(roomId, client);
    if (clientAlreadyExists) {
        return false;
    }

    const room = getRoomUsingRoomId(roomId);
    room.roomClients = [...room.roomClients, client];
    return true;
};

const createNewRoom = (room) => {
    const roomAlreadyExists = doesRoomAlreadyExists(room.roomId);

    if (roomAlreadyExists) {
        return false;
    }

    roomsArray = [...roomsArray, room];

};

const dataToExport = { addNewClientToRoom, createNewRoom }
module.exports = dataToExport;