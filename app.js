const key = "dzhkdQuGUHsTPYqLdFXVfmewWk15M5um";

async function getGiph(str) {
	try {
		const res = await axios.get(
			"http://api.giphy.com/v1/gifs/search",
			{ params: { api_key: key, q: str } }
		);
		return res.data.data[0];
	} catch (error) {
		if (error.response && error.response.status === 404) {
			throw new Error(
				"No Giphy cound to match your search."
			);
		} else {
			throw new Error("Error.");
		}
	}
}

document
	.querySelector("#giphy-form")
	.addEventListener("submit", async function (e) {
		e.preventDefault();

		const searchWord =
			document.querySelector("#search-word").value;
		try {
			const gif = await getGiph(searchWord);

			if (!gif) {
				throw new Error(
					"No Giphy found to match your search."
				);
			}

			const giphyContainer = document.querySelector(
				"#giphy-container"
			);

			const img = document.createElement("img");
			console.log(gif.url);
			img.src = gif.images.fixed_height.url;
			giphyContainer.appendChild(img);

			document.querySelector("#search-word").value = "";
		} catch (error) {
			alert(error.message);
		}
	});

document
	.querySelector("#remove-giphs")
	.addEventListener("click", function (e) {
		document.querySelector("#giphy-container").innerHTML =
			"";
	});
