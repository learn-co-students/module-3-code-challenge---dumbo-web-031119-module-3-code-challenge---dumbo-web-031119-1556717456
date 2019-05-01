

//this fetch grabs all the beers and puts them onto the side bar by name
fetch("http://localhost:3000/beers")
.then(response => response.json())
.then(beers =>{
  beers.forEach((beer) =>{
    document.getElementById("list-group").innerHTML += `
    <li class="list-group-item" data-id=${beer.id}>${beer.name}</li>
    `
  })
})


//this event listener takes the beer clicked and renders more detail onto the main page
document.getElementById("list-group").addEventListener("click",(event)=>{
  getSingleBeer(event.target.dataset.id).then(beer =>{
    renderMainBeerHtml(beer)
  })
})


//this event listener will trigger if the save button is clicked and send the new info to the server
document.getElementById("beer-detail").addEventListener("click",(event)=>{
  if(event.target.className === "btn btn-info"){
    let beerId = event.target.dataset.id
    let newDescription = event.target.parentElement.querySelector("textarea").value
    updateBeerDescription(beerId,newDescription)
  }
})


//this function grabs my single beer
function getSingleBeer(beerId){
  return fetch(`http://localhost:3000/beers/${beerId}`)
  .then(response => response.json())
}


//this function handles all the HTML rendering
function renderMainBeerHtml(beer){
document.getElementById("beer-detail").innerHTML =
`<h1>${beer.name}</h1>
<img src=${beer.image_url}>
<h3>${beer.tagline}</h3>
<textarea>${beer.description}</textarea>
<button id="edit-beer" class="btn btn-info" data-id=${beer.id}>
Save
</button>`
}



//this function will make the fetch for my patch on the server
function updateBeerDescription(beerId,newDesc){
  return fetch(`http://localhost:3000/beers/${beerId}`,{
    method:"PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      description: newDesc
    })
  }).then(response => response.json())
}
