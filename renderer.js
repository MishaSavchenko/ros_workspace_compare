const { collapsable_callback } = require('./lib.js');

document.getElementById('dirs').addEventListener('click', () => {
    window.postMessage({
        type: 'select-dirs'
    })
})

var coll = document.getElementsByClassName("collapsible");
for (var i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", collapsable_callback);
}


document.getElementById('ws_comp').addEventListener('click', () => {
    window.postMessage({
        type: 'ws-comp'
    })
})
