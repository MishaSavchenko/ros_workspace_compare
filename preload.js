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



window.addEventListener('message', async evt => {
    if (evt.data.type === 'ws-comp') {
        const res = await ipcRenderer.invoke('ws-comp').then((result) => {
            return result;
        });
        var doc = new DOMParser().parseFromString(res, "text/html");
        let table = doc.getElementById("difflib_chg_to0__top");

        // console.log(typeof (table));
        document.getElementById("ws_comp_res").append(table);
        // document.getElementById("ws_comp_res").insertAdjacentHTML('beforeend', table);
        // console.log(doc.innerHTML);

        // if (Object.keys(res).length != 1) {
        //     throw new Error("Returned workspace is malformed, the length of keys is not 1");
        // }

        // let ws_data = document.getElementById('ws_a');
        // ws_data.getElementsByClassName('collapsible')[0].textContent = Object.keys(res)[0];

        // let elem = ws_data.getElementsByClassName('current_workspace')[0].getElementsByTagName("div")[0];
        // elem.innerHTML = YAML.stringify(Object.values(res)[0]);
    }
})

