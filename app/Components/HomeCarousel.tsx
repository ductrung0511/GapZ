import { useEffect, useRef, useState } from "react";

const carouselImages = [
  "https://www.nrcs.usda.gov/sites/default/files/styles/hero/public/2023-04/kids-soil.jpeg",
];

const carouselImagesMobile = [
  "https://vsdogtolrbybxlubpabb.supabase.co/storage/v1/object/public/media//Muitrongvinh.png",
];

export default function HomeCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [loadedImages, setLoadedImages] = useState<number[]>([]);

  const delay = 4000;

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
  }, []);

  const images = isMobile ? carouselImagesMobile : carouselImages;



  const handleImageLoad = (index: number) => {
    setLoadedImages((prev) => [...new Set([...prev, index])]);
    console.log("Image load idx: ", index )
  };

  const allLoaded = loadedImages.length === images.length;
  
  useEffect(() => {
    setLoadedImages([]); // Reset when images switch
    console.log("Images: ", images)
  }, [images]);

  useEffect(() => {
    const imageElements = document.querySelectorAll("img[data-carousel]");
    console.log("Image elements", imageElements);
    imageElements.forEach((img, idx) => {
      if ((img as HTMLImageElement).complete) {
        handleImageLoad(idx);
        console.log("already loaded", idx);
      }
    });
  }, [images]);

  return (
    <div className="relative md:mt-20 overflow-hidden w-full bg-white md:p-4">
      {!allLoaded && (
        <div className="absolute top-0 left-0 w-full h-1 bg-gray-200 z-20">
          <div
            className="h-full bg-black transition-all duration-300"
            style={{ width: `${(loadedImages.length / images.length) * 100}%` }}
          />
        </div>
      )}

      <div
        className={`flex md:max-h-2xl transition-transform duration-700 ease-in-out ${!allLoaded ? "opacity-80" : "opacity-100"} transition-opacity`}
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((src, idx) => (
          <div className="min-w-full flex-shrink-0" key={idx}>
            <img
              src={src}
              onLoad={() => {
                handleImageLoad(idx);
                console.log("loaded");
              }}
              data-carousel
              className="w-screen h-auto md:max-h-[80vh] object-cover  "
              alt={`carousel-${idx}`}
            />
          </div>
        ))}
      </div>

      <div className="gap-2 flex flex-col text-sm px-1 text-center rounded-sm py-1 absolute md:bottom-5 bottom-1/4 left-1/2 transform -translate-x-1/2 space-x-2">
        <p className="text-xs text-white font-black uppercase">
          Ưu đãi độc quyền mới nhất riêng cho bạn!
        </p>
        <button
          onClick={() => {
            window.scrollTo({ top: 700, behavior: "smooth" });
          }}
          className="bg-white rounded-lg text-black text-base uppercase px-4 py-3 font-black hover:bg-gray-200 transition-colors"
        >
          Sử dụng dịch vụ ngay
        </button>
      </div>
    </div>
  );
}
