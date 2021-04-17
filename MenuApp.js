const { app, BrowserWindow, Tray } = require('electron');
const path = require('path');


class MenuApp {
  constructor() {
    this.tray = undefined;
    this.win = this.createWindow();
    this.createWindow();
    this.createTray();
    this.isMainWindowOpen = false;
  }

  createWindow() {
    // Create the browser window.
    const win = new BrowserWindow({
      width: 400,
      height: 400,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false
      },
      frame: false,
      show: false,
      movable: false,
      resizable: false
    });
    
    if(app.isPackaged) {
      win.loadURL(new URL(
        path.join(__dirname, 'dist/time-tracker/index.html#', 'traywindow'),
        'file:'
      ).href);
    } else {
      win.loadURL('http://localhost:4200#/traywindow');
    }

    win.on('close', (e) => {
      e.preventDefault();
      this.win.hide();
    })
    
    return win;
  }

  createTray() {
    const trayIconPath = app.isPackaged ? path.join(process.resourcesPath,"static/netjagaimo_icon.png") : "static/netjagaimo_icon.png";
    this.tray = new Tray(trayIconPath);
  
    this.tray.on('click', (event, bounds, position) => {
      this.toggleWindow(bounds);
    });

    this.tray.on('double-click', (event, bounds) => {
      this.toggleWindow(bounds);
    });

    // comment when on develop mode
    this.win.on('blur', () => {
      if(!this.isMainWindowOpen && app.isPackaged) {
        this.win.hide();
      }
    });
  }

  toggleWindow(bounds) {
    if(!this.win) {
      this.win = this.createWindow();
    }

    const trayPosition = { x: bounds.x, y: bounds.y };
    const winWidth = this.win.getSize()[0];
    this.win.setPosition(trayPosition.x - Math.round(winWidth / 2), trayPosition.y);
    if (this.win.isVisible()) {
      this.win.hide();
    } else {
      this.win.show();
    }
  }
}

exports.MenuApp = MenuApp;