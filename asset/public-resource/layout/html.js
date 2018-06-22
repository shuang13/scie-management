const layout = require('./html.ejs');
const header = require('../components/header/html.ejs');
const sidebar = require('../components/side-bar/html.ejs');
const footer = require('../components/footer/html.ejs');

const moduleExports = {
  run(content) {
    const renderData = {
      header: header(),
      sidebar: sidebar(),
      footer: footer(),
      content,
    };
    return layout(renderData);
  },
};

module.exports = moduleExports;