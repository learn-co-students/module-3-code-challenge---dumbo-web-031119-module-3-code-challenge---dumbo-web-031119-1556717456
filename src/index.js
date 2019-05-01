

console.log('YOU GOOD TO GO PAPI CHULO LETS GET IT')

  const beerListUl = document.getElementById('list-group')
  const beerDetail = document.getElementById('beer-detail')

  //get beer list here
  fetch('http://localhost:3000/beers')
  .then(resp=>resp.json())
  .then(beersList=>{
    beersList.forEach(beer=>{
      let li = document.createElement('li')
      li.className = "list-group-item"
      li.dataset.id = beer.id
      li.innerText = beer.name
      beerListUl.appendChild(li)
    })
  })

  // click on beer make it main thing on the FUCKIN SCREEN
  beerListUl.addEventListener('click',event=>{
    let id = event.target.dataset.id

    fetch(`http://localhost:3000/beers/${id}`)
    .then(resp=>resp.json())
    .then(beerToDisplay=>{
          beerDetail.innerHTML=''
      let beerH1 = document.createElement('h1')
          beerH1.innerText = beerToDisplay.name
      let beerImg = document.createElement('img')
          beerImg.src = beerToDisplay.image_url
      let beerH3 = document.createElement('h3')
          beerH3.innerText = beerToDisplay.tagline
      let beerDescription = document.createElement('textarea')
          beerDescription.innerText = beerToDisplay.description
      let beerButton = document.createElement('button')
          beerButton.id = 'edit-beer'
          beerButton.className = 'btn btn-info'
          beerButton.innerText = 'Save'
          beerButton.dataset.beerId = beerToDisplay.id

          beerDetail.appendChild(beerH1)
          beerDetail.appendChild(beerImg)
          beerDetail.appendChild(beerH3)
          beerDetail.appendChild(beerDescription)
          beerDetail.appendChild(beerButton)
    })


    //EDIT THE DAMN DESCRIPTION OF THE GOD FORSAKEN ALE OF MORTALS
    beerDetail.addEventListener('click',event=>{
      if(event.target.tagName == "BUTTON"){
        let newDescription = event.target.previousElementSibling.value
        let id = event.target.dataset.beerId
          fetch(`http://localhost:3000/beers/${id}`,{
            method: "PATCH",
            headers:{
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            body: JSON.stringify({
              description: newDescription
            })
          })
      }
    })



  })
