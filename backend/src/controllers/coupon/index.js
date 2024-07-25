const createCouponController = require("./createCoupon/createCouponController")
const deleteCouponController = require("./deleteCoupon/deleteCouponController")
const invalidateCouponController = require("./invalidateCoupon/invalidateCouponController")

const couponController = {
    createCouponController,
    invalidateCouponController,
    deleteCouponController,
}

module.exports = couponController
