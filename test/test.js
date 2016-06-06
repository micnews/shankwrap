var test = require('tape');
var shankwrap = require('../index');

const TEST_OBJECT = {
  'name': 'black pearl',
  'version': '1.0',
  'dependencies': {
    'jack-sparrow': {
      'version': '1.6.5',
      'from': 'jack-sparrow@>=1.0.0 <2.0.0',
      'resolved': 'https://registry.npmjs.org/jack-sparrow/-/jack-sparrow-1.6.5.tgz',
      'dependencies': {
        'async': {
          'version': '2.0.0-rc.5',
          'from': 'async@>=2.0.0-rc.3 <3.0.0',
          'resolved': 'https://registry.npmjs.org/async/-/async-2.0.0-rc.5.tgz'
        },
        'lodash': {
          'version': '4.13.1',
          'from': 'lodash@>=4.8.0 <5.0.0',
          'resolved': 'https://registry.npmjs.org/lodash/-/lodash-4.13.1.tgz'
        },
        'foreground-child': {
          'version': '1.3.0',
          'from': 'git+https://github.com/bcoe/foreground-child.git#win-spawn',
          'resolved': 'git+https://github.com/bcoe/foreground-child.git#ad7ba1d4a84e8b199cbfb5d30e01e586390978cc',
          'dependencies': {
            'win-spawn': {
              'version': '2.0.0',
              'from': 'win-spawn@>=2.0.0 <3.0.0',
              'resolved': 'https://registry.npmjs.org/win-spawn/-/win-spawn-2.0.0.tgz'
            }
          }
        }
      }
    }
  }
};

test('it does not remove non-dependency related keys', function (t) {
  var obj = { 'don\'t hurt me': 'i\'m friendly' };

  t.equal(JSON.stringify(obj, {}, 2), shankwrap(obj, new Set()));

  t.end();
});

test('it removes \'resolved\' properties when the link is not a git repo', function (t) {
  var obj = JSON.parse(shankwrap(TEST_OBJECT, new Set()));

  t.notOk(obj['dependencies']['jack-sparrow']['resolved']);
  t.end();
});

test('it does not remove \'resolved\' properties when the link is a git repo', function (t) {
  var obj = JSON.parse(shankwrap(TEST_OBJECT, new Set()));

  t.ok(obj['dependencies']['jack-sparrow']['dependencies']['foreground-child']['resolved']);
  t.end();
});

test('it removes blacklisted properties', function (t) {
  var obj = JSON.parse(shankwrap(TEST_OBJECT, new Set(['jack-sparrow'])));

  t.notOk(obj['dependencies']['jack-sparrow']);
  t.end();
});
