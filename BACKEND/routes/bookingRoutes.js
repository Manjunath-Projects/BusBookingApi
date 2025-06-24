//user

const express = require('express');
const { bookBus, cancelBooking } = require('../controllers/bookingController');
const { protect } = require('../middlewares/authMiddleware');
const { searchBuses } = require('../controllers/busController');
const router = express.Router();

router.post('/', protect, bookBus);
router.delete('/:id', protect, cancelBooking);
router.get('/buses/search', protect, searchBuses);
module.exports = router;
