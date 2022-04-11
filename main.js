let searchForm = document.getElementById('searchForm')

searchForm.addEventListener('submit', function(event){
    event.preventDefault()

    let searchResultsDiv = document.getElementById('searchResultsDiv') 
    // this div contains all search results
    let quickfindDiv = document.getElementById('quickfindDiv')
    let quickfindOptions = document.getElementById('quickfindOptions')

    let searchValue = document.getElementById('search').value
    let apiSearch = `https://proxy-itunes-api.glitch.me/search?term=${searchValue}&media=music`

    fetch(apiSearch, {
        method: 'GET',
        headers: {},
    })
    .then(function(response) {
        return response.json()
    })
    .then(function(data) {

        var quickfindSelect = document.getElementById('quickfindSelect')
        quickfindSelect.remove()

        var quickfindSelect = document.createElement("select")
        quickfindSelect.id = "quickfindSelect"

        quickfindOptions.appendChild(quickfindSelect)

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

            let option = buildElement("option", "option", result.trackName)
            option.value = result.trackName
            quickfindSelect.appendChild(option)
            // this populates dropdown menu with search results for easy search selection
        }

        quickfindDiv.addEventListener("submit", function(event) {
            event.preventDefault()
            document.location = `#${quickfindSelect.options[quickfindSelect.selectedIndex].value}`
        })
    })
})
