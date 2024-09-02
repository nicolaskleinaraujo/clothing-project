const createCouponController = require("./createCoupon/createCouponController")
const deleteCouponController = require("./deleteCoupon/deleteCouponController")
const getAllCouponsController = require("./getAllCoupons/getAllCouponsController")
const invalidateCouponController = require("./invalidateCoupon/invalidateCouponController")

const couponController = {
    createCouponController,
    invalidateCouponController,
    deleteCouponController,
    getAllCouponsController,
}

module.exports = couponController
