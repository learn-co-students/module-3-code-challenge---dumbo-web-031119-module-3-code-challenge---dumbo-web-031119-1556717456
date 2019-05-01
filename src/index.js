document.addEventListener('DOMContentLoaded', (event) => {



const editDescription = (id, description) => {
  return fetch(`http://localhost:3000/beers/${id}`, {
    method: "PATCH",
    body: JSON.stringify({
      content: description
    }),
    headers: {
      'Content-Type': 'application/json'

    }
  }).then(response => response.json())
  .then(console.log)
}


//fetch all the beers
fetch('http://localhost:3000/beers')
  .then(function(response) {
    return response.json();
  })
  .then(function(beers) {
    beers.forEach(beer => {
      console.log(beer)
      //create li tag
      let beerList = document.createElement('li')
      let ulTag = document.getElementById('list-group')
      //append li tag to the ul tag
      ulTag.append(beerList)

      // input beers in li
      beerList.innerHTML = beer.name
      // beerList.dataset.id = beer.id

      //
      // //Display single beer page
      // //add an event Listener to the beer list
      // let singleBeer = document.getElementById('list-group')
      // listOfBeers = singleBeer.children
      //
      // console.log(singleBeer)
      // let list = document.getElementById("beer-detail").getElementsByTagName("li");
      // let clickBeer = querySelector('li')
      beerList.addEventListener('click', (event) => {
        event.preventDefault()
        let beerDetail = document.getElementById('beer-detail')
        console.log(beerDetail)
        //         <h1>Beer Name</h1>
        // <img src="<add beer img url here>">
        // <h3>Beer Tagline</h3>
        // <textarea>Beer Description</textarea>
        // <button id="edit-beer" class="btn btn-info">
        //   Save
        // </button>
        beerDetail.innerHTML = ''

        let beerName = document.createElement('h1')
        let imgTag = document.createElement('img')
        let beerTagLine = document.createElement('h3')
        let beerDescription = document.createElement('TEXTAREA')
        let button = document.createElement('button')
        button.id = 'edit-beer'
        button.className = 'btn btn-info'
        button.innerText = 'save'
        beerDescription.id = 'description'
        beerDetail.append(beerName)
        beerDetail.append(imgTag)
        beerDetail.append(beerTagLine)
        beerDetail.append(beerDescription)
        beerDetail.append(button)
        beerName.innerHTML = beer.name
        beerDescription.dataset.id = beer.id

        imgTag.innerHTML
        imgTag.src = beer.image_url

        // imgTag.src = beer.image_urlc
        beerTagLine.innerHTML = beer.tagline
        console.log(beerTagLine)
        beerDescription.innerHTML = beer.description

        button.addEventListener('click', (event) =>{
          event


        })
      });



    });

  })
      // let changeDescription = document.querySelectorAll('#edit-beer')
      // changeDescription.addEventListener('click', (event) => {
      //   event.preventDefault()


})

// })
