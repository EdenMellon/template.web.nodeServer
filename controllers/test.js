'use strict';

const config = require('config');
const HttpStatus = require('http-status');

exports.controller = (app, prefix) => {

  /**
   * @swagger
   * /test:
   *   get:
   *     summary: test
   *     tags: [Test]
   *     responses:
   *       200:
   */
  app.get(prefix + '/', (req, res) => {
    // any logic goes here
    res.status(200).json({
      status: HttpStatus.OK,
      message:'success',
      data: {
        title: "hello world"
      }
    });
  });
};