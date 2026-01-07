function openStats() {
    console.log("Stats viewer");
    window.location = "stats-viewer.html";
}

function openAbout() {
    console.log("About");
    window.location = "stats-viewer.html";
}

function openList() {
    console.log("List");
    window.location = "index.html";
}

document.getElementById("stats").addEventListener("click", openStats);
document.getElementById("about").addEventListener("click",openAbout);
document.getElementById("list").addEventListener("click",openList);