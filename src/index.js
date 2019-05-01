const BEERURL = 'http://0.0.0.0:3000/beers'
const beerUl = document.querySelector('#list-group')
const beerDiv = document.querySelector('#beer-detail')

// Main fetch
fetch(BEERURL)
.then((response) => {
	return response.json()
}).then((beers) => {
	beers.forEach((beer) => {
		// beerUl.innerHTML += addBeerToUl(beer)  	//innerHTML way
		addBeerToUlByCreatingElements(beer)			//createElement way
	})
})

// Beer UL event listener
beerUl.addEventListener('click', (event) => {
	if(event.target.className === "list-group-item"){
		getBeer(event.target.dataset.id).then((beer) => {
			// beerDiv.innerHTML = showBeerInDiv(beer)	//innerHTML way
			showBeerInDivByCreatingElements(beer)	//createElement way
			addListener()
		})
	}
})

// innerHTML way
const addBeerToUl = (beer) => {
	return `<li class="list-group-item" data-id="${beer.id}">${beer.name}</li>`
}

// innerHTML way
const showBeerInDiv = (beer) => {
 	return `<h1>${beer.name}</h1>
	<img src="${beer.image_url}">
	<h3>${beer.tagline}</h3>
	<textarea>${beer.description}</textarea>
	<button id="edit-beer" class="btn btn-info" data-id="${beer.id}">
	  Save
	</button>`
}

// createElement way - no return values
const addBeerToUlByCreatingElements = (beer) => {
	li = document.createElement('li')
		li.className = "list-group-item"
		li.dataset.id = `${beer.id}`
		li.innerText = `${beer.name}`
	beerUl.appendChild(li)
}
//createElement way - no return values
const showBeerInDivByCreatingElements = (beer) => {

	h1 = document.createElement('h1')
		h1.innerText = `${beer.name}`
	img = document.createElement('img')
		img.src = `${beer.image_url}`
	h3 = document.createElement('h3')
		h3.innerText = `${beer.tagline}`
	textarea = document.createElement('textarea')
		textarea.innerText = `${beer.description}`
	button = document.createElement('button')
		button.id = "edit-beer"
		button.className = "btn btn-info"
		button.dataset.id = `${beer.id}`
		button.innerText = "Save"

	clearBeerDiv()
	beerDiv.appendChild(h1)
	beerDiv.appendChild(img)
	beerDiv.appendChild(h3)
	beerDiv.appendChild(textarea)
	beerDiv.appendChild(button)						
}

// Get single beer
const getBeer = (beerId) => {
	return fetch(`${BEERURL}/${beerId}`)
		.then(resp => resp.json())
}

// Adds listener to save description button in #beer-detail div
const addListener = () => {
	document.querySelector('#edit-beer').addEventListener('click', (event) => {
		beerId = event.target.dataset.id
		newDescription = event.target.previousElementSibling.value
		updateDescription(beerId, newDescription).then((newBeer) => {
			newDescription = newBeer.description
			alert('Your beer description has been saved')
		})
	})
}

// Updates description of specific beer
const updateDescription = (beerId, newDescription) => {
	return fetch(`${BEERURL}/${beerId}`, {
		method: "PATCH",
		headers: {
			'Content-Type': 'application/json',
    		'Accept': 'application/json'
		},
		body: JSON.stringify({
			"description": newDescription
		})
	}).then(resp => resp.json())
}

// Clear beer div for createElement way
const clearBeerDiv = () => {
	while(beerDiv.firstChild){
		beerDiv.removeChild(beerDiv.firstChild)
	}
}