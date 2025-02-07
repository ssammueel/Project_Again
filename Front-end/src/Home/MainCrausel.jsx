import { useEffect, useState } from "react";

export const MainCrausel = () => {
  const images = [
    "https://zibtek-ghost-blog.sfo3.cdn.digitaloceanspaces.com/2020/06/image-33.png",
    "https://lansa.com/wp-content/uploads/2024/01/system-Integration.png",
    "https://redmondmag.com/-/media/ECG/redmondmag/Images/introimages2014/0914red_WinInsider.jpg"
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
