let songDiv = document.getElementById('content')

fetch("https://itunes.apple.com/search?term=jdilla&media=music", {
    method: 'GET',
    headers: {},
})
.then(function(response) {
    return response.json()
})
.then(function(data) {
    for (let result of data.results){
        songCard = buildElement('div', 'songCard', '')
        songName = buildElement('div', 'songName', result.trackName)
        pic = buildElement('img', 'picture', '')
        pic.src = result.artworkUrl100
        artistName = buildElement('div', 'artistName', result.artistName)

        songCard.appendChild(pic)
        songCard.appendChild(songName)
        songCard.appendChild(artistName)
        songDiv.appendChild(songCard)
    }
})

// functions stored below here
function buildElement(elementType, className, text) {
    let element = document.createElement(elementType)
    element.classList.add(className)
    element.innerText = text
    return element
}
