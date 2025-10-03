$(document).ready(function() {
    
    $('#bienvenida-btn').on('click', function() {
        
        Swal.fire({
            title: '¡Bienvenido, Explorador! 🚀',
            text: 'Prepárate para aprender de forma divertida. Elige tu aventura:',
            icon: 'info',
            background: '#1e1e2f',
            color: '#fff',
            showConfirmButton: false,
            timer: 3000, 
            timerProgressBar: true,
            showClass: {
                popup: 'animate__animated animate__bounceIn'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOut'
            }
        });
        
    });

    $('.button-3d-hover').each(function(index) {
        setTimeout(() => {
            $(this).addClass('effect-pulse-once'); 
            setTimeout(() => {
                $(this).removeClass('effect-pulse-once');
            }, 1000); 
        }, index * 300); 
    });
});