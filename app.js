'use strict';
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const morgan = require('morgan');
const config = require('config');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const compression = require('compression');
const logger = require(path.resolve('lib/logger')).getLogger(__filename);

const app = express();
process.env.PORT = config.port || process.env.PORT;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(morgan('[:date[iso]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time :remote-addr ":referrer" ":user-agent"'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ type: 'application/json' }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.Router());
app.use(compression());

// swagger
const swagger = require(path.resolve('lib/swagger'));
swagger.load(app);

// request handler
app.use(require(path.resolve('lib/handler/RequestHandler')));

// route init
const preRouter = require(path.resolve('routes/init'));
preRouter.load(app);

app.get('/', (req, res) => { res.json({status: 200, message: 'ok'}) });
app.get('/health', (req, res) => { res.json({status: 200, message: 'ok'}) });

// catch 404 and forward to error handler
app.use(require(path.resolve('lib/handler/NotFoundHandler')));
// error handler
app.use(require(path.resolve('lib/handler/ErrorHandler')));
// response handler
app.use(require(path.resolve('lib/handler/ResponseHandler')));


module.exports = app;
