const express = require('express');
const { bookBus, cancelBooking, getBookings,getAllBookings } = require('../controllers/bookingController');
const { protect } = require('../middlewares/authMiddleware');
const { searchBuses } = require('../controllers/busController');
const router = express.Router();

router.post('/', protect, bookBus);
router.delete('/:id', protect, cancelBooking);
router.get('/', protect, getBookings);
router.get('/buses/search', protect, searchBuses);
router.get('/admin/all', protect, getAllBookings);


module.exports = router;
