const createOrderController = require("./createOrder/createOrderController")
const deleteOrderController = require("./deleteOrder/deleteOrderController")
const sortByUserController = require("./sortByUser/sortByUserController")
const updateReceivedController = require("./updateReceived/updateReceivedController")

const orderController = {
    createOrderController,
    deleteOrderController,
    updateReceivedController,
    sortByUserController,
}

module.exports = orderController
