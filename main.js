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
            nodeIntegration: false,
            enableRemoteModule: false,
            contextIsolation: true,
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

async function get_directories(directory) {
    console.log("getting directories");
    return await fetch(mainAddr + "/add_workspace/" + directory)
        .then(response => response.json())
        .then(data => {
            return data;
        });
}

ipcMain.handle('select-dirs', async (event, args) => {
    let vcs_result = await get_directories("/home/misha/code/wbc_ws/src");

    for (const key of Object.keys(vcs_result)) {
        const inner_res = JSON.parse(vcs_result[key]);
        vcs_result[key] = inner_res;
    };

    event.returnValue = vcs_result;

    return vcs_result;
})

async function ws_comp() {
    // console.log("ws-comp-test");
    return await fetch(mainAddr + "/workspace_compare_test")
        .then(response => response.json())
        .then(data => {
            return data;
        });
}

ipcMain.handle('ws-comp', async (event, args) => {
    let comp_res = await ws_comp();
    return comp_res["res"];

    // console.log(comp_res);
    // for (const key of Object.keys(vcs_result)) {
    //     const inner_res = JSON.parse(vcs_result[key]);
    //     vcs_result[key] = inner_res;
    // };

    // event.returnValue = vcs_result;
    // console.log("geez i hope i get a second date");
    // return "heyheyhey";
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
