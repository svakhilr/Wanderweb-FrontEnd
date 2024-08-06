const BASEURL = 'http://127.0.0.1:8000/api/'

const requests = {
    tokenRefresh:BASEURL+"token/refresh/",
    getTrips:BASEURL+"trips/",
    registerCustomer:BASEURL +"customer/",
    verifyOtp:BASEURL+"customer/verify_otp/",
    getProfile:BASEURL+"customer/me",
    login:BASEURL+"customer/login/",
    confirmBooking:BASEURL+"booking/trips/",
    getTripbooking:BASEURL+ "booking/trips/?booking_id=",
    checkout:BASEURL+"booking/trips/checkout/"
}

export default requests