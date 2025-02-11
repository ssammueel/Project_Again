import { useEffect, useState } from "react";

export const AutoCarousel = () => {
  const images = [
    "https://www.neit.edu/wp-content/uploads/2022/10/Cyber-Security-Icon-Concept-2-1.jpeg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlnIGRh6-5TunpO8cn3XS-IWNqmprhfzsU2Q&s",
    "https://www.cyberdb.co/wp-content/uploads/2022/12/Cybersecurity.jpg",
    "https://www.axians.co.uk/app/uploads/sites/75/2024/08/AdobeStock_472181971-scaled.jpeg",
  ];

  // Clone first and last images for seamless looping
  const extendedImages = [images[images.length - 1], ...images, images[0]];
  
  const [currentIndex, setCurrentIndex] = useState(1); // Start at 1 to avoid initial jump
  const [isTransitioning, setIsTransitioning] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }, 3000); // Slide every 3 seconds

    return () => clearInterval(interval);
  }, []);

  // Handle infinite loop effect
  useEffect(() => {
    if (currentIndex === extendedImages.length - 1) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(1); // Reset to first real image instantly
      }, 500); // Wait for the transition to finish
    } else if (currentIndex === 0) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(images.length); // Jump to last real image instantly
      }, 500);
    } else {
      setIsTransitioning(true);
    }
  }, [currentIndex, extendedImages.length]);

  return (
    <div className="w-full max-w-lg mx-auto overflow-hidden relative">
      <div
        className={`flex ${isTransitioning ? "transition-transform duration-700 ease-in-out" : ""}`}
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {extendedImages.map((image, index) => (
          <img key={index} src={image} alt={`Slide ${index}`} className="w-full h-[300px] object-cover rounded-lg" />
        ))}
      </div>
    </div>
  );
};
