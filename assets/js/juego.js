let deck = []
const tipos = ['C', 'D', 'H', 'S']
const especiales = ['A', 'J', 'Q', 'K']

let puntosJugador = 0, puntosComputadora = 0

//Referencias del HTML
const btnPedir = document.querySelector('#btnPedir')
const btnDetener = document.querySelector('#btnDetener')

const puntosHtml = document.querySelectorAll('small')
const divJugador = document.querySelector('#jugador-cartas')
const divComputadora = document.querySelector('#computadora-cartas')


const crearDeck = () => {

    for (let i = 2; i <= 10; i++) {
        for (let tipo of tipos) {
            deck.push(i + tipo)
        }
    }

    for (let tipo of tipos) {
        for (let esp of especiales) {
            deck.push(esp + tipo)
        }
    }
    deck = _.shuffle(deck)
    console.log(deck)

    return deck
}

crearDeck()

const pedirCarta = () => {

    if (deck.length === 0) {
        throw 'No hay mas cartas'
    }
    const carta = deck.pop()
    return carta;
}

const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1)
    return (isNaN(valor)) ?
        (valor === 'A') ? 11 : 10
        : valor * 1
}


//turno Computadora
const turnoComputadora = (puntosMinimos) => {
    do {
        const carta = pedirCarta();
        puntosComputadora = puntosComputadora + valorCarta(carta)
        puntosHtml[1].innerHTML = puntosComputadora


        const imgCarta = document.createElement('img')
        imgCarta.src = `assets/cartas/${carta}.png`
        imgCarta.classList.add('carta')
        divComputadora.append(imgCarta)

        if (puntosMinimos > 21) {
            break;
        }

    } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21))

}


//Eventos
btnPedir.addEventListener('click', () => {
    const carta = pedirCarta();
    puntosJugador = puntosJugador + valorCarta(carta)
    puntosHtml[0].innerHTML = puntosJugador


    const imgCarta = document.createElement('img')
    imgCarta.src = `assets/cartas/${carta}.png`
    imgCarta.classList.add('carta')
    divJugador.append(imgCarta)


    if (puntosJugador > 21) {

        console.warn('lo siento mucho, perdiste')
        btnPedir.disabled = true
        btnDetener.disabled = true
        turnoComputadora(puntosJugador)

    } else if (puntosJugador === 21) {

        btnPedir.disabled = true
        btnDetener.disabled = true
        turnoComputadora(puntosJugador)

    }
})

btnDetener.addEventListener('click', () => {
    btnPedir.disabled = true
    btnDetener.disabled = true

    turnoComputadora(puntosJugador)
})