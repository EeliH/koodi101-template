var Sequelize = require('sequelize');
var sequelize = require('./sequelize');

var SensorEntry = sequelize.define('sensors', {
  temperature: Sequelize.FLOAT,
  humidity: Sequelize.FLOAT,
}, {
  timestamps: true,
  instanceMethods: {
    toJSON: async function () {
      return {
        // This is a unique id that is generated automatically
        id: this.id,
        // This also comes for free
        timestamp: this.createdAt,
        temperature: this.temperature,
        humidity: this.humidity,
      };
    },
  },
});

module.exports = SensorEntry;
