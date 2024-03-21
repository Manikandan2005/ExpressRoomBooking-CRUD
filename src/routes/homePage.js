import express from 'express'
import homePageController from '../controller/homePage.js'
import bookingRoutes from './Bookings.js'
const router = express.Router()

router.get('/',homePageController.homePage)


//other routes
router.use('/',bookingRoutes)

export default router