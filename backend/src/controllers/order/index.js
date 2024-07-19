const createOrderController = require("./createOrder/createOrderController")
const deleteOrderController = require("./deleteOrder/deleteOrderController")

const orderController = {
    createOrderController,
    deleteOrderController,
}

module.exports = orderController
