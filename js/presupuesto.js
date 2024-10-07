document.getElementById('budgetForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Previene el envío del formulario

    // Validación de Nombre
    const name = document.getElementById('name').value;
    const nameError = document.getElementById('nameError');
    if (!/^[a-zA-Z]+$/.test(name)) {
        nameError.innerText = 'El nombre solo puede contener letras.';
        nameError.style.display = 'block';
    } else {
        nameError.style.display = 'none';
    }

    // Validación de Apellidos
    const surname = document.getElementById('surname').value;
    const surnameError = document.getElementById('surnameError');
    if (!/^[a-zA-Z]+$/.test(surname)) {
        surnameError.innerText = 'Los apellidos solo pueden contener letras.';
        surnameError.style.display = 'block';
    } else {
        surnameError.style.display = 'none';
    }

    // Validación de Teléfono
    const phone = document.getElementById('phone').value;
    const phoneError = document.getElementById('phoneError');
    if (!/^\d{9}$/.test(phone)) {
        phoneError.innerText = 'El teléfono debe tener 9 dígitos numéricos.';
        phoneError.style.display = 'block';
    } else {
        phoneError.style.display = 'none';
    }

    // Validación de Correo Electrónico
    const email = document.getElementById('email').value;
    const emailError = document.getElementById('emailError');
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
        emailError.innerText = 'Por favor, ingrese un correo electrónico válido.';
        emailError.style.display = 'block';
    } else {
        emailError.style.display = 'none';
    }

    // Cálculo del Presupuesto Final
    const productPrice = parseFloat(document.getElementById('product').value) || 0;
    const duration = parseInt(document.getElementById('duration').value) || 0;

    let extraTotal = 0;
    const extras = document.querySelectorAll('input[type="checkbox"]:checked');
    extras.forEach(extra => {
        extraTotal += parseFloat(extra.getAttribute('data-price')) || 0;  // Asegurarse que el precio del extra sea numérico
    });

    // Eliminar la parte de 10% de descuento por cada mes
    // let discount = 0;
    // if (duration > 0) {
    //     discount = (productPrice + extraTotal) * 0.1; // 10% de descuento por cada mes
    // }

    // Determinar el descuento basado en el número de días
    let discountRate = 0;
    if (duration >= 1 && duration <= 3) {
        discountRate = 0.05; // 5% descuento
    } else if (duration > 3 && duration <= 7) {
        discountRate = 0.10; // 10% descuento
    } else if (duration > 7) {
        discountRate = 0.15; // 15% descuento
    }

    // Calcular el descuento total y el precio final
    const subtotal = productPrice + extraTotal;
    const discount = subtotal * discountRate;
    const finalPrice = subtotal - discount;

    // Mostrar el precio final y el descuento aplicado
    document.getElementById('finalPrice').innerText = `$${isNaN(finalPrice) ? 0 : finalPrice.toFixed(2)}`;
    document.getElementById('discountInfo').innerText = `Descuento aplicado: ${discountRate * 100}%`;

    // Si todas las validaciones pasan
    if (nameError.style.display === 'none' && surnameError.style.display === 'none' &&
        phoneError.style.display === 'none' && emailError.style.display === 'none' && 
        document.getElementById('conditions').checked) {
        alert('Formulario enviado correctamente.');
        // Aquí puedes agregar la lógica para enviar el formulario
    }
});

// Funcionalidad para restablecer el formulario
document.getElementById('resetBtn').addEventListener('click', function() {
    document.getElementById('budgetForm').reset();
    document.getElementById('finalPrice').innerText = '$0';
    document.querySelectorAll('.form-text').forEach(element => {
        element.style.display = 'none';
    });
});

// Actualización del presupuesto al cambiar las opciones
const updateFinalPrice = () => {
    const productPrice = parseFloat(document.getElementById('product').value) || 0;
    const duration = parseInt(document.getElementById('duration').value) || 0;

    let extraTotal = 0;
    const extras = document.querySelectorAll('input[type="checkbox"]:checked');
    extras.forEach(extra => {
        extraTotal += parseFloat(extra.getAttribute('data-price')) || 0;
    });

    // Determinar el descuento basado en el número de días
    let discountRate = 0;
    if (duration >= 1 && duration <= 3) {
        discountRate = 0.05; // 5% descuento
    } else if (duration > 3 && duration <= 7) {
        discountRate = 0.10; // 10% descuento
    } else if (duration > 7) {
        discountRate = 0.15; // 15% descuento
    }

    // Calcular el descuento total y el precio final
    const subtotal = productPrice + extraTotal;
    const discount = subtotal * discountRate;
    const finalPrice = subtotal - discount;

    // Mostrar el precio final y el descuento aplicado
    document.getElementById('finalPrice').innerText = `$${isNaN(finalPrice) ? 0 : finalPrice.toFixed(2)}`;
    document.getElementById('discountInfo').innerText = `Descuento aplicado: ${discountRate * 100}%`;
};

// Añadir event listeners a los elementos del formulario
document.getElementById('product').addEventListener('change', updateFinalPrice);
document.getElementById('duration').addEventListener('input', updateFinalPrice);
document.querySelectorAll('input[type="checkbox"]').forEach(extra => {
    extra.addEventListener('change', updateFinalPrice);
});
