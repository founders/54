var fs = require('fs'),
    async = require('async');

var fileOpts = ['pfx', 'key', 'cert'];

function included (arr, item) {
  return arr.indexOf(item) >= 0;
}

function parseBundle (contents) {
  var certs = [],
      cert = [],
      lines = contents.split('\n'),
      line;

  for (var l in lines) {
    line = lines[l];

    if (line.length <= 0) {
      continue;
    }

    cert.push(line);
    if (line.match('-END CERTIFICATE-')) {
      certs.push(cert.join('\n'));
      cert = [];
    }
  }

  return certs;
}

module.exports = function tlsopts (opts, callback) {
  async.each(Object.keys(opts), function (o, next) {
    // If Buffer ignore
    if (opts[o] instanceof Buffer) {
      next(null);
      return;
    }

    // If simple file option replace file name with contents Buffer
    if (included(fileOpts, o)) {
      fs.readFile(opts[o], function (err, buf) {
        if (err) {
          next(err);
          return;
        }

        opts[o] = buf;
        next(null);
      });
      return;
    }

    // If ca is given and an array replace files with contents
    if (o === 'ca' && opts[o] instanceof Array) {
      var indexes = [];
      for (var i = 0; i < opts[o].length; i++) {
        indexes.push(i);
      }

      async.each(indexes, function (i, done) {
        // If Buffer ignore
        if (opts[o][i] instanceof Buffer) {
          return;
        }

        fs.readFile(opts[o][i], function (err, buf) {
          if (err) {
            next(err);
            return;
          }

          opts[o][i] = buf;
          next(null);
        });
      }, next);
      return;
    }

    // If ca is given and is a string, handle it like a bundle
    if (o === 'ca' && typeof opts[o] === 'string') {
      fs.readFile(opts[o], 'utf-8', function (err, contents) {
        if (err) {
          next(err);
          return;
        }

        opts[o] = parseBundle(contents);
        next(null);
      });
      return;
    }

    next(null);
  }, function (err) {
    callback(err, opts);
  });
};

module.exports.sync = function tlsoptsSync (opts) {
  for (var o in opts) {
    // If Buffer ignore
    if (opts[o] instanceof Buffer) {
      continue;
    }

    // If simple file option replace file name with contents Buffer
    if (included(fileOpts, o)) {
      opts[o] = fs.readFileSync(opts[o]);
    }

    // If ca is given and an array replace files with contents
    if (o === 'ca' && opts[o] instanceof Array) {
      for (var i in opts[o]) {
        // If Buffer ignore
        if (opts[o][i] instanceof Buffer) {
          continue;
        }

        opts[o][i] = fs.readFileSync(opts[o][i]);
      }
    }

    // If ca is given and is a string, handle it like a bundle
    if (o === 'ca' && typeof opts[o] === 'string') {
      opts[o] = parseBundle(fs.readFileSync(opts[o], 'utf-8'));
    }
  }

  return opts
};
