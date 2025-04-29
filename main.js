const { app, BrowserWindow, Menu } = require('electron/main')
const path = require('node:path');

//window config
const createWindow = () => {
    const win = new BrowserWindow({
        width: 600,
        height: 800,
        resizable: false,
        webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
        nodeIntegration: true
        },
    });

    win.loadFile('./src/index.html')
    win.webContents.openDevTools() //for inspect element like in google chrome
    
    //for right-click inspect element like in google chrome again eiei
    win.webContents.on('context-menu', (event, params) => {
        const menu = Menu.buildFromTemplate([
          {
            label: 'Inspect Element',
            click: () => {
              win.webContents.inspectElement(params.x, params.y);
            }
          }
        ]);
        menu.popup({ window: win });
      });
}


//check if ready
app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
        }
    })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})