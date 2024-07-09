import {useState, useEffect} from "react";

const ProgressiveImage = ({placeholderSrc, src, ...props}) => {
	const [imgSrc, setImgSrc] = useState(placeholderSrc || src);
	const customClass =
		placeholderSrc && imgSrc === placeholderSrc ? "loading" : "loaded";

	useEffect(() => {
		const img = new Image();
		img.src = src;
		img.onload = () => {
			setImgSrc(src);
		};
	}, [src]);

	return (
		<img
			{...{src: imgSrc, ...props}}
			alt={props.alt || ""}
			loading="lazy"
			className={`${customClass} img-slider-img`}
		/>
	);
};
export default ProgressiveImage;