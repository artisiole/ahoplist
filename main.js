function addMap(rank, name, imgsrc){
    const mapDiv = document.createElement('div');

    mapDiv.classList.add('mapDiv');

    mapDiv.innerHTML = 
    '<div class="thumbnail">'
    +'<img src="'+imgsrc+'"></img>'
    +'<h2>#' + rank + ' - '+name+'</h2>'
    +'<p>Tier 6 : n completions : 200 points</p>'
    +'</div>';

    document.querySelector('.main').appendChild(mapDiv);
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
            addMap(data.list[i].rank, data.list[i].name, data.list[i].imgsrc);
        }
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });