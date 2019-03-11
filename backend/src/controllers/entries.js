const database = require('../database');

exports.list = async (ctx) => {
  let options = {};

  let result = await database.SensorData.findAll(options);
  let data = await Promise.all(result.map(data => data.toJSON()));

  let response = {
    results: data,
  };

  ctx.body = response;
};

exports.create = async (ctx) => {
  const params = ctx.request.body;

  const sensordata = await database.SensorData.create({temperature: params.temperature, humidity: params.humidity});

  ctx.body = await sensordata.toJSON();
  ctx.status = 201;
};
