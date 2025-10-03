const INSTRUCCIONES = [
    "Instrucción 1: Imita a un robot que se quedó sin batería justo cuando iba a bailar.",
    "Instrucción 2: Camina como un dinosaurio bebé que intenta aprender a rugir.",
    "Instrucción 3: Haz como si fueras un gato súper elegante que desfilara en una pasarela.",
    "Instrucción 4: Actúa como un superhéroe que vuela, pero se choca contra una ventana invisible.",
    "Instrucción 5: Haz como si fueras una piñata enojada porque todos quieren pegarle.",
    "Instrucción 6: Imita a una abuelita que juega videojuegos y gana una partida.",
    "Instrucción 7: Camina como un pingüino que intenta patinar sobre hielo y se resbala.",
    "Instrucción 8: Haz como si fueras un mago que lanza un hechizo, pero le sale al revés.",
    "Instrucción 9: Imita a un payaso que intenta montar una bicicleta muy chiquita.",
    "Instrucción 10: Actúa como un astronauta que pisa la luna por primera vez y descubre que rebota demasiado."
];

let instruccionesRestantes = [...INSTRUCCIONES]; 

$(document).ready(function() {
    const $instruccionTexto = $('#instruccion-texto');
    const $contadorRestantes = $('#contador-restantes');
    const $generarBtn = $('#generar-btn');
    const $instruccionCard = $('#instruccion-card');

    function actualizarContador() {
        $contadorRestantes.text(instruccionesRestantes.length);
    }

    function animarYMostrarInstruccion(texto) {
        $instruccionCard.addClass('animate-out'); 

        setTimeout(() => {
            $instruccionTexto.text(texto);
            $instruccionCard.removeClass('animate-out').addClass('animate-in'); 

            setTimeout(() => {
                $instruccionCard.removeClass('animate-in');
            }, 500);
        }, 500);
    }

    $generarBtn.on('click', function() {
        $(this).addClass('button-shake').delay(500).queue(function(next) {
            $(this).removeClass('button-shake');
            next();
        });

        if (instruccionesRestantes.length > 0) {
            const randomIndex = Math.floor(Math.random() * instruccionesRestantes.length);
            const instruccionElegida = instruccionesRestantes[randomIndex];

            animarYMostrarInstruccion(instruccionElegida);
            
            instruccionesRestantes.splice(randomIndex, 1);
            actualizarContador();

            if (instruccionesRestantes.length === 0) {
                // Estado final
                $generarBtn.prop('disabled', true).text('¡Desafíos Completados! 🎉');
                
                Swal.fire({
                    title: '¡Misión Cumplida! 🏆',
                    html: '¡Has completado las 10 instrucciones! Eres un **super científico**.',
                    icon: 'warning',
                    background: '#28a745', 
                    color: '#fff',
                    confirmButtonText: 'Volver al Inicio',
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = 'index.html';
                    }
                });
            } else {
                 Swal.fire({
                    title: '¡Desafío Generado! 💡',
                    text: `Te quedan ${instruccionesRestantes.length} desafíos.`,
                    icon: 'success',
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 2500,
                });
            }

        }
    });

    actualizarContador();
});