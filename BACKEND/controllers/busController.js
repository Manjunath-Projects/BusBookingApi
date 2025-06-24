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
  const { from, to } = req.query;
  const buses = await Bus.find({ 'route.from': from, 'route.to': to });
  res.json(buses);
};
