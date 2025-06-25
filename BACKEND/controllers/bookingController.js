const Booking = require('../models/Booking');

exports.bookBus = async (req, res) => {
  try {
    const { busId, date } = req.body;
    if (!busId || !date) {
      return res.status(400).json({ message: 'busId and date are required' });
    }

    const booking = await Booking.create({
      user: req.user.id,
      bus: busId,  // Mongoose expects this field to match your schema
      date,
    });

    res.status(201).json(booking);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error while booking' });
  }
};

exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: 'cancelled' },
      { new: true }
    );
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.json(booking);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error while cancelling' });
  }
};

exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).populate('bus');
    res.json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error while fetching bookings' });
  }
};

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('bus')
      .populate('user');
    res.json(bookings);
  } catch (err) {
    console.error('Error fetching all bookings:', err);
    res.status(500).json({ message: 'Server error fetching bookings' });
  }
};