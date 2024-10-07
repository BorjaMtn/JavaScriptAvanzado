// Inicialización del mapa centrado en la ubicación del negocio
const map = L.map('map').setView([43.271517960140194, -2.943066846039327], 13); 

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Marcador para la ubicación
const businessLocation = [43.271517960140194, -2.943066846039327]; // Coordenadas del negocio (Madrid)
L.marker(businessLocation).addTo(map)
    .bindPopup('Agirre Lehendakariaren Etorb., 5, Deusto, 48014 Bilbo, Bizkaia')
    .openPopup();

// Función para obtener la ubicación del cliente y calcular la ruta
function calculateRoute(clientLocation) {
    L.Routing.control({
        waypoints: [
            L.latLng(clientLocation), // Ubicación del cliente
            L.latLng(businessLocation) // Ubicación de la empresa
        ],
        routeWhileDragging: true
    }).addTo(map);
}

// Obtener la ubicación del cliente usando geolocalización
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
        function (position) {
            const clientLocation = [position.coords.latitude, position.coords.longitude];
            calculateRoute(clientLocation);
        },
        function () {
            alert('No se pudo obtener la ubicación del cliente.');
        }
    );
} else {
    alert('La geolocalización no es soportada por este navegador.');
}