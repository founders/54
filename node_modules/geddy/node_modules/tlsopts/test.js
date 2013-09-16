var tlsopts = require('./'),
    assert = require('assert'),
    fs = require('fs'),
    cert = fs.readFileSync('server.crt');

assert.ok(typeof tlsopts === 'function');
assert.ok(typeof tlsopts.sync === 'function');

// Async tests
var asyncOpts = {random: 'value', key: 'server.key', cert: cert, ca: ['server.crt', cert]};
tlsopts(asyncOpts, function (err) {
  if (err) {
    throw err;
  }

  assert.equal(asyncOpts.random, 'value');
  assert.ok(asyncOpts.key instanceof Buffer);
  assert.ok(asyncOpts.ca instanceof Array);
  assert.ok(asyncOpts.cert === cert);
  assert.ok(asyncOpts.ca.length == 2);
  assert.ok(asyncOpts.ca[1] === cert);
});

// Sync tests
var syncOpts = tlsopts.sync({
  random: 'value',
  key: 'server.key',
  cert: cert,
  ca: 'bundle.crt'
});

assert.equal(syncOpts.random, 'value');
assert.ok(syncOpts.key instanceof Buffer);
assert.ok(syncOpts.ca instanceof Array);
assert.ok(syncOpts.cert = cert);
assert.ok(syncOpts.ca.length == 2);
