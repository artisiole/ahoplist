let mapsList = []

function addMap(rank, name, imgsrc, author, tier, listSize){
    const mapDiv = document.createElement('div');

    mapDiv.classList.add('mapDiv');

    mapDiv.innerHTML = 
    '<div class="thumbnail">'
    +'<img src="'+imgsrc+'"></img>'
    +'<h2>#' + rank + ' - '+name+'</h2>'
    +'<p>by '+author+', Tier '+tier+'<br>'+calculatePoints(rank, listSize, 3, 200, 10)+' points</p>'
    +'</div>';

    mapDiv.id = name;

    document.querySelector('.main').appendChild(mapDiv);
    mapsList.push(mapDiv);
}

// (Simple) formula for calculating number of points a completion yields
function calculatePoints(rank, size, exponent, max, min){
    return ((((size - rank) ** exponent)/((size - 1) ** exponent)) * (max-min) + min).toFixed(2);
}

console.log("Creating list...");

// Load json file of list
fetch('https://raw.githubusercontent.com/artisiole/ahoplist/refs/heads/main/list.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        for(i = 0; i < data.list.length; i++){
            console.log(data.list[i]);
            // Add a map to the list based on json data
            addMap(data.list[i].rank, data.list[i].name, data.list[i].imgsrc, data.list[i].author, data.list[i].tier, data.list.length);
        }

        // Button functionality to each map div
        for(let i = 0; i < mapsList.length; i++) {
            mapsList[i].addEventListener("click", function(){openMap(mapsList[i].id)});
        }
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });

function openMap(filename)
{
    console.log("Map " + filename);
    window.location = "map-page.html?m="+filename;
}