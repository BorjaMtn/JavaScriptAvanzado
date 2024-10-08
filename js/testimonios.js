// He tenido que poner esa ruta porque me estaban dando muchos errores para cargar los json
fetch('https://raw.githubusercontent.com/borjamtn/JavaScriptAvanzado/main/data/testimonios.json', {
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
