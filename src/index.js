const API = 'http://localhost:3000/beers';
const ulTag = document.getElementById('list-group')
const divTag = document.getElementById('beer-detail')

const getBeers = () => {
  fetch(API)
    .then(res => res.json())
      .then(parsedRes => {
        parsedRes.forEach(beer => {
          renderBeers(beer)
        })
      })
}

getBeers()

const getOneBeer = (id) => {
  fetch(`${API}/${id}`)
    .then(res => res.json())
      .then(parsedRes => {
        renderOneBeer(parsedRes)
      })
}

const editOneBeer = (id, description) => {
  return fetch(`${API}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      description: description
    })
  }).then(res => res.json())
}

const renderBeers = (beer) => {
  const liTag = `<li data-id=${beer.id} class="list-group-item">${beer.name}</li>`
  ulTag.innerHTML += liTag;

  ulTag.addEventListener('click', e => {
    if (e.target.tagName === "LI") {
      let beerId = e.target.dataset.id;
      getOneBeer(beerId)
    }
  })
}

const renderOneBeer = (beer) => {
  let detailTag = `<h1>${beer.name}</h1>
    <img src="${beer.image_url}">
    <h3>${beer.tagline}</h3>
    <textarea data-id="${beer.id}">${beer.description}</textarea>
    <button id="edit-beer" class="btn btn-info">
      Save
    </button>`
  divTag.innerHTML = detailTag;

  divTag.addEventListener('click', e => {
    if (e.target.tagName === 'BUTTON') {
      const childrenArr = divTag.children;
      // getting the id of the beer
      let beerId = childrenArr[3].dataset.id;
      // getting the text area tag
      let description = childrenArr[3].value;

      // pessimistic rendering
      editOneBeer(beerId, description).then(parsedRes => {
        // for some reason I can't call my childrenArr so
        // I'm manually calling it
        divTag.children[3].value = parsedRes.description
      })
    }
  })
}
