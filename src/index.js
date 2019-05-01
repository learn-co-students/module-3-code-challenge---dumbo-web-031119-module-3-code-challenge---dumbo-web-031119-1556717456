const BEERURL = 'http://0.0.0.0:3000/beers'
const beerUl = document.querySelector('#list-group')
const beerDiv = document.querySelector('#beer-detail')


fetch(BEERURL)
.then((response) => {
	return response.json()
}).then((beers) => {
	beers.forEach((beer) => {
		beerUl.innerHTML += addBeerToUl(beer)
	})
})

beerUl.addEventListener('click', (event) => {
	if(event.target.className === "list-group-item"){
		getBeer(event.target.dataset.id).then((beer) => {
			// debugger
			beerDiv.innerHTML = showBeerInDiv(beer)
			addListener()
		})
	}
})



const addBeerToUl = (beer) => {
	return `<li class="list-group-item" data-id="${beer.id}">${beer.name}</li>`
}

const showBeerInDiv = (beer) => {
 	return `<h1>${beer.name}</h1>
	<img src="${beer.image_url}">
	<h3>${beer.tagline}</h3>
	<textarea>${beer.description}</textarea>
	<button id="edit-beer" class="btn btn-info" data-id="${beer.id}">
	  Save
	</button>`
}

const getBeer = (beerId) => {
	return fetch(`${BEERURL}/${beerId}`)
		.then(resp => resp.json())
}

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