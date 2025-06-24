const Booking = require('../models/Booking');

exports.bookBus = async (req, res) => {
  const { bus, date } = req.body;
  const booking = await Booking.create({
    user: req.user.id,
    bus,
    date,
  });
  res.json(booking);
};

exports.cancelBooking = async (req, res) => {
  const booking = await Booking.findByIdAndUpdate(
    req.params.id,
    { status: 'cancelled' },
    { new: true }
  );
  if (!booking) return res.status(404).json({ message: 'Booking not found' });
  res.json(booking);
};
