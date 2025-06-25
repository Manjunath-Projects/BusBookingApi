const Bus = require('../models/Bus');

exports.addBus = async (req, res) => {
  const bus = await Bus.create(req.body);
  res.json(bus);
};

exports.updateBus = async (req, res) => {
  const bus = await Bus.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!bus) return res.status(404).json({ message: 'Bus not found' });
  res.json(bus);
};

exports.searchBuses = async (req, res) => {
  try {
    const { from, to } = req.query;
    if (!from || !to) {
      return res.status(400).json({ message: 'Both from and to parameters are required' });
    }
    const buses = await Bus.find({
      'route.from': { $regex: new RegExp(`^${from}$`, 'i') },
      'route.to': { $regex: new RegExp(`^${to}$`, 'i') }
    });
    if (buses.length === 0) {
      return res.status(404).json({ message: 'No buses found for this route' });
    }
    res.json(buses);
  } catch (error) {
    console.error('Error searching buses:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getAllBuses = async (req, res) => {
  try {
    const buses = await Bus.find();
    res.json(buses);
  } catch (err) {
    console.error('Error fetching buses:', err);
    res.status(500).json({ message: 'Server error while fetching buses' });
  }
};


exports.updateBus = async (req, res) => {
  try {
    const bus = await Bus.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!bus) return res.status(404).json({ message: 'Bus not found' });
    res.json(bus);
  } catch (err) {
    console.error('Error updating bus:', err);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.deleteBus = async (req, res) => {
  try {
    const bus = await Bus.findByIdAndDelete(req.params.id);
    if (!bus) return res.status(404).json({ message: 'Bus not found' });
    res.json({ message: 'Bus deleted successfully' });
  } catch (err) {
    console.error('Delete bus error:', err);
    res.status(500).json({ message: 'Server error during bus deletion' });
  }
};
