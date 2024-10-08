fetch('./data/testimonios.json', {
    mode: 'cors'
})
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al cargar los testimonios');
        }
        return response.json();
    })
    .then(data => {
        const testimoniosContainer = document.getElementById('contenido-testimonios');
        testimoniosContainer.innerHTML = ''; // Limpiar el contenido

        data.forEach(testimonio => {
            const divTestimonio = document.createElement('div');
            divTestimonio.classList.add('testimonio');
            divTestimonio.innerHTML = `
                <strong>${testimonio.cliente}</strong>
                <p>${testimonio.testimonio}</p>
            `;
            testimoniosContainer.appendChild(divTestimonio);
        });
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('contenido-testimonios').innerText = 'No se pudieron cargar los testimonios.';
    });
