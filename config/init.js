var _ = require('lodash')
  , fs = require('fs')
  , path = require('path')
  , less = require('less')
  , UglifyJS = require('uglify-js')
  , utils = require('utilities')
  , parser = new(less.Parser)({
      paths: ['public/less']  // Specify search paths for @import directives
    , filename: 'styles.less' // Specify a filename, for better error messages
    })
  , compileLess = function (cb) {
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
    }
  , compileJs = function (cb) {
      var temp = process.cwd();
      process.chdir(path.join(__dirname, '..', 'public'));

      // Compile JS
      var mapPath = path.join(process.cwd(), geddy.config.js.map)
        , sourceRoot = path.join(process.cwd(), 'js', 'lib')
        , sources = [
            'html5shiv.js'
          , 'jquery.js'
          , 'bootstrap.js'
          , 'retina.js'
       // , 'webfont.js'
          , '54.js'
          ]
          // Fix source paths
        , files = _.map(sources, function (value) {
            return path.relative(process.cwd(), path.join(sourceRoot, value));
          })
        , result = UglifyJS.minify(files, {
            outSourceMap: geddy.config.js.map
            // Back out one level before diving back in
          , sourceRoot: '../'
          })
          // Append sourceMappingURL
        , code = result.code + '\n/*\n//@ sourceMappingURL=' + geddy.config.js.map + '\n*/\n ';

      // Write code
      fs.writeFile(geddy.config.js.jsIndex, code, function (err) {
        if(err) {
          throw err;
        }

        // Write map
        fs.writeFile(mapPath, result.map, function (err) {
          if(err) {
            throw err;
          }

          cb();

          process.chdir(temp);
        });
      });
    }
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

      // Compile LESS and JS
      console.log('Compiling LESS...');
      compileLess(function () {
        console.log('Compiling JS...');
        compileJs(cb);
      });
    };

exports.init = init;