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
    <div className="w-[100px] h-[100px]">
       {
  images.map((image, index) => (
    <img src={image.url} alt={image.alt} key={index} />
  ))
}

    </div>
  );
};
