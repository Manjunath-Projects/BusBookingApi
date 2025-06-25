const express = require('express');
const { addBus, updateBus, searchBuses, getAllBuses ,deleteBus } = require('../controllers/busController');
const { protect, adminOnly } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', protect, adminOnly, addBus);
router.put('/:id', protect, adminOnly, updateBus);
router.get('/', protect, adminOnly, getAllBuses); // this is what fetchBuses will call
router.get('/search', protect, searchBuses);
router.put('/:id', protect, adminOnly, updateBus);
router.delete('/:id', protect, adminOnly, deleteBus);

module.exports = router;
