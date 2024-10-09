 // Obtiene la URL actual
 const currentLocation = window.location.href;

 // Obtiene todos los enlaces de la barra de navegación, excluyendo el del logo
 const navLinks = document.querySelectorAll('.navbar a:not(.logo)');

 // Recorre todos los enlaces
 navLinks.forEach(link => {
     // Elimina la clase active de todos los enlaces
     link.classList.remove('active');
     
     // Si el enlace coincide con la URL actual, añade la clase active
     if (link.href === currentLocation) {
         link.classList.add('active');
     }
 });

//  Para el menu hamburguesa
 document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.toggle-menu').addEventListener('click', function() {
        document.querySelector('.menu').classList.toggle('active');
    });
});