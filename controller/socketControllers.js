const { CREATE_ROOM } = require("../common/socketEvents");
const services = require("../services/services");


const handleSocketEvents = async ({ socket, event, data }) => {
    switch (event) {
        // case CREATE_ROOM: await createRoom(socket, data);
    }
};


module.exports = { handleSocketEvents }

