//As a user, when the page loads, I should see a list of beer names retrieved from an API on the left hand side of the screen.

//As a user, when I click a beer name, the application should reveal more information about that particular beer.

//As a user, when looking at the details of a beer, I can edit the current description of a beer.Clicking the 'Save'
// button will save any changes added to the description in the database


const beerListUlTag = document.getElementById('list-group');
const beerDetailsDivTag = document.getElementById('beer-detail')

//fetch call to get beers from database 
const getAllBeer = () => {
    fetch('http://localhost:3000/beers')
    .then(res => res.json())
    .then(parsedBeer => {
        parsedBeer.forEach(beer => {
            renderAllBeerList(beer);
        })
    })
}
getAllBeer();

//fetch call to get a single beer through it's ID for beer details 
const getABeer = (id) => {
    fetch(`http://localhost:3000/beers/${id}`)
    .then(res => res.json())
    .then(parsedSingleBeer => {
        renderBeerDetails(parsedSingleBeer);
    })
}

// function to create/modify html elements and display all beers list
const renderAllBeerList = (beer) => {
    beerListUlTag.innerHTML += `<li class="list-group-item" data-id="${beer.id}">${beer.name}</li>` 
}

//event handler to listen for click on beers list UL then fetch single beer data
beerListUlTag.addEventListener('click', (event) => {
    if (event.target.tagName === 'LI') {
        let beerId = event.target.dataset.id
        getABeer(beerId);
    }
})

//function to create/modify html elements and display full beer details in div
const renderBeerDetails = (parsedSingleBeer) => {
    beerDetailsDivTag.innerHTML = 
    `<h1>${parsedSingleBeer.name}</h1>
        <img src = "${parsedSingleBeer.image_url}" >
        <h3>${parsedSingleBeer.tagline}</h3>
            <textarea>${parsedSingleBeer.description}</textarea>
        <button id="edit-beer" class="btn btn-info">Save</button>
    `
   
    let button = beerDetailsDivTag.querySelector('button')

    //event handler for saving description via patch req then modify html
    button.addEventListener('click', (event) => {
        event.preventDefault();
        let newDescription = event.target.parentElement.querySelector('textarea').value
        let textArea = event.target.parentElement.querySelector('textarea')

            fetch(`http://localhost:3000/beers/${parsedSingleBeer.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'description': newDescription
                })
            }).then(res => res.json())
                .then(parsedSingleBeer => {
                textArea.innerText = `${parsedSingleBeer.description}`
            })
    })
}


