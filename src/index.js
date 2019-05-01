document.addEventListener("DOMContentLoaded", event => {
  getBeersList();
  getMainBeer(1);

  beerUl.addEventListener("click", event => {
    if (event.target.tagName === "LI") {
      // console.log(event.target.dataset.id)
      getMainBeer(event.target.dataset.id)
    }
  })

  mainBeerDiv.addEventListener("click", event => {
    if (event.target.tagName === "BUTTON") {
      newDescription = event.target.previousSibling.value;
      beerId = event.target.dataset.id;
      fetch(`http://localhost:3000/beers/${beerId}`, {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({description: newDescription})
      })
    }
  })
})

const beerUl = document.getElementById("list-group"),
  mainBeerDiv = document.getElementById("beer-detail");

const getBeersList = () => {
  fetch("http://localhost:3000/beers")
    .then(res => res.json())
    .then(beers => beers.forEach(makeBeerList))
}

const makeBeerList = (beer) => {
  let beerLi = document.createElement('li');
  beerLi.className = "list-group-item",
  beerLi.setAttribute("data-id", beer.id)
  beerLi.innerText = beer.name;

  beerUl.appendChild(beerLi)
}

const getMainBeer = (beerId) => {
  mainBeerDiv.innerHTML = ""
  fetch(`http://localhost:3000/beers/${beerId}`)
    .then(res => res.json())
    .then(renderMainBeer)
}

const renderMainBeer = (beer) => {
  let beerName = document.createElement("h1"),
    beerImg = document.createElement("img"),
    tagline = document.createElement("h3"),
    beerDescription = document.createElement("textarea"),
    saveButton = document.createElement("button");

  beerName.innerText = beer.name;
  beerImg.src = beer.image_url;
  tagline.innerText = beer.tagline;
  beerDescription.innerText = beer.description;
  beerDescription.id = "beer-description";
  saveButton.id = "edit-beer";
  saveButton.className = "btn btn-info";
  saveButton.setAttribute("data-id", beer.id);
  saveButton.innerText = "Save"

  mainBeerDiv.appendChild(beerName)
  mainBeerDiv.appendChild(beerImg)
  mainBeerDiv.appendChild(tagline)
  mainBeerDiv.appendChild(beerDescription)
  mainBeerDiv.appendChild(saveButton)
}

// {
//     "id": 1,
//     "name": "Buzz",
//     "tagline": "A Real Bitter Experience.",
//     "first_brewed": "09/2007",
//     "description": "A light, crisp and bitter IPA brewed with English and American hops. A small batch brewed only once.",
//     "image_url": "https://images.punkapi.com/v2/keg.png",
//     "food_pairing": [
//       "Spicy chicken tikka masala",
//       "Grilled chicken quesadilla",
//       "Caramel toffee cake"
//     ],
//     "brewers_tips": "The earthy and floral aromas from the hops can be overpowering. Drop a little Cascade in at the end of the boil to lift the profile with a bit of citrus.",
//     "contributed_by": "Sam Mason <samjbmason>"
//   }
