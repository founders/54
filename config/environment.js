var path = require('path')
  , config = {
      css: {
        lessIndex: path.join(__dirname, '..', 'public', 'less', 'index.less')
      , cssIndex: path.join(__dirname, '..', 'public', 'css', 'index.css')
      }
    };

module.exports = config;
