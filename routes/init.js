'use strict';
const path = require('path');
const fs = require('fs');
const logger = require(path.resolve('lib/logger')).getLogger();

let init = function init(app, dirname = 'controllers', directory = '') {
  let files = fs.readdirSync(path.resolve(dirname));

  files.forEach(function (file) {
    let prefix = directory || '';

    let fsStats = fs.statSync(path.resolve(dirname) + '/' + file);
    if(fsStats && fsStats.isDirectory()) {
      let dirName = '';
      if(prefix){
        //TODO: 2depth 폴더로 생성하려면 아래 로직 수정해야함.
        dirName += prefix + '/:id';
      }
      dirName += '/' + file;
      init(app, dirname + '/' + file, dirName);
    }
    if(file.substr(-3) === '.js') {
      logger.trace("load file controllers :", dirname + '/' + file);
      let route = require(path.resolve(dirname) + '/' + file);
      if(file.split('.')[0] !== 'index') {
        prefix += '/' + file.split('.')[0];
      }
      route.controller(app, prefix);
    }
  });
};

exports.load = init;