let currentPageUrl = "https://swapi.dev/api/starships";

window.onload = async () => {
  try {
    await loadStarships(currentPageUrl);
  } catch (error) {
    console.log(error);
    alert("Erro ao carregar naves estelares");
  }
  const nextButton = document.getElementById("next-button");
  const backButton = document.getElementById("back-button");
  nextButton.addEventListener("click", loadNextPage);
  backButton.addEventListener("click", loadPreviousPage);
};

async function loadStarships(url) {
  const mainContent = document.getElementById("main-content");
  mainContent.innerHTML = "";

  try{
    const response = await fetch(url);
    const responseJson = await response.json();
    
    responseJson.results.forEach(async (starships) => {
      const card = document.createElement("div")
      card.className = "cards"

      const imgUrl = `https://starwars-visualguide.com/assets/img/starships/${starships.url.replace(/\D/g, "")}.jpg`
      const imgNoResponse = '../assets/noimageresponse.JPG'

      try {
        const imageResponse = await fetch(imgUrl)
        if(imageResponse.ok){
          card.style.backgroundImage = `url('${imgUrl}')`
        } else {
          card.style.backgroundImage = `url('${imgNoResponse}')`
          card.style.backgroundSize = 'contain'
        }
      } catch(error) {
        console.log("error in the try imageResponse" + error)
      }

      const starshipsNameBG = document.createElement("div")
      starshipsNameBG.className = "starships-name-bg"

      const starshipsName = document.createElement("span")
      starshipsName.className = "starships-name"
      starshipsName.innerText = `${starships.name}`

      starshipsNameBG.appendChild(starshipsName);
      card.appendChild(starshipsNameBG);
      mainContent.appendChild(card);

      card.onclick = () => {
        const modal = document.getElementById("modal");
        modal.style.visibility = "visible"

        const modalContent = document.getElementById("modal-content");
        modalContent.innerHTML = ""
        
        const starshipsImage = document.createElement("div");
        starshipsImage.style.backgroundImage = `url('https://starwars-visualguide.com/assets/img/starships/${starships.url.replace(/\D/g, "")}.jpg')`
        starshipsImage.className = "starships-image"

        const name = document.createElement("span")
        name.className = "starships-details"
        name.innerText = `Nome: ${starships.name}`

        const model = document.createElement("span")
        model.className = "starships-models"
        model.innerText = `Modelo: ${starships.model}`

        const length = document.createElement("span")
        length.className = "starships-length"
        length.innerText = `Comprimento: ${starships.length}`

        const speed = document.createElement("span")
        speed.className = "starships-speed"
        speed.innerText = `Velocidade Max: ${starships.max_atmosphering_speed}`

        const passangers = document.createElement("span")
        passangers.className = "starships-passangers"
        passangers.innerText = `Passageiros: ${starships.passangers}`

        modalContent.appendChild(starshipsImage)
        modalContent.appendChild(name)
        modalContent.appendChild(model)
        modalContent.appendChild(length)
        modalContent.appendChild(speed)
        modalContent.appendChild(passangers)

      }
    });

    const nextButton = document.getElementById("next-button");
    const backButton = document.getElementById("back-button");

    nextButton.disabled = !responseJson.next 
    backButton.disabled = !responseJson.previous 

    backButton.style.visibility = responseJson.previous? "visible" : "hidden" 

    currentPageUrl = url

  } catch(error){
    alert("Erro ao carregar naves");
    console.log(error);
  }
}

async function loadNextPage() {
  if(!currentPageUrl){
    return; 
  }
  try{
    const response = await fetch(currentPageUrl)
    const responseJson = await response.json()

    await loadStarships(responseJson.next)

  } catch(error){
    console.log(error)
    alert("Erro ao carregar a proxima pagina")
  }
}

async function loadPreviousPage() {
  if(!currentPageUrl){
    return; 
  }
  try{
    const response = await fetch(currentPageUrl)
    const responseJson = await response.json()

    await loadStarships(responseJson.previous)
    
  } catch(error){
    console.log(error)
    alert("Erro ao carregar a pagina anterior")
  }
}

function hideModal() {
  const modal = document.getElementById("modal");
  modal.style.visibility = "hidden";
}

function starshipsModel(model){
  return model
}