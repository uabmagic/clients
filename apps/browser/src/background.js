function initialize() {
  const window = {
    height: 800,
    type: 'popup',
    url: 'index.html',
    width: 475
  };

  if (chrome.runtime.getManifest().manifest_version === 3) {
    chrome.action.onClicked.addListener(async _tab => {
      await chrome.windows.create(window);
    });
  } else {
    browser.browserAction.onClicked.addListener(async _tab => {
      await browser.windows.create(window);
    });
  }
}

initialize();
