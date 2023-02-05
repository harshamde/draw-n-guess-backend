const socketController = require("./socketControllers");


const controllers = {
    getSocketController: () => socketController,
};


module.exports = controllers;