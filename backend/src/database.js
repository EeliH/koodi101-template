const sequelize = require('./models/sequelize');

exports.SensorData = require('./models/sensors');

exports.sync = (options) => {
  return sequelize.sync(options);
};

exports.transaction = (options) => {
  return sequelize.transaction(options);
};
