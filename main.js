
fetch("https://itunes.apple.com/search?term=jdilla&media=music", {
    method: 'GET',
    headers: {},
})
.then(function(response) {
    return response.json()
})
.then(function(data) {
    console.log(data)

    for (let result of data.results)
        console.log(result.kind)

    return data
})

