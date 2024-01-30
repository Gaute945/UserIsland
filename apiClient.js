let data

async function fetchApi() {
	const response = await fetch("http://localhost:3000/api/users");
	data = await response.json();

	return data;
}

async function fetchAndDo() {
	await fetchApi();
}

(async() => {
	await fetchAndDo();
	console.log(data[0].number);
})();

fetchAndDo();
