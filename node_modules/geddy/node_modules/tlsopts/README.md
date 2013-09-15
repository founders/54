## tlsopts
`npm install tlsopts`

Make TLS configuration cleaner.

### API
tlsopts exports a single function with a `sync` method on it.

#### tlsopts
`tlsopts(opts, function (err) {});`
Parses the given `opts` object into the format accepted by the `tls` module.

`Buffer` values and keys not mentioned below are ignored.

The keys `pfx`, `key`, and `cert` can be given a path to get the contents from.

The key `ca` can be either a single path pointing to a bundle, or an array
of paths(or `Buffer`s) to get the contents from.

#### tlsopts.sync
`tlsopts.sync(opts)`
Synchronous alternative to `tlsopts`, it returns the options object.

### Example
```
var https = require('https'),
    tlsopts = require('tlsopts'),
    fs = require('fs'),
    opts;

opts = {
  key: fs.readFileSync('server.key'),
  cert: 'server.crt',
  ca: 'server_bundle.crt'
};

tlsopts(opts, function (err) {
  if (err) {
    throw err;
  }

  var server = https.createServer(opts, function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World\n');
  });

  server.listen(4000, '127.0.0.1');
});
```

### License
MIT licensed, see [here](https://raw.github.com/larzconwell/tlsopts/master/LICENSE)
