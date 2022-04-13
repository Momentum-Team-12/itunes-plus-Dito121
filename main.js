let searchForm = document.getElementById('searchForm')

searchForm.addEventListener('submit', function(event){
    event.preventDefault()

    let quickfindDiv = document.getElementById('quickfindDiv')
    let quickfindOptions = document.getElementById('quickfindOptions')

    let searchValue = document.getElementById('search').value + '&media=music&attribute=artistTerm'

    fetch(`https://proxy-itunes-api.glitch.me/search?term=${searchValue}`, {
        method: 'GET',
    })
    .then(function(response) {
        return response.json()
    })
    .then(function(data) {

        let content = document.getElementById('content')
        let searchResultsDiv = document.getElementById('searchResultsDiv') 
        searchResultsDiv.remove()

        searchResultsDiv = document.createElement('div')
        searchResultsDiv.id = 'searchResultsDiv'
        content.appendChild(searchResultsDiv)

        if (data.results) {
            if (data.results.length === 0){
                searchResultsDiv.innerText = 'no results found'
                return 
            }

            let quickfindSelect = document.getElementById('quickfindSelect')
            quickfindSelect.remove()

            quickfindSelect = document.createElement("select")
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
                // this div-type element is for the song name
                console.log(result.releaseDate)
                let releaseDate = buildElement('div', 'releaseDate', reformatDate(result.releaseDate))
                // this div-type element is for the release
                let pic = buildElement('img', 'albumCover', '') 
                // this img-type element is for the album cover
                pic.src = result.artworkUrl100.slice(0, -13) + "300x300bb.jpg"
                // this sets source url of album cover to appropriate picture

                let audio = buildElement('audio', 'audioPreview', '')
                audio.src = result.previewUrl
                audio.controls = 'controls'
                audio.addEventListener("click", function(event) {
                event.preventDefault()
                audio.play()
            })

            songCard.appendChild(pic) 
            // this puts picture of album cover into song card so that it is on the top
            songCard.appendChild(audio)
            songCard.appendChild(artistName) 
            // this puts artist name into song card
            songCard.appendChild(songName) 
            // this puts song name into song card
            songCard.appendChild(releaseDate)
            // this puts release date of song
            searchResultsDiv.appendChild(songCard)
            // this puts song card with picture and info into the search results area

            let option = buildElement("option", "option", result.trackName)
            option.value = result.trackName
            quickfindSelect.appendChild(option)
            // this populates dropdown menu with search results for easy search selection
        }

        sortSelect(quickfindSelect)

        quickfindDiv.addEventListener("submit", function(event) {
            event.preventDefault()
            document.location = `#${quickfindSelect.options[quickfindSelect.selectedIndex].value}`
        })
        }
    })
    .catch(error => {
        searchResultsDiv.innerText = 'none';
        console.error(error)
    });
})
