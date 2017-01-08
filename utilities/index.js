/* jslint node:true */
'use strict';

const fs = require('fs');
const path = require('path');

const basename = path.basename(module.filename);

const tools = {};

const kabobToCamel = s => {
  return s.replace(/(\-\w)/g, m => {
    return m[1].toUpperCase();
  });
};

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const tool = require(['.', file].join('/'));
    tools[kabobToCamel(file.replace('.js', ''))] = tool;
  });

module.exports = tools;
