import * as Electron from 'electron';
import { BrowserWindow, Menu } from 'electron';
import { Api } from './api/api-service';

require('electron-reload')('.', {
  // Note that the path to electron may vary according to the main file
  electron: Electron
});

export default class Main {
  static mainWindow: Electron.BrowserWindow;
  static application: Electron.App;
  static BrowserWindow;
  static devMode = true;
  private static onWindowAllClosed() {
    if (process.platform !== 'darwin') {
      Main.application.quit();
    }
  }

  private static onClose() {
    // Dereference the window object. 
    Main.mainWindow = null;
  }

  private static onReady() {
    Main.mainWindow = new Main.BrowserWindow({
      'width': 1024,
      'height': 576,
      'backgroundColor': '#ffffff',
      'webPreferences': {
        'devTools': 'dev'
      },
      'icon': `file://${__dirname}//favicon.png`
    });
    const template = []
    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)
    console.log(`file://${__dirname}/index.html`)
    Main.mainWindow
      .loadURL(`file://${__dirname}/index.html`);
    Main.mainWindow.on('closed', Main.onClose);
    if (Main.devMode) {
      Main.mainWindow.webContents.openDevTools()
    }
    
  }

  static main(app: Electron.App, browserWindow: typeof BrowserWindow) {
    // we pass the Electron.App object and the  
    // Electron.BrowserWindow into this function 
    // so this class has no dependencies. This 
    // makes the code easier to write tests for 
    
    Main.BrowserWindow = browserWindow;
    Main.application = app;
    Main.application.on('window-all-closed', Main.onWindowAllClosed);
    
    Main.application.on('ready', Main.onReady);
    let api = new Api();
  }
}