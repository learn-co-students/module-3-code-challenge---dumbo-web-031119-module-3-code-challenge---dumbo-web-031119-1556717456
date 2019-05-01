//variables
const beerAPI = "http://localhost:3000/beers";
const beerList = document.querySelector("ul#list-group");
let beerShowcase = document.querySelector("div#beer-detail");
let beerDesc = beerShowcase.querySelector("textarea");

//Wait for content loading
document.addEventListener("DOMContentLoaded", () => {

    fetch(beerAPI)
    .then(resp => resp.json())
    .then(json => json.forEach((brewski) => {
        beerList.innerHTML += showMeTheBrewskis(brewski)
    }));
});

//sidebar click
beerList.addEventListener("click", () => {
    fetch(`${beerAPI}/${event.target.id}`)
    .then(resp => resp.json())
    .then(beer => {
        beerShowcase.innerHTML = thatOneLooksInteresting(beer);
        let beerDesc = beerShowcase.querySelector("textarea");
        beerShowcase.lastElementChild.addEventListener("click", ohShitIPutTheWrongInfoHere(beerDesc));
    });
});

//edit beer

const showMeTheBrewskis = (beerHash) => {
    return `<li class="list-group-item" id="${beerHash.id}">${beerHash.name}</li>`
}

const thatOneLooksInteresting = (beerHash) => {
    return `
        <h1>${beerHash.name}</h1>
        <img src="${beerHash.image_url}">
        <h3>Motto: ${beerHash.tagline}</h3>
        <label>Description:</label><br>
        <textarea style="width: 500px; height: 250px" id="description" name="${beerHash.id}">${beerHash.description}</textarea><br>
        <button id="edit-beer" class="btn btn-info">
        Save
        </button>`
};

const ohShitIPutTheWrongInfoHere = (desc) => {

    return fetch(`${beerAPI}/${desc.name}`, {
    method:"PATCH",
    headers:{
        "Content-Type": "application/json",
        "Accept": 'application/json'
    },
    body: JSON.stringify({
        description: desc.textContent //check
    })})
    .then(resp => resp.json())
    .then(json => desc.value = json);
}


