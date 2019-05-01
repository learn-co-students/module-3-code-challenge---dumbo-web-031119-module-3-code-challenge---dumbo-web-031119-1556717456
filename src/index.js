const beerBar = document.getElementById('list-group')
const beerDisplay = document.getElementById('beer-detail')

const getBeers = () => {
    fetch('http://localhost:3000/beers')
        .then(resp => resp.json())
        .then(showBeers)
}

const fetchBeer = (beerID) => {
    return fetch(`http://localhost:3000/beers/${beerID}`)
        .then(resp => resp.json())
}

const updateBeer = (event) => {
    let newDesc = event.target.previousElementSibling.value
    let beerID = (event.target.dataset.id);
    //update on database
    if (event.target.id === 'edit-beer') {
        console.log(event.target.id);
        fetch(`http://localhost:3000/beers/${beerID}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                description: newDesc
            })
        })
    }
}

const showBeers = (beers) => {
    beers.forEach(beer => {
        addBeerToBar(beer)
    });
}

const showDetails = (beer) => {
    beerDisplay.innerHTML = `
    <h1>${beer.name}</h1>
    <img src="${beer.image_url}">
    <h3>${beer.tagline}</h3>
    <textarea name='beerInput' >${beer.description}</textarea>
    <button data-id=${beer.id} id="edit-beer" class="btn btn-info">
      Save
    </button>
`
}

const addBeerToBar = (beer) => {
    // console.log(beer)
    beerBar.innerHTML += `<li data-id=${beer.id} class="list-group-item">${beer.name}</li>`
}

const getDetails = (event) => {
    // console.log(event.target.dataset.id)
    fetchBeer(event.target.dataset.id)
        .then(jBeer => showDetails(jBeer))
}

beerDisplay.addEventListener('click', updateBeer)
beerBar.addEventListener('click', getDetails)

getBeers()

// Object { id: 23, 
// name: "The End Of History", 
// tagline: "The World's Strongest Beer.", 
// first_brewed: "06/2011", 
// description: "The End of History: The name derives from the famous work of philosopher Francis Fukuyama, this is to beer what democracy is to history. Complexity defined. Floral, grapefruit, caramel and cloves are intensified by boozy heat.", 
// image_url: "https://images.punkapi.com/v2/24.png", 
// food_pairing: (3) […], 
// brewers_tips: "You'll have to get this one all the way down to -70°C. Taxidermy is not optional.", contributed_by: "Sam Mason <samjbmason>" }