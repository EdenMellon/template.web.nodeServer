'use strict';
const _ = require("lodash");
const config = require('config');
const log4js = require('log4js');

let getLogger = (serviceName) => {
  let env = !! config.env ? config.env : 'local';
  let name = !! serviceName ? serviceName : 'none';

  let logger = log4js.getLogger([env, name].join(':'));

  logger.level = !! config.logLevel ? config.logLevel : 'trace';
  return logger;
};

exports.getLogger = getLogger;