//variaveis
var nomedofilme = document.getElementById('input-text')
var botao = document.getElementById('button')
var res = document.getElementById('res')

//funções
async function getdados(title) {
  var API = `https://www.omdbapi.com/?t=${title}&apikey=fa61722f`
  const response = await fetch(API)
  const data = await response.json()
  return data
}

//eventos
botao.addEventListener('click', async () => {
  var response = await getdados(nomedofilme.value)
  var genero = response.Genre
  var arraygenero = genero.split(",")

  if (nomedofilme.value !== '') {
    if (response.Response === 'True') {
      res.innerHTML = `
      <div id="movie-content">
        <div id="resmovie">
          <img id="poster" src="${response.Poster}">
        </div>
        <div id="content2">
          <div class="info-container">
            <div id="title">
              <h2 class="nomefilme">${response.Title}</h2>
            </div>
            <div class="rating">
              <i id="star" class="bi bi-star-fill"></i>
              <h4>${response.imdbRating}</h4>
            </div>
            <div class="description">
              <span>${response.Rated}</span>
              <span>${response.Year}</span>
              <span>${response.Runtime}</span>
            </div>
            <div class="genero-container">
              ${arraygenero.map(genero => `<p class="genero">${genero}</p>`).join('')}
            </div>
          </div>
        </div>
      </div>
      <div id="description2">
        <h2>Descrição</h2>
        <span>${response.Plot}</span>
      </div>
      <div id="atores">
        <h2>Atores</h2>
        <span>${response.Actors}</span>
      </div>`
    } else {
      res.innerHTML = 'Filme não encontrado'
    }
  } else {
    res.innerHTML = 'Digite um filme válido'
  }
})

nomedofilme.addEventListener('keydown', (e) => {
  if(e.key === "Enter") {
    e.preventDefault()
    const title = nomedofilme.value
    getdados(title).then(response => {
      var genero = response.Genre
      var arraygenero = genero.split(",")

      if (response.Response === 'True') {
        res.innerHTML = `
          <div id="movie-content">
            <div id="resmovie">
              <img id="poster" src="${response.Poster}">
            </div>
            <div id="content2">
              <div class="info-container">
                <div id="title">
                  <h2 class="nomefilme">${response.Title}</h2>
                </div>
                <div class="rating">
                  <i id="star" class="bi bi-star-fill"></i>
                  <h4>${response.imdbRating}</h4>
                </div>
                <div class="description">
                  <span>${response.Rated}</span>
                  <span>${response.Year}</span>
                  <span>${response.Runtime}</span>
                </div>
                <div class="genero-container">
                  ${arraygenero.map(genero => `<p class="genero">${genero}</p>`).join('')}
                </div>
              </div>
            </div>
          </div>
          <div id="description2">
            <h2>Descrição</h2>
            <span>${response.Plot}</span>
          </div>
          <div id="atores">
            <h2>Atores</h2>
            <span>${response.Actors}</span>
          </div>`
      } else {
        res.innerHTML = 'Filme não encontrado'
      }
    }).catch(() => {
      res.innerHTML = 'Erro ao obter os dados do filme'
    })
  }
})
