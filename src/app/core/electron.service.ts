declare global {
  interface Window {
    require: any;
  }
}

import { Injectable } from '@angular/core';
const { ipcRenderer } = window.require("electron");

@Injectable({
  providedIn: 'root'
})
export class ElectronService {

  constructor() {
  }

  createMainWindow() {
    ipcRenderer.invoke('create-main-window');
  }

  exitApp() {
    ipcRenderer.invoke('exit-app');
  }
}
