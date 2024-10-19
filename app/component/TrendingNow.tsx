import { useState, useRef, useEffect } from "react";
import Image from "next/image";

export default function TrendingNow({ content, setFeaturedContent }: any) {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const scrollRef = useRef(null);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 3;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleItemClick = (item) => {
    setFeaturedContent({
      ...item,
      type: "MOVIE",
      year: 2021,
      rating: "18+",
      duration: "1h 48m",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    });

    sessionStorage.setItem("lastWatched", item.id);

    setTimeout(() => {
      console.log("Change background to video player");
    }, 2000);
  };

  useEffect(() => {
    const lastWatched = sessionStorage.getItem("lastWatched");
    if (lastWatched) {
      const sortedContent = [...content];
      const index = sortedContent.findIndex(
        (item) => item.id === parseInt(lastWatched)
      );
      if (index !== -1) {
        const [item] = sortedContent.splice(index, 1);
        sortedContent.unshift(item);
        console.log("Sorted content:", sortedContent);
      }
    }
  }, [content]);

  return (
    <div className="mt-8">
      <h2 className="mb-4 text-2xl font-semibold">Trending Now</h2>
      <div
        ref={scrollRef}
        className="flex space-x-4 overflow-x-auto"
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {content.map((item) => (
          <div
            key={item.id}
            className="flex-shrink-0 cursor-pointer"
            onClick={() => handleItemClick(item)}
          >
            <Image
              src={item.image}
              alt={item.title}
              width={200}
              height={300}
              objectFit="cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
