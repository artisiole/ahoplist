// The name of the selected map
let mapName = window.location.href.split('?m=')[1];
mapName = mapName.replaceAll("%20", " ");

let rank = 0;
let imgsrc = "";
let author = "";
let tier = 0;
let id = 0;
let par = 0;

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
                id = data.list[i].id;

                par = data.list[i].par;
            }
        }

        document.getElementById("mapname").textContent = "#"+rank + " - " + mapName;
        document.getElementById("par").textContent = "Par time: " + time_format(par);

        document.getElementById("map-thumbnail").innerHTML = '<img src="'+imgsrc+'"></img>';

        // todo: Populate table with data retrieved from momentum mod API based on map id
        // Currently no API access
        fetch("https://raw.githubusercontent.com/artisiole/ahoplist/refs/heads/main/data/test_map.json")
        //fetch("https://api.momentum-mod.org/v1/maps/"+id+"/leaderboard?gamemode=9&take=100&trackType=0&trackNum=1")
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const table = document.getElementById("recordsTable")
            for(i = 0; i < data.data.length; i++){
                const row = table.insertRow();
                let userText = row.insertCell(); 
                
                let timeText = row.insertCell();
                
                if(data.data[i].time > par){
                    timeText.innerHTML = time_format(data.data[i].time);
                    userText.innerHTML = data.data[i].user.alias;
                } else {
                    // BEWARE: Not sanitized yet!!!!
                    timeText.innerHTML = "<b>"+time_format(data.data[i].time)+"</b>";
                    userText.innerHTML = "<b>"+data.data[i].user.alias+"</b>";
                }
                
            }
        })
        .catch(error => {
        console.error('Completion data fetch operation error:', error);
        })
        })
    .catch(error => {
        console.error('Map data fetch operation error:', error);
    });

function time_format(time){
    minutes = Math.floor(time / 60);
    hours = Math.floor(minutes / 60); minutes %= 60;
    seconds = (time % 60);

    output = "";

    if(hours > 0){
        output += hours+":";
        if(minutes < 10){
            output += "0";
        }
    }

    if(minutes > 0){
        output += minutes+":";
    }

    if(seconds < 10){
        output += "0";
    }

    return output + seconds.toFixed(2);
}