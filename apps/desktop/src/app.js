const path = require('path');
const url = require('url');

const { app, BrowserWindow } = require('electron');

const isDev = false;

let win;

function createWindow() {
  win = new BrowserWindow({
    height: 800,
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true
    },
    width: 475
  });

  win.loadURL(url.format({ pathname: path.join(__dirname, 'index.html'), protocol: 'file:', slashes: true }));
  win.removeMenu();
  win.setIcon(`${path.join(__dirname, 'favicon.ico')}`);

  if (isDev) {
    win.webContents.openDevTools();
    win.setResizable(true);
  } else {
    win.setResizable(false);
  }

  win.on('closed', () => { win = null });
}

app.on('ready', createWindow);
app.on('window-all-closed', () => { if (process.platform !== 'darwin') { app.quit() } });
app.on('activate', () => { if (win === null) { createWindow() } });
