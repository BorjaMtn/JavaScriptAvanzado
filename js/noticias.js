fetch('https://borjamtn.github.io/JavaScriptAvanzado/data/noticias.json?t=' + new Date().getTime())

    .then(response => {
        if (!response.ok) {
            throw new Error('Error al cargar las noticias');
        }
        return response.json();
    })
    .then(data => {
        // Procesa y muestra las noticias
        const contenidoNoticias = document.getElementById('contenido-noticias');
        contenidoNoticias.innerHTML = ''; // Limpiar el contenido existente

        data.forEach(noticia => {
            const noticiaElement = document.createElement('div');
            noticiaElement.className = 'noticia';
            noticiaElement.innerHTML = `
                <h3>${noticia.titulo}</h3>
                <p>${noticia.contenido}</p>
                <small>${noticia.fecha}</small>
            `;
            contenidoNoticias.appendChild(noticiaElement);
        });
    })
    .catch(error => {
        console.error('Error al cargar las noticias:', error);
        const contenidoNoticias = document.getElementById('contenido-noticias');
        contenidoNoticias.innerHTML = '<p>Error al cargar las noticias.</p>';
    });
