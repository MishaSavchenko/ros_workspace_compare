const { contextBridge, ipcRenderer } = require('electron')
const YAML = require('yaml');
const { collapsable_callback } = require('./lib.js');


window.addEventListener('message', async evt => {
    if (evt.data.type === 'ws-comp') {
        const res = await ipcRenderer.invoke('ws-comp').then((result) => {
            return result;
        });
        var workspace_name = Object.keys(res)[0];
        var workspace_diff = Object.values(res)[0];
        var doc = new DOMParser().parseFromString(workspace_diff, "text/html");
        let table = doc.getElementById("difflib_chg_to0__top");
        table.style.display = 'block';

        collapsable = document.getElementById("collapsible_template").cloneNode(true);
        collapsable.classList.add("active");
        collapsable.getElementsByClassName("collapsible active")[0].textContent = workspace_name;
        collapsable.style.display = 'block';
        collapsable.removeAttribute('id');
        collapsable.appendChild(table);
        collapsable.getElementsByClassName("collapsible")[0].addEventListener("click", collapsable_callback);

        document.body.appendChild(collapsable);
    }
})

