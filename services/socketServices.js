const repository = require("../modal/repository");


// =================================== doesRoomExist() ==================================================

const doesRoomExist = (socket, roomId) => {
    return socket.adapter.rooms.has(roomId);
};


// =================================== isClientAlreadyInRoom() ===========================================

const isClientAlreadyInRoom = ({ socket, roomId, clientId }) => {
    return socket.adapter.rooms.get(roomId).has(clientId);
};


// ========================================== joinRoom() ==================================================

const joinRoom = async (socket, data) => {
    const dataToSave = {
        roomId: data.roomId,
        clientId: socket.id,
        clientName: data.userName,
        role: 'user',
        gameStatus: 'lobby'
    };

    const roomExist = await doesRoomExist(socket, dataToSave.roomId);

    if (!roomExist) {
        return { status: 'FAILED', error: "Room does not exist!", type: 'join room error' };
    }

    const clientAlreadyInRoom = await isClientAlreadyInRoom({ socket, roomId: dataToSave.roomId, clientId: dataToSave.clientId });

    if (clientAlreadyInRoom) {
        return { status: 'FAILED', error: "Client already present in room!", type: 'join room error' };
    }

    socket.join(dataToSave.roomId);
    rooms.push(dataToSave);
    return { status: 'SUCCESS', message: 'Joined room successfully!' };

};


// ========================================= createRoom() ==============================================

const createRoom = async (socket, data) => {
    const newRoom = {
        roomId: data.roomId,
        clientId: socket.id,
        clientName: data.userName,
        role: 'admin',
        gameStatus: 'lobby'
    };

    const roomExist = await doesRoomExist(socket, newRoom.roomId);

    if (roomExist) {
        return { status: 'FAILED', error: "Room already exist!", type: 'create room error', event: "room-creation-failure" };
    }

    await socket.join(newRoom.roomId);

    const roomCreated = socket.adapter.rooms.get(newRoom.roomId).has(newRoom.clientId);

    if (!roomCreated) {
        return { status: 'FAILED', error: "Unable to create room!", type: 'create room error', event: "room-creation-failure" };
    }

    rooms.push(newRoom);

    socket.emit("data-from-server", { status: "SUCCESS", message: "Room is created successfully!", event: "join-lobby", data: { totalPlayers: 1, rooomId: dataToSave.roomId } });

}


//======================================================================================================


const methodsToExport = { joinRoom, createRoom };

module.exports = methodsToExport;