import React, { useState, useEffect } from 'react';

const AnimatedImage = ({ imageSrc, altText }) => {
	const [imageX, setImageX] = useState(0); // Initial image position
	const [isAnimating, setIsAnimating] = useState(false); // Animation state

	const handleWheel = (event) => {
		console.log(event)
		const delta = event.deltaY; // Get scroll delta (positive for up, negative for down)
		const newImageX = imageX - delta * 5; // Adjust position based on delta and sensitivity factor (5)

		// Clamp image position within bounds to prevent overflow
		const clampedImageX = Math.min(0, Math.max(-window.innerWidth + imageWidth, newImageX));

		// Only update state if image position actually changes and if not already animating
		if (clampedImageX !== imageX && !isAnimating) {
			setIsAnimating(true);
			setImageX(clampedImageX);

			// Start animation only after state update
			setTimeout(() => {
				setIsAnimating(false);
			}, 200); // Animation duration (200ms)
		}
	};

	// Calculate image width on component mount and update on window resize
	const [imageWidth, setImageWidth] = useState(0);
	useEffect(() => {
		const handleResize = () => {
			const image = new Image();
			image.onload = () => setImageWidth(image.width);
			image.src = imageSrc; // Preload image for accurate width calculation
		};
		window.addEventListener('resize', handleResize);
		handleResize();

		return () => window.removeEventListener('resize', handleResize);
	}, [imageSrc]);

	const animationStyle = isAnimating ? { transform: `translateX(${imageX}px)` } : null;

	return (
			<img onWheel={handleWheel} src={imageSrc} alt={altText} style={{ ...animationStyle, width: imageWidth }} />
	);
};

export default AnimatedImage;