import { useEffect, useState } from "react";

export const AutoCarousel = () => {
  const images = [
    "https://www.neit.edu/wp-content/uploads/2022/10/Cyber-Security-Icon-Concept-2-1.jpeg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlnIGRh6-5TunpO8cn3XS-IWNqmprhfzsU2Q&s",
    "https://www.cyberdb.co/wp-content/uploads/2022/12/Cybersecurity.jpg",
    "https://www.axians.co.uk/app/uploads/sites/75/2024/08/AdobeStock_472181971-scaled.jpeg",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change slide every 5 seconds
    return () => clearInterval(interval); // Clean up interval on unmount
  }, [images.length]);

  return (
    <div className="w-[100%] h-[100%] overflow-hidden relative">
      {/* Carousel Items */}
      <div
        className="flex transition-transform duration-1000 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <div key={index} className="min-w-full h-full">
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-4 w-full flex justify-center gap-2">
        {images.map((_, index) => (
          <span
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? "bg-blue-500" : "bg-gray-400"
            }`}
          ></span>
        ))}
      </div>
    </div>
  );
};
