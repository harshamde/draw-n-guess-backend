const { CREATE_ROOM, JOIN_ROOM } = require("../common/socketEvents");
const services = require("../services/services");
const { roomPayload, clientPayload } = require("../common/templateObjects");


// ========================================== handleSocketEvents() ===================================================

const handleSocketEvents = async ({ socket, event, data }) => {
    switch (event) {
        case CREATE_ROOM:
            createRoom(socket, data);
            break;
        case JOIN_ROOM:
            joinRoom(socket, data);
            break;
    }
};


// ========================================== createRoom() ===========================================================

const createRoom = async (socket, data) => {
    let response;
    try {
        const room = getRoomPayload(data);
        response = await services.getSocketServices().createRoom(socket, room);
    } catch (error) {
        response = { status: "FAILED", message: "Server error!", type: 'server error', event: "room-creation-failure", error };
    } finally {
        sendResponseToRespectiveClient(socket, response);
    }
};


// ========================================== joinRoom() =============================================================

const joinRoom = async (socket, data) => {
    let response;
    try {
        const room = getRoomPayload(data);
        response = await services.getSocketServices().joinRoom(socket, room);
    } catch (error) {
        response = { status: "FAILED", message: "Server error!", type: 'server error', event: "join-room-error", error };
    } finally {
        sendResponseToRespectiveClient(socket, response);
    }
};


// ========================================== sendResponseToRespectiveClient() =======================================

const sendResponseToRespectiveClient = (socket, response) => {
    socket.emit("data-from-server", response);
}


// ========================================== getRoomPayload() =======================================================

const getRoomPayload = (data, socket) => {
    const { roomId, name, avatar } = data;
    const client = { ...clientPayload };
    const room = { ...roomPayload };

    client.clientId = socket.id;
    client.name = name;
    client.avatar = avatar;
    client.roomId = roomId;

    room.roomId = roomId;
    room.clients = [...room.clients, client];
    room.leaderBoard = room.clients;  // when game starts clients will be sorted by score

    return room;

};


//====================================================================================================================

module.exports = { handleSocketEvents }

