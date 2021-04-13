const { BrowserWindow, Tray } = require('electron');
const url = require('url');
const path = require('path');


class MenuApp {
  constructor() {
    this.tray = undefined;
    this.win = this.createWindow();
    this.createWindow();
    this.createTray();
  }

  createWindow() {
    // Create the browser window.
    const win = new BrowserWindow({
      width: 450,
      height: 400,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false
      },
      frame: false,
      show: false,
      movable: false,
      resizable: false,
      closable: false
    });

    // win.loadURL('http://localhost:4200/traywindow');
    win.loadURL(url.format({
      pathname: path.join(__dirname, '/dist/time-tracker/index.html#'),
      protocol: 'file:',
      slashes: true
    }))

    win.on('close', () => {
      this.win = undefined;
    })
    
    return win;
  }

  createTray() {
    this.tray = new Tray('src/assets/netjagaimo_icon.png');
  
    this.tray.on('click', (event, bounds, position) => {
      this.toggleWindow(bounds);
    });

    this.tray.on('double-click', (event, bounds) => {
      this.toggleWindow(bounds);
    });

    // comment when on develop mode
    this.win.on('blur', () => {
      this.win.hide();
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