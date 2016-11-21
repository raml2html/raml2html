const glob = require('glob');
const raml2html = require('..');
const fs = require('fs');

process.chdir(__dirname);

const config = raml2html.getDefaultConfig();
const examples = glob.sync('*.raml');

examples.forEach((ramlFile) => {
  raml2html.render(ramlFile, config).then((result) => {
    const filename = ramlFile.replace('.raml', '.html');
    fs.writeFileSync(filename, result);
  }, (error) => {
    console.log('error! ', error);
  });
});
