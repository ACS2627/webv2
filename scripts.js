document.addEventListener('DOMContentLoaded', () => {
    
    // NAVEGACIÓN - MENÚ HAMBURGUESA
    const navToggle = document.querySelector('.nav-toggle');
    const mainNav = document.querySelector('.main-nav');
    const toggleIcon = navToggle.querySelector('i');

    navToggle.addEventListener('click', () => {
        mainNav.classList.toggle('open');
        // Alternar icono entre barras y cruz
        if (mainNav.classList.contains('open')) {
            toggleIcon.className = 'fa-solid fa-xmark';
        } else {
            toggleIcon.className = 'fa-solid fa-bars';
        }
    });

    // Cerrar menú móvil al hacer clic en un enlace
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mainNav.classList.contains('open')) {
                mainNav.classList.remove('open');
                toggleIcon.className = 'fa-solid fa-bars';
            }
        });
    });

    // CONTROL DE ENLACE ACTIVO SEGÚN EL SCROLL
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute('id');
            const targetLink = document.querySelector(`.main-nav a[href*=${sectionId}]`);
            
            if (targetLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    targetLink.classList.add('active');
                } else {
                    targetLink.classList.remove('active');
                }
            }
        });

        // Efecto sticky/opaco para el Header al hacer scroll
        const header = document.querySelector('.main-header');
        if (scrollY > 50) {
            header.style.padding = '0.6rem 0';
            header.style.backgroundColor = 'rgba(10, 10, 10, 0.98)';
        } else {
            header.style.padding = '1.2rem 0';
            header.style.backgroundColor = 'rgba(10, 10, 10, 0.95)';
        }
    });

    // VALIDACIÓN Y ENVÍO SIMULADO DEL FORMULARIO DE RESERVA
    const bookingForm = document.getElementById('booking-form');
    const formResponse = document.getElementById('form-response');

    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Obtener valores
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const date = document.getElementById('date').value;
        const service = document.getElementById('service').value;

        if (!name || !email || !date || !service) {
            showResponse('Por favor, rellena todos los campos.', 'error');
            return;
        }

        // Simular petición asíncrona (Fetch/AJAX)
        showResponse('Procesando tu reserva...', 'info');

        setTimeout(() => {
            showResponse(`¡Gracias, ${name}! Tu cita ha sido reservada con éxito para el ${date}.`, 'success');
            bookingForm.reset();
        }, 1500);
    });

    function showResponse(message, type) {
        formResponse.innerText = message;
        formResponse.className = 'form-message'; // Resetear clases
        
        if (type === 'success') {
            formResponse.style.color = '#2ecc71';
        } else if (type === 'error') {
            formResponse.style.color = '#e74c3c';
        } else {
            formResponse.style.color = '#d4af37';
        }
    }
});
