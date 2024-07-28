const createOrderController = require("./createOrder/createOrderController")
const deleteOrderController = require("./deleteOrder/deleteOrderController")
const ipnController = require("./ipnController/ipnController")
const sortByUserController = require("./sortByUser/sortByUserController")
const updateStatusController = require("./updateStatus/updateStatusController")

const orderController = {
    createOrderController,
    deleteOrderController,
    updateStatusController,
    sortByUserController,
    ipnController,
}

module.exports = orderController
