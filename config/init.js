var fs = require('fs')
  , path = require('path')
  , less = require('less')
  , utils = require('utilities')
  , parser = new(less.Parser)({
      paths: ['public/less']  // Specify search paths for @import directives
    , filename: 'styles.less' // Specify a filename, for better error messages
    })
  , init = function(cb) {
      // Add uncaught-exception handler in prod-like environments
      if (geddy.config.environment != 'development') {
        process.addListener('uncaughtException', function (err) {
          var msg = err.message;
          if (err.stack) {
            msg += '\n' + err.stack;
          }
          if (!msg) {
            msg = JSON.stringify(err);
          }
          geddy.log.error(msg);
        });
      }

      // Compile LESS
      fs.readFile(geddy.config.css.lessIndex, function (err, contents) {
        if(err) {
          throw err;
        }

        parser.parse(contents.toString() // Convert Buffer to String
          , function (err, tree) {
              var minCss;

              if(err) {
                throw err;
              }

              minCss = tree.toCSS({ compress: true }); // Minify CSS output

              // Make the public CSS dir
              utils.file.mkdirP(path.dirname(geddy.config.css.cssIndex));

              // Write to file
              fs.writeFile(geddy.config.css.cssIndex, minCss, function(err) {
                if(err) {
                  throw err;
                }

                cb();
              });
            });
      });
    };

exports.init = init;