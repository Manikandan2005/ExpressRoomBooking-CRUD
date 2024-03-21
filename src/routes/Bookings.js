import express from 'express'
import bookingController from '../controller/Bookings.js'
const router = express.Router()


router.get('/getallrooms',bookingController.getAllRooms)
router.post('/createrooms',bookingController.createRooms)
router.post('/bookrooms',bookingController.bookRooms)
router.get('/roomdata',bookingController.roomBookedData)
router.get('/customerdata',bookingController.custBookedData)
router.get('/customercount',bookingController.custCountBooked)

export default router