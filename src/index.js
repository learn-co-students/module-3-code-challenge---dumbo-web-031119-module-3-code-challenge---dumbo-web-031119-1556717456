document.addEventListener('DOMContentLoaded', () => {
// console.log("im in")
// create the variables
const listGroupTag = document.querySelector('.list-group')
const beerDetailTag = document.querySelector('#beer-detail')
const saveButtonTag = document.querySelector('#edit-beer')

// list beers
fetch('http://localhost:3000/beers')
.then(res => res.json())
.then(beers =>{
  // default beer detail
  beerDetailTag.innerHTML = singleBeerDetail(beers[0])
  beers.forEach(beer => {
  // iterate through and create a li tag for each iteration and put into list tag
    listGroupTag.innerHTML += `<li class="list-group-item" data-id=${beer.id}>${beer.name}</li>`

//selection ability
    listGroupTag.addEventListener('click', (event)=>{
      event.preventDefault()
      console.log(event.target)
      if(event.target.innerText === beer.name){
        beerDetailTag.innerHTML = singleBeerDetail(beer)
      }
    })
  })
})

//function to display single beer details
const singleBeerDetail = (beer) => {
  return `
  <h1 data-id=${beer.id}>${beer.name}</h1>
<img src=${beer.image_url}>
<h3>${beer.tagline}</h3>
<textarea data-id=${beer.id} value="${beer.description}">${beer.description}</textarea>
<button  id="edit-beer" class="btn btn-info">
  Save
</button>`

}

//time to edit
beerDetailTag.addEventListener('click', (event) => {
  event.preventDefault()
console.log(event.target)
textAreaTag = document.querySelector("textarea")
console.log(textAreaTag.value)
if(event.target.innerText === 'Save'){


editFetch(textAreaTag.dataset.id, textAreaTag.value).then(next =>{

  console.log(next)
  debugger
//trying to change on dom without refresh
//textAreaTag.innerHTML += textAreaTag.value
 textAreaTag.innerHTML = textAreaTag.innerText

//I WAS SOOOOO CLOOOOOOSEEEE IF IHAD LIKE 10 MORE MINUTES 😫😫😫😫
})

}

})


//fetch function to edit

const editFetch = (id, newDescription) => {
  return fetch(`http://localhost:3000/beers/${id}`,{
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application'
    },
    body: JSON.stringify({
      description: newDescription
    })
  }).then(res => res.json)
}



})//end of DOMContentLoaded
