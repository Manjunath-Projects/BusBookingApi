const mongoose = require('mongoose');

const busSchema = new mongoose.Schema({
  busNumber: { type: String, required: true, unique: true },
  capacity: { type: Number, required: true },
  route: {
    from: { type: String, required: true },
    to: { type: String, required: true },
    stops: [String]
  }
});

module.exports = mongoose.model('Bus', busSchema);
