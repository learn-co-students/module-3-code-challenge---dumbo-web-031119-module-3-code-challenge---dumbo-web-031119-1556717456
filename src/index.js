const beerUL = document.getElementById("list-group")
const beerDeets = document.getElementById("beer-detail")

const beerLI = (beer) => {
    return `<li class="list-group-item" data-id="${beer.id}">${beer.name}</li>`
}

const beerInfo = (beer) => {
    return `<h1>${beer.name}</h1>
            <img src="${beer-image_url}">
            <h3>${beer.tagline}</h3>
            <textarea>${beer.description}</textarea>
            <button id="edit-beer" class="btn btn-info">
                            Save
            </button>`
}

//-------FETCHS--------//

//get beers list
fetch("http://localhost:3000/beers")
.then(res => res.json())
.then(beers => {
    beers.forEach(beer => {
        beerUL.innerHTML += beerLI(beer);
    })
})

//get beer info
const showBeerInfo = (beerID) => {
fetch(`http://localhost:3000/beers/${beerID}`)
    .then(res => res.json()) 
    .then(beer => {
        beerInfor(beer);
    })
}


//-------EVENT LISTENERS-------//

beerUL.addEventListener('click', showBeerInfo())
