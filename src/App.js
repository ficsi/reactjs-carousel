import './App.css';
import InfiniteImageCarousel from "./Carousel"; // Assuming Carousel handles rendering
import { useEffect, useState } from "react";
import { dataFetch } from "./dataFetch";

function App() {
	const [imagesList, setImagesList] = useState([]);

	useEffect(() => {
		(async () => {
			setImagesList(await dataFetch('https://picsum.photos/v2/list') || [{}]);
		})();
	}, []);

	return (
		<>
			<div className="carousel-wrapper">
				<InfiniteImageCarousel images={imagesList} className="carousel-container">
					{/* Individual slide elements are rendered here by the Carousel component */}
				</InfiniteImageCarousel>
			</div>
		</>
	);
}

export default App;