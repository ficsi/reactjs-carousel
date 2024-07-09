const NUMBER_OF_IMAGES =10;

export const dataFetch = async (url) => {
	try {
		const response = await fetch(url + `?limit=${NUMBER_OF_IMAGES}`);
		if(!response.ok) {
			throw new Error(response.statusText);
		}
		const data = await response.json();
		return data;
	}
	catch (error) {
		console.log(error);
	}

}