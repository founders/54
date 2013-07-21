var path = require('path')
  , url = (process.env.NODE_ENV === 'production' ? 'http://www.54.io' : 'http://127.0.0.1:4000')
  , config = {
      url: url
    , css: {
        lessIndex: path.join(__dirname, '..', 'public', 'less', 'index.less')
      , cssIndex: path.join(__dirname, '..', 'public', 'css', 'index.css')
      }
    , js: {
        jsIndex: path.join(__dirname, '..', 'public', 'js', 'scripts.js')
      , map: path.join('/js', 'source.map')
      }
    };

module.exports = config;
