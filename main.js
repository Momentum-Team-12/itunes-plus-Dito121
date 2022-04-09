let searchResultsDiv = document.getElementById('content') 
// this div contains all search results
let shortcutDiv = document.getElementById('shortcutOptions')
//let apiSearch = "https://proxy-itunes-api.glitch.me/search?term=" + userInput + "&media=music"

fetch("https://proxy-itunes-api.glitch.me/search?term=radiohead&media=music", {
    method: 'GET',
    headers: {},
})
.then(function(response) {
    return response.json()
})
.then(function(data) {

    let shortcutSelect = document.createElement("select")
    shortcutSelect.id = "shortcutSearch"

    let label = document.createElement("label")
    let innerDiv = document.createElement("div")
    innerDiv.innerText = "Shortcut for finding song: "
    label.appendChild(innerDiv)

    shortcutDiv.appendChild(label).appendChild(shortcutSelect)

    for (let result of data.results){

        let songCard = buildElement('div', 'songCard', '') 
        songCard.id = result.trackName
        // this div-type element is the container for all song info
        let artistName = buildElement('div', 'artistName', result.artistName) 
        artistName.id = result.artistName
        // this div-type element is for the artist name
        let songName = buildElement('div', 'songName', result.trackName) 
        //songName.id = result.trackName
        // this div-type element is for the song name
        let releaseDate = buildElement('div', 'releaseDate', reformatReleaseDate(result.releaseDate))
        // this div-type element is for the release
        let pic = buildElement('img', 'albumCover', '') 
        // this img-type element is for the album cover
        pic.src = result.artworkUrl100.slice(0, -13) + "200x200bb.jpg"
        // this sets source url of album cover to appropriate picture

        songCard.appendChild(pic) 
        // this puts picture of album cover into song card so that it is on the top
        songCard.appendChild(artistName) 
        // this puts artist name into song card so that it is below song name
        songCard.appendChild(songName) 
        // this puts song name into song card so that it is directly under the image
        songCard.appendChild(releaseDate)
        // this puts release date of song into song card so that it is at bottom
        searchResultsDiv.appendChild(songCard) 
        // this puts song card with picture and info into the search results area

        let option = document.createElement("option")
        option.value = result.trackName
        option.innerText = result.trackName
        shortcutSelect.appendChild(option)
        // this populates dropdown menu with search results for easy search selection
    }

    let shortcutForm = document.getElementById("shortcutCard")
    let selectBox = document.getElementById("shortcutSearch")

    shortcutForm.addEventListener("submit", function(event) {
    event.preventDefault()
    //console.log(selectBox.selectedIndex)
    document.location = `#${selectBox.options[selectBox.selectedIndex].value}`
    })
})

