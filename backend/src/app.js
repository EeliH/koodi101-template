const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const logger = require('koa-logger');
const cors = require('kcors');

const entries = require('./controllers/entries');
const greeting = require('./controllers/greeting');

const app = module.exports = new Koa();

app.use(logger());

app.use(cors({ credentials: true }));
app.use(bodyParser());

const publicRouter = new Router({ prefix: '/api' });

publicRouter.post('/sensors', entries.create);
publicRouter.get('/sensors', entries.list);

publicRouter.get('/greeting', greeting.greet);

app.use(publicRouter.routes());
app.use(publicRouter.allowedMethods());
