document.getElementById('ws_comp').addEventListener('click', () => {
    window.postMessage({
        type: 'ws-comp'
    })
})
