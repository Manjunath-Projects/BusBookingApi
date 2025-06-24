//admin
const express = require('express');
const { addBus, updateBus, searchBuses } = require('../controllers/busController');
const { protect, adminOnly } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', protect, adminOnly, addBus);
router.put('/:id', protect, adminOnly, updateBus);
router.get('/search', protect, searchBuses); // optional search endpoint

module.exports = router;
