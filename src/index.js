// wait until dom is loaded before executing js
document.addEventListener('DOMContentLoaded', (event) => {



  // Grab parent element of the beer li's
  let mainBeerList = document.querySelector('ul')
  let beerLinks = document.getElementsByClassName('beer-names')
  // Grab element for beer details
  let beerDetails = document.querySelector('#beer-details')


  // Add event listener to beer items in list
  mainBeerList.addEventListener('click', (event) => {
    // Grab id of beers so that I can insert into restful url
    let beerId = event.target.id
    // console.log(beerId)
    // debugger
    if (event.target.className === 'beer-names') {
      console.log('Congrats, you clicked a beer!')
      fetch(`http://localhost:3000/beers/${event.target.id}`)
      .then(response => response.json())
      .then((beer) => {
        debugger
        // creates html for specific beer
        console.log(createBeerDetailsHTML(beer))
        // not working - need to output the html to page
        beerDetails.innerHTML = createBeerDetailsHTML(beer)
        // document.querySelector('#beer-detail') = createBeerDetailsHTML(beer)
        // beerDetails.innerHTML = createBeerDetailsHTML(beer)
      })
    }
  })

  // create HTML for specific beer
  const createBeerDetailsHTML = (beer) => {
    return `<div id="beer-detail">
    <h1>${beer.name}</h1>
    <img src="${beer.image}">
    <h3>${beer.tagline}</h3>
    <textarea>${beer.description}</textarea>
    <button id="edit-beer" class="btn btn-info">
    Save
    </button>
    </div>`
  }


  ////////////////////////////////////////////////////
  // Make a fetch to the database - WORKING
  const fetchToBeer = () => {
    fetch('http://localhost:3000/beers')
    .then((response) => {
      // console.log(response)
      return response.json()
    }).then((beers) => {
      beers.forEach((beer => {
        // beer returns each object in beer array
        console.log(beer)
        // returns name of each beer - use this for creating html beer list
        mainBeerList.innerHTML += `<li class="beer-names" id="${beer.id}">${beer.name}<li>`
      })
    )}
  )};
  fetchToBeer();



  /////////////////////////////////////////////////////


// Notes - testing

  // Helper functions to make HTML - NOT WORKING
  // Build html list for beer names
  const makeBeerListWithNames = (beer) => {
    return `<li class="beer-names">${beer.name}<li>`
  }

  const addListToPage = (beer) => {
    mainBeerList.innerHTML += makeBeerListWithNames(beer)
  }

  const createBeerHTML = (beer) => {
    let liTags = "";
    // iterate through all beers to output list
    beers.forEach(beer => {
      liTags += makeBeerListWithNames(beer)
      console.log(addListToPage)
    })
  };
});
