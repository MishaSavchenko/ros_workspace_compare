document.getElementById('workspace_adder').addEventListener('click', () => {
    window.postMessage({
        type: 'add_workspace'
    })
})

document.getElementById('ws_comp').addEventListener('click', () => {
    window.postMessage({
        type: 'ws-comp'
    })
})
