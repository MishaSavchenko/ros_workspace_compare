const { contextBridge, ipcRenderer } = require('electron')
const YAML = require('yaml');

window.addEventListener('message', async evt => {
    if (evt.data.type === 'select-dirs') {
        const res = await ipcRenderer.invoke('select-dirs').then((result) => {
            return result;
        });

        if (Object.keys(res).length != 1) {
            throw new Error("Returned workspace is malformed, the length of keys is not 1");
        }

        let ws_data = document.getElementById('ws_a');
        ws_data.getElementsByClassName('collapsible')[0].textContent = Object.keys(res)[0];

        let elem = ws_data.getElementsByClassName('current_workspace')[0].getElementsByTagName("div")[0];
        elem.innerHTML = YAML.stringify(Object.values(res)[0]);
    }
})


