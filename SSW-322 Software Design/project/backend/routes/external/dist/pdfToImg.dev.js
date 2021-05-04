"use strict";

var multiparty = require('multiparty');

var gm = require('gm');

var fs = require('fs');

var _ = require('lodash');

module.exports = function _callee(req, res) {
  var form;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          form = new multiparty.Form();
          res.set('Content-Type', 'image/jpeg');
          form.parse(req, function (err, fields, files) {
            if (_.has(files, 'file[0].pathname')) {
              var s = fs.createReadStream('./pdf_thumbnail.png');
              s.on('open', function () {
                req.set('Content-Type', 'image/png');
                s.pipe(res);
              });
              s.on('error', function () {
                res.set('Content-Type', 'text/plain');
                res.status(500).end({
                  message: 'Pdf failed'
                });
              });
            } else {
              res.set('Content-Type', 'text/plain');
              res.status(500).end({
                message: 'Data not sent in proper format, should be multipaprty form with field: file'
              });
            }
          });

        case 3:
        case "end":
          return _context.stop();
      }
    }
  });
};