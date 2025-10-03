// --- Configuración de imágenes ---
const IMAGENES_CARTAS = [
    'img/i1.jpg',
    'img/i2.png',
    'img/i3.webp',
    'img/i4.webp',
    'img/i5.jpg',
    'img/i6.jpeg',
    'img/i7.webp',
];
const DORSO_IMAGEN = 'img/card_back.png'; 

let cartas = [];
let cronometroInterval;
let segundos = 0;
let juegoIniciado = false;
let tarjetasVolteadas = []; 
let matchesEncontrados = 0;

// --- Funciones del Cronómetro ---
function formatearTiempo(seg) {
    const min = String(Math.floor(seg / 60)).padStart(2, '0');
    const sec = String(seg % 60).padStart(2, '0');
    return `${min}:${sec}`;
}

function iniciarCronometro() {
    clearInterval(cronometroInterval);
    segundos = 0;
    $('#cronometro').text(formatearTiempo(segundos));
    cronometroInterval = setInterval(() => {
        segundos++;
        $('#cronometro').text(formatearTiempo(segundos));
    }, 1000);
}

function detenerCronometro() {
    clearInterval(cronometroInterval);
}
// ---------------------------------

function barajarCartas(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function inicializarJuego() {
    matchesEncontrados = 0;
    tarjetasVolteadas = [];
    
    $('#tablero').empty(); 

    // Duplicar imágenes y asignar el matchId basado en la ruta de la imagen
    cartas = [...IMAGENES_CARTAS, ...IMAGENES_CARTAS].map((img, index) => ({
        id: index, 
        matchId: img,   // ✅ Ahora el matchId es la propia imagen
        img: img,
    }));

    cartas = barajarCartas(cartas);
    const $tablero = $('#tablero');

    cartas.forEach(carta => {
        const cardHtml = `
            <div class="memory-card" data-match-id="${carta.matchId}" data-id="${carta.id}">
                <div class="card-front">
                    <img src="${carta.img}" alt="Concepto" class="card-image-style">
                </div>
                <div class="card-cover">
                    <img src="${DORSO_IMAGEN}" alt="?" class="card-image-style">
                </div>
            </div>
        `;
        $tablero.append(cardHtml);
    });
}

function manejarClickCarta(event) {
    const $card = $(event.currentTarget);

    // Bloqueos de reglas
    if (!juegoIniciado || $card.hasClass('matched') || tarjetasVolteadas.length >= 2 || $card.hasClass('flip')) {
        return;
    }

    // Voltear carta
    $card.addClass('flip'); 
    tarjetasVolteadas.push($card);

    if (tarjetasVolteadas.length === 2) {
        $('#tablero').addClass('no-click');
        
        const [card1, card2] = tarjetasVolteadas;
        const matchId1 = card1.data('match-id');
        const matchId2 = card2.data('match-id');

        if (matchId1 === matchId2) {
            // ✅ Match correcto
            matchesEncontrados++;
            
            setTimeout(() => {
                // Agrego clase matched y además animación de desaparecer
                card1.addClass('matched').fadeOut(500);
                card2.addClass('matched').fadeOut(500);
                
                tarjetasVolteadas = []; 
                $('#tablero').removeClass('no-click'); 
                
                Swal.fire({
                    title: '¡MATCH! ✅',
                    icon: 'success',
                    toast: true,
                    position: 'bottom-start',
                    showConfirmButton: false,
                    timer: 1000,
                });

                if (matchesEncontrados === IMAGENES_CARTAS.length) {
                    finalizarJuego();
                }
            }, 600); 

        } else {
            // ❌ No hay match → volteo atrás
            setTimeout(() => {
                card1.removeClass('flip'); 
                card2.removeClass('flip'); 
                tarjetasVolteadas = [];
                $('#tablero').removeClass('no-click'); 
            }, 1000); 
        }
    }
}

function finalizarJuego() {
    detenerCronometro();
    juegoIniciado = false;
    
    Swal.fire({
        title: '¡FELICIDADES! 🎉',
        html: `¡Completaste el Memorama en <b>${formatearTiempo(segundos)}</b>!`,
        icon: 'success',
        background: '#ffc107', 
        color: '#1e1e2f',
        confirmButtonText: '¡Jugar de Nuevo!',
    }).then((result) => {
        if (result.isConfirmed) {
            location.reload(); 
        }
    });
}

$(document).ready(function() {
    $('#iniciar-btn').text('▶️ Iniciar Juego'); 

    $('#iniciar-btn').on('click', function() {
        if (!juegoIniciado) {
            juegoIniciado = true;
            $(this).text('Reiniciar Juego'); 
            
            Swal.fire({
                title: '¡Juego Iniciado! ⏱️',
                text: 'Encuentra los pares lo más rápido posible.',
                icon: 'info',
                toast: true,
                position: 'top',
                showConfirmButton: false,
                timer: 2000,
            });

            iniciarCronometro();
            inicializarJuego(); 
            
        } else {
            detenerCronometro();
            location.reload(); 
        }
    });

    // Delegación de eventos para las tarjetas
    $('#tablero').on('click', '.memory-card', manejarClickCarta);
});

