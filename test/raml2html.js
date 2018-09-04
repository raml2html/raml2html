const t = require('tap');
const { spawnSync } = require('child_process');
const path = require('path');

function getStderr(spawned) {
  return spawned.stderr.toString('utf8');
}

// Remove path from snapshot
function sanitizePrettyOutput(output) {
  return output.replace(new RegExp(process.cwd(), 'g'), '');
}

function spawn(args) {
  const raml2html = path.join(__dirname, '../bin/raml2html');

  return spawnSync(raml2html, args);
}

t.test('raml2html', t => {
  t.test('with validation', t => {
    const raml = path.join(__dirname, './fixtures/api.raml');

    t.test('json errors', t => {
      const raml2html = spawn(['-v', raml]);

      t.same(raml2html.status, 1, 'check status');
      t.matchSnapshot(getStderr(raml2html), 'json output');

      t.end();
    });

    t.test('json errors suppress warnings', t => {
      const raml2html = spawn(['-v', '--suppress-warnings', raml]);

      t.same(raml2html.status, 1, 'check status');
      t.matchSnapshot(getStderr(raml2html), 'without warnings json output');

      t.end();
    });

    t.test('pretty print', t => {
      const raml2html = spawn(['-v', '--pretty-errors', raml]);

      t.same(raml2html.status, 1, 'check status');
      t.matchSnapshot(
        sanitizePrettyOutput(getStderr(raml2html)),
        'pretty printed output'
      );

      t.end();
    });

    t.test('pretty print without warnings', t => {
      const raml2html = spawn([
        '-v',
        '--pretty-errors',
        '--suppress-warnings',
        raml,
      ]);

      t.same(raml2html.status, 1, 'check status');
      t.matchSnapshot(
        sanitizePrettyOutput(getStderr(raml2html)),
        'pretty printed output'
      );

      t.end();
    });

    t.end();
  });

  t.end();
});
