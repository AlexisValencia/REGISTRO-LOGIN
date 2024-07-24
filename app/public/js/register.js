document.getElementById("register-form").addEventListener("submit", async (e) => {
	e.preventDefault();
	e.stopPropagation();

	// Accede a los valores de los campos del formulario
	const user = e.target.elements.user.value;
	const password = e.target.elements.password.value;
	const email = e.target.elements.email.value;

	const res = await fetcheo({
		url: "http://localhost:4000/api/register",
		method: "POST",
		json: {
			user,
			password,
			email,
		}
	});
	console.log(res);
});

async function fetcheo(objson) {
	const { url, json, method } = objson;
	try {
		const response = await fetch(url, {
			method: method || "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(json)
		});

		if (!response.ok) {
			throw new Error('Network response was not ok ' + response.statusText);
		}

		const res = await response.json();
		return res;
	} catch (error) {
		console.log("Error detectado" + error)
	}
}