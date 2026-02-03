module.exports = function cityMiddleware(req, res, next) {
  let city = req.header('x-city') || req.query.city || req.body?.city || 'manaus';
  city = String(city || 'manaus').toLowerCase();
  if (city !== 'manaus' && city !== 'itajai') city = 'manaus';
  req.city = city;
  // Attach a per-city mockdb instance
  const mockdbFactory = require('../mockdb');
  req.mockdb = mockdbFactory.forCity ? mockdbFactory.forCity(city) : mockdbFactory;
  next();
};
