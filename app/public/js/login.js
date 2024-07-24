const messageError = document.getElementById("message-form"); // Captura el id del parrafo para realizar 

document.getElementById("login-form").addEventListener("submit", async (e) => {
	e.preventDefault();
	e.stopPropagation();

	// Accede a los valores de los campos del formulario
	const user = e.target.elements.user.value;
	const password = e.target.elements.password.value;

	const res = await fetcheo({
		url: "http://localhost:4000/api/login",
		method: "POST",
		json: {user,password}
	});

	if(res.redirect) {
		window.location.href=res.redirect;
		return;
	};
	messageError.classList.remove("d-none");
	messageError.innerHTML=res.message;
});

async function fetcheo(objson) {
	const { url, json, method } = objson;
	try {
		const response = await fetch(url, {
			method: method || "POST",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify(json)
		});

		if (!response.ok) {
			messageError.classList.remove("d-none");
		}

		const res = await response.json();
		return res;
	} catch (error) {
		messageError.classList.remove("d-none");
	}
}