chrome.action.onClicked.addListener(async tab => {
  await chrome.windows.create({
    height: 800,
    type: 'popup',
    url: 'index.html',
    width: 475
  });
});
