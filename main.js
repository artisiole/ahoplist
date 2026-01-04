function addMap(rank, name, imgsrc){
    const mapDiv = document.createElement('div');

    mapDiv.classList.add('mapDiv');

    mapDiv.innerHTML = 
    '<div class="thumbnail">'
    +'<img src="'+imgsrc+'"></img>'
    +'<h2>#' + rank + ' - '+name+'</h2>'
    +'<p>n completions: 200 points</p>'
    +'</div>';

    document.querySelector('.main').appendChild(mapDiv);
}

console.log("Creating list...");
addMap();

// Load json file of list
fetch('list.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });