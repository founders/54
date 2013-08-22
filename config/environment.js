var path = require('path')
  , url = (process.env.NODE_ENV === 'production' ? 'http://www.54.io' : 'http://127.0.0.1:4000')
  , config = {
      url: url
    , event: {
        year: 2013
      , positions: [
          'Marketing Director'
        , 'Facilities Director'
        , 'Corporate Director'
        , 'Other'
        ]
      , teamEmail: 'team@54.io'
      , teamName: 'The 54.io Team'
      }
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
