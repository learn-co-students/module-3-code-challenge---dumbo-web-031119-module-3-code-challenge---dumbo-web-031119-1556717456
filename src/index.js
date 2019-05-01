
document.addEventListener("DOMContentLoaded", () =>{

  let beerLi = document.getElementById('list-group')

  let mainBeerContainer = document.getElementById('beer-detail')


  fetch('http://localhost:3000/beers')
  .then(resp => resp.json())
  .then(allBeers => {
    allBeers.forEach((beer) =>

    {
      beerLi.innerHTML += `  <li class="list-group-item" data-id="${beer.id}">${beer.name}</li>`
    })

  })

  let listItems = document.querySelector('#list-group')

  listItems.addEventListener('click', (event) => {
    if (event.target.className === 'list-group-item') {
      console.log(':shrug:')
    }
  })

  const showMainBeer = (beer) => {
    return `<h1>${beer.name}</h1>
    <img src="${beer.image_url}>">
    <h3>Beer Tagline</h3>
    <textarea>${beer.description}</textarea>
    <button id="edit-beer" class="btn btn-info">
    Save
    </button>`
  }



})
