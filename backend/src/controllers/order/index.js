const createOrderController = require("./createOrder/createOrderController")
const deleteOrderController = require("./deleteOrder/deleteOrderController")
const sortByUserController = require("./sortByUser/sortByUserController")
const updateStatusController = require("./updateStatus/updateStatusController")

const orderController = {
    createOrderController,
    deleteOrderController,
    updateStatusController,
    sortByUserController,
}

module.exports = orderController
