// Variáveis
const apikey = "98e4fc8d5d2206697f7738fad81834ac"

const input_pais = document.getElementById('country-input')
const botao = document.getElementById('botao')
const lugar = document.getElementById('país')
const graus = document.getElementById('graus')
const ceu = document.getElementById('ceu')
const umidade = document.getElementById('umidade')
const velocidade = document.getElementById('velocidade')
const flag = document.getElementById('flag')
const ceu_flag = document.getElementById('ceu-flag')
const info = document.getElementById('div-info')
const pais = document.getElementById('pais')

// Funções
async function getWeather(cidade) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${apikey}&lang=pt`)
    const information = document.getElementById('information')

    if (response.status === 404) {
        const p = document.createElement('p')
        p.textContent = 'Você deve digitar um país ou cidade válido'
        p.style.fontSize = '15px'
        p.style.color = 'red'
        p.style.display = 'flex'
        p.style.justifyContent = 'center'
        information.innerHTML = ''
        information.appendChild(p)
    }

    const data = await response.json()

    const temperaturainKelvin = data.main.temp
    const temperaturainGraus = temperaturainKelvin - 273.15
    graus.innerHTML = temperaturainGraus.toFixed(0) + '°C'

    const descricao = data.weather[0].description
    ceu.innerHTML = descricao

    const nome = data.name
    lugar.innerHTML = nome
    let iElementPais = lugar.querySelector('i')
    if (!iElementPais) {
        iElementPais = document.createElement('i')
        lugar.insertBefore(iElementPais, lugar.firstChild)
    }
    iElementPais.className = 'bi bi-geo-alt-fill'

    const velocidade_vento = data.wind.speed
    velocidade.innerHTML = velocidade_vento + 'KM'
    const iElementVelocidade = velocidade.closest('i')
    if (iElementVelocidade) {
        iElementVelocidade.className = 'bi bi-wind'
    }

    const umidade_atual = data.main.humidity
    umidade.innerHTML = umidade_atual + '%'
    const iElementUmidade = umidade.closest('i')
    if (iElementUmidade) {
        iElementUmidade.className = 'bi bi-droplet-fill'
    }

    console.log(data)
}

// Eventos
botao.addEventListener('click', (e) => {
    e.preventDefault()
    const cidade = input_pais.value
    getWeather(cidade)
})

input_pais.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault()
        const cidade = input_pais.value
        getWeather(cidade)
    }
})
