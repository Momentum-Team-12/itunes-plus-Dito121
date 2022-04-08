let songDiv = document.getElementById('content') // this div contains all search results

fetch("https://proxy-itunes-api.glitch.me/search?term=radiohead&media=music", {
    method: 'GET',
    headers: {},
})
.then(function(response) {
    return response.json()
})
.then(function(data) {
    for (let result of data.results){

        songCard = buildElement('div', 'songCard', '') 
        // this div-type element is the container for all song info
        songName = buildElement('div', 'songName', result.trackName) 
        songName.id = result.trackName
        // this div-type element is for the song name
        artistName = buildElement('div', 'artistName', result.artistName) 
        artistName.id = result.artistName
        // this div-type element is for the artist name
        pic = buildElement('img', 'picture', '') 
        // this img-type element is for the album cover
        pic.src = result.artworkUrl100.slice(0, -13) + "200x200bb.jpg"
        // this sets source url of album cover to appropriate picture
        releaseDate = buildElement('div', 'picture', result.releaseDate) 

        songCard.appendChild(pic) 
        // this puts picture of album cover into song card so that it is on the top
        songCard.appendChild(songName) 
        // this puts song name into song card so that it is directly under the image
        songCard.appendChild(artistName) 
        // this puts artist name into song card so that it is below song name
        songDiv.appendChild(songCard) 
        // this puts song card with picture and info into the search results area
    }
})

