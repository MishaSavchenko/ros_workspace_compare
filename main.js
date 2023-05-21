const { electron, app, BrowserWindow, ipcMain, nativeTheme, dialog, ipcRenderer } = require('electron')
const path = require('path')
const fs = require('fs')
const https = require('https')

let mainWindow = null;
let mainAddr = null;

const subpy = require('child_process').spawn('python3', ['./hello.py']);
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
            enableRemoteModule: false,
            contextIsolation: false,
            sandbox: false
        }
    })
    mainWindow.webContents.openDevTools();

    mainWindow.loadFile('index.html')
    // mainWindow.loadFile('diff.html')
    mainWindow.on('closed', function () {
        mainWindow = null;
        subpy.kill('SIGINT');
    });
}

async function add_workspace(directory) {
    return await fetch(mainAddr + "/add_workspace/" + directory)
        .then(response => response.json())
        .then(data => {
            return data;
        });
}


ipcMain.handle('add_workspace', async (event, args) => {
    const directory = await dialog.showOpenDialog(mainWindow, {
        properties: ['openDirectory']
    })
    const res = await add_workspace(directory);

    console.log('adding directory res :', res["response"]);
})


async function ws_comp() {
    return await fetch(mainAddr + "/workspace_compare_test")
        .then(response => response.json())
        .then(data => {
            return data;
        });
}

ipcMain.handle('ws-comp', async (event, args) => {
    return await ws_comp();
})

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        console.log('activate!');

        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('ready', function () {
    mainAddr = 'http://localhost:5000';

    function startUp() {
        fetch(mainAddr)
            .then(function (htmlString) {
            })
            .catch(function (err) {
                startUp();
            });
    }
    startUp();

});

app.on('window-all-closed', function () {
    if (process.platform != 'darwin') {
        app.quit();
    }
});
