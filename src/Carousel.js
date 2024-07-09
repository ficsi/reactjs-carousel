import React, {useState, useRef, useEffect} from 'react';
import useDebounce from "./useDebounce";

const InfiniteImageCarousel = ({images}) => {

	const [imageUrls, setImageUrls] = useState([]);
	const [imageIndex, setImageIndex] = useState(0);
	const [ready, setReady] = useState(false);
	const carouselRef = useRef(null)


	useEffect(() => {
		console.log(ready)
		setImageUrls(() => images.map(image => image.download_url));
	}, [images])
	useEffect(() => {
		if (imageUrls.length > 0) {
			setReady(true);
		}
	}, [imageUrls]);

	const handleWheel = useDebounce((event) => {
		event.stopPropagation();
		if (event.deltaY > 0) {
			setNextImageIndex();
		} else if (event.deltaY < 0) {
			setPrevImageIndex();
		}
	}, 500)

	const setNextImageIndex = () => {
		setImageIndex((index) => {
			if (index === imageUrls.length - 1) {
				return 0;
			} else return index + 1;
		})
	}
	const setPrevImageIndex = () => {
		setImageIndex((index) => {
			if (index === 0) {
				return imageUrls.length - 1
			} else return index - 1;
		})
	}

	return (
		ready ?
			<>
				<i>need to mouse scroll to trigger slides change</i>
				<section className="carousel-container"
						 aria-label="Image Slider">

					{imageUrls.map((image, index) => (
							<div key={images[index].id} className="slide-wrapper"
								 style={{translate: `${-100 * imageIndex}%`}}>
								<img ref={carouselRef}
									onWheel={(event) => {
										handleWheel(event)
									}}
									src={image}
									alt={`Image ${index + 1}`}
									className="img-slider-img"
									loading="lazy"
								/>
								{/*<ProgressiveImage*/}
								{/*	key={index}*/}
								{/*	onWheel={(event) => handleWheel(event)}*/}
								{/*	src={image}*/}
								{/*	placeholderSrc={placeholderSrc}*/}
								{/*/>*/}
							</div>
						),
					)}
				</section>
			</> : <h1 style={{color: 'white'}}>loading</h1>
	)

};

export default InfiniteImageCarousel;