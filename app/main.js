const { app, BrowserWindow } = require('electron')
const url = require("url");
const path = require("path");
const env = process.env.NODE_ENV || 'development';

const args = process.argv.slice(1);
const serve = args.some(val => val === '--serve');

let mainWindow;
function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    });

    // Open the DevTools.
    //mainWindow.webContents.openDevTools();

    if(serve){
        require('electron-reload')(__dirname, {
            electron: require(`${__dirname}/node_modules/electron`)
        });
        mainWindow.loadURL('http://localhost:4200');
    }else{
        mainWindow.loadURL(url.format({
            pathname: path.join(__dirname, 'dist/index.html'),
            protocol: 'file:',
            slashes: true
        }));
    }

    mainWindow.on('closed', function () {
        mainWindow = null
    });

    return mainWindow;
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
});

app.on('activate', function () {
    if (mainWindow === null) createWindow()
});