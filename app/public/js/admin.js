document.getElementById("cerrar-sesion").addEventListener("click", async (e) => {
    e.preventDefault();
    e.stopPropagation();
    // Eliminación de la cookie en el cliente
    document.cookie = 'jwt=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT; SameSite=Strict;';
    try {
        const response = await fetch('http://localhost:4000/api/logout', { method: 'POST' });
        const res = await response.json();
        
        if (res.status === 'ok') {
            // Redirección a home
            document.location.href = "/";
        } else {
            console.error(res.message);
        }
    } catch (error) {
        console.error('Error closing session:');
    }
});
