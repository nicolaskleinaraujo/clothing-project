const createOrderController = require("./createOrder/createOrderController")
const deleteOrderController = require("./deleteOrder/deleteOrderController")
const updateReceivedController = require("./updateReceived/updateReceivedController")

const orderController = {
    createOrderController,
    deleteOrderController,
    updateReceivedController,
}

module.exports = orderController
