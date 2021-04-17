const { app, BrowserWindow, ipcMain, screen } = require('electron')
const { MenuApp } = require('./MenuApp');
const path = require('path');

let menuApp;

if (app.isPackaged && process.platform == 'darwin') {
  app.dock.hide();
}

const createMainWindow = () => {
  menuApp.isMainWindowOpen = true;

  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  const currentDisplay = screen.getDisplayNearestPoint(screen.getCursorScreenPoint());
  const currentWorkArea = currentDisplay.workArea;
  const winSize = win.getSize();
  const x = Math.floor((currentWorkArea.x + currentWorkArea.width / 2) - (winSize[0] / 2));
  const y = Math.floor(currentWorkArea.y + currentWorkArea.height / 2 - (winSize[1] / 2));
  win.setPosition(x, y);

  if(app.isPackaged) {
    win.loadURL(new URL(
      path.join(__dirname, 'dist/time-tracker/index.html#', 'main'),
      'file:'
    ).href);
  } else {
    win.loadURL('http://localhost:4200#/main')
  }
  

  win.on('close', () => {
    menuApp.isMainWindowOpen = false;
  });

};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  menuApp = new MenuApp();
})

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
})

app.on('quit', () => {
  console.log('quit');
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

ipcMain.handle('create-main-window', async () => {
  createMainWindow();
});

ipcMain.handle('exit-app', () => {
  app.exit();
});