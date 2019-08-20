/**
 * API 후처리
 */
'use strict';
const path = require('path');
const httpStatus = require('http-status');
const logger = require(path.resolve('lib/logger')).getLogger(__filename.slice(__dirname.length + 1, -3));

module.exports = (payload, req, res, next) => {
    // basic message
    let result = {
        response_information: {
            txid : req.txid,
            timestamp: Date.now()
        },
        status: payload.status || httpStatus.BAD_REQUEST
    };
    // append message
    result.message = payload.message || httpStatus[result.status];

    // append data
    if (result.status >= httpStatus.OK && result.status < httpStatus.BAD_REQUEST) {
        if (payload.data !== 'undefined') {
            result.data = payload.data || null;
        } else {
            result.data = null;
        }
    } else {
        logger.error(req.txid, "Error : " + JSON.stringify(payload), logger);
        result.errors = payload;
    }

    // response
    if (req.xhr) {
        res.status(result.status).send(result);
    } else {
        res.status(result.status).json(result);
    }
};