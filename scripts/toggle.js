const toggle = document.getElementById("toggle-button");
const info = chrome.management.getSelf();

function setState() {
    info.then((result) => {
        toggle.checked = result.enabled; 
    }).catch((err) => {
        console.log(err);
    });
}

document.addEventListener('DOMContentLoaded', setState());

toggle.addEventListener('click', function() {
    info.then((result) => {
        console.log(result.id);
        chrome.management.setEnabled(result.id, !result.enabled);
        toggle.checked = !result.enabled; 
        window.close();
    }).catch((err) => {
        console.log(err);
    });
});