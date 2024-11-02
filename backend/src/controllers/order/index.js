const adminSortController = require("./adminSort/adminSortController")
const cardPayment = require("./cardPayment/cardPayment")
const createOrderController = require("./createOrder/createOrderController")
const deleteOrderController = require("./deleteOrder/deleteOrderController")
const ipnController = require("./ipnController/ipnController")
const sortById = require("./sortById/sortByIdController")
const sortByUserController = require("./sortByUser/sortByUserController")
const updateStatusController = require("./updateStatus/updateStatusController")

const orderController = {
    createOrderController,
    deleteOrderController,
    updateStatusController,
    sortByUserController,
    ipnController,
    sortById,
    adminSortController,
    cardPayment,
}

module.exports = orderController
