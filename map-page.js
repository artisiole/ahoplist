// The name of the selected map
let mapName = window.location.href.split('?m=')[1];
mapName = mapName.replaceAll("%20", " ");

let rank = 0;
let imgsrc = "";
let author = "";
let tier = 0;

fetch('https://raw.githubusercontent.com/artisiole/ahoplist/refs/heads/main/list.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        // Linear search for map
        for(i = 0; i < data.list.length; i++){
            if(data.list[i].name.toLowerCase() == mapName.toLowerCase()){
                rank = data.list[i].rank;
                imgsrc = data.list[i].imgsrc;
                author = data.list[i].author;
                tier = data.list[i].tier;
            }
        }

        document.getElementById("mapname").textContent = "#"+rank + " - " + mapName;

        document.getElementById("map-thumbnail").innerHTML = '<img src="'+imgsrc+'"></img>';

        // Populate table with data retrieved from momentum mod API based on map id
        fetch("https://raw.githubusercontent.com/artisiole/ahoplist/refs/heads/main/data/test_map.json")
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const table = document.getElementById("recordsTable")
            for(i = 0; i < data.board.length; i++){
                const row = table.insertRow();
                let userText = row.insertCell(); userText.innerHTML = data.board[i].user;
                let timeText = row.insertCell(); timeText.innerHTML = data.board[i].time;
            }
        })
        .catch(error => {
        console.error('Completion data fetch operation error:', error);
        })
        })
    .catch(error => {
        console.error('Map data fetch operation error:', error);
    });