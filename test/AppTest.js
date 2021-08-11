const Application = require('spectron').Application;
const electronPath = require('electron');
const path = require('path');
const assert = require('assert');

describe('App Test', function () {
  this.timeout(30000);

  before(function () {
    this.app = new Application({
      path: electronPath,
      args: [path.join(__dirname, '..')]
    });
    return this.app.start();
  });

  after(function () {
    if (this.app && this.app.isRunning()) {
      return this.app.stop();
    }
  });

  it('Displays App window', async function () {
    let windowCount = await this.app.client.getWindowCount();
    assert.equal(windowCount, 1);
  });

  it('Header displays appropriate text', async function () {
    const headerElement = await this.app.client.$("h1");

    let headerText = await headerElement.getText();

    assert.equal(headerText, "💖 Hello World!"); 
  });
});
