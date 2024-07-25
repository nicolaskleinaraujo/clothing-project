const createCouponController = require("./createCoupon/createCouponController")
const invalidateCouponController = require("./invalidateCoupon/invalidateCouponController")

const couponController = {
    createCouponController,
    invalidateCouponController,
}

module.exports = couponController
