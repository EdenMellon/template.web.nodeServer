/**
 * API 전처리
 */
'use strict';
const path = require('path');
const config = require('config');
const logger = require(path.resolve('lib/logger')).getLogger(__filename);

module.exports = (req, res, next) => {

  // generating transaction id
  req.txid = Date.now();
  logger.debug(req.txid, 'requested url => ' + req._parsedUrl.pathname);
  logger.debug(req.txid, 'requested method => ' + req.method);
  logger.debug(req.txid, 'requested payload => ' + JSON.stringify(req.body));
  logger.debug(req.txid, 'requested parameter => ' + req._parsedUrl.query);

  next();
};