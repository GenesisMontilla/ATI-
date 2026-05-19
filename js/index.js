
window.addEventListener('DOMContentLoaded', () => {
    const contenedor = document.querySelector('.student-grid'); 
    contenedor.innerHTML = ''; 

    profiles.forEach(estudiante => {
        const tarjeta = document.createElement('div');
        tarjeta.className = 'student-card';
        tarjeta.style.cursor = 'pointer'; 
        
        
        tarjeta.innerHTML = `
            <img src="${estudiante.ci}/${estudiante.ci}Big${estudiante.image_ext}" alt="${estudiante.name}" class="imagen-perfil">
            <div class="info">
                <p>${estudiante.name}</p>
                <div class="blue-bar"></div>
            </div>
        `;
        
        tarjeta.addEventListener('click', () => {
            window.location.href = `profile.html?ci=${estudiante.ci}`;
        });
        
        contenedor.appendChild(tarjeta);
    });
});