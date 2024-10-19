"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  Home,
  Tv,
  Film,
  List,
  Clock,
  HelpCircle,
  LogOut,
} from "lucide-react";
import data from "../data.json";

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [featuredContent, setFeaturedContent] = useState<any>(data.Featured);
  const [trendingContent, setTrendingContent] = useState(
    data.TendingNow.slice(0, 8)
  );

  useEffect(() => {
    const lastWatched = sessionStorage.getItem("lastWatched");
    if (lastWatched) {
      const sortedTrending = [...data.TendingNow].sort((a, b) => {
        if (a.Id === lastWatched) return -1;
        if (b.Id === lastWatched) return 1;
        return 0;
      });
      setTrendingContent(sortedTrending.slice(0, 8));
    }
  }, []);

  const handleTrendingClick = (item: any) => {
    setFeaturedContent(item);
    sessionStorage.setItem("lastWatched", item.Id);
    setTimeout(() => {
      console.log("Playing video:", item.VideoUrl);
    }, 2000);
  };

  return (
    <div className="flex h-screen bg-black text-white">
      <div
        className={`fixed left-0 top-0 h-full bg-gray-900 transition-all duration-300 ease-in-out z-10 ${
          isMenuOpen ? "w-64" : "w-16"
        }`}
        onMouseEnter={() => setIsMenuOpen(true)}
        onMouseLeave={() => setIsMenuOpen(false)}
      >
        <div className="flex h-full flex-col items-center justify-between py-4">
          <div className="flex flex-col items-center space-y-4">
            <Search className="h-6 w-6" />
            <Home className="h-6 w-6" />
            <Tv className="h-6 w-6" />
            <Film className="h-6 w-6" />
            <List className="h-6 w-6" />
            <Clock className="h-6 w-6" />
          </div>
          {isMenuOpen && (
            <div className="flex flex-col items-center space-y-4">
              <div className="flex items-center space-x-2">
                <Image
                  src="/assets/placeholder-user.jpg"
                  alt="User"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <span>Daniel</span>
              </div>
              <Link href="#" className="flex items-center space-x-2">
                <span>Language</span>
              </Link>
              <Link href="#" className="flex items-center space-x-2">
                <HelpCircle className="h-4 w-4" />
                <span>Get Help</span>
              </Link>
              <Link href="#" className="flex items-center space-x-2">
                <LogOut className="h-4 w-4" />
                <span>Exit</span>
              </Link>
            </div>
          )}
        </div>
      </div>

      <div
        className={`flex-1 overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? "ml-64" : "ml-16"
        }`}
      >
        <div className="relative h-2/3">
          <Image
            src={`/assets/${featuredContent.CoverImage}`}
            alt={featuredContent.Title}
            layout="fill"
            objectFit="cover"
          />
          <div className="absolute bottom-0 left-0 p-8">
            <h2 className="text-sm uppercase">{featuredContent.Category}</h2>
            <Image
              src={`/assets/${featuredContent.TitleImage}`}
              alt={featuredContent.Title}
              width={300}
              height={100}
              objectFit="contain"
            />
            <p className="mt-2">
              {featuredContent.ReleaseYear} | {featuredContent.MpaRating} |{" "}
              {Math.floor(featuredContent.Duration / 60)}h{" "}
              {featuredContent.Duration % 60}m
            </p>
            <p className="mt-2 max-w-md">{featuredContent.Description}</p>
            <div className="mt-4 flex space-x-4">
              <button className="rounded bg-white px-4 py-2 text-black">
                ▶ Play
              </button>
              <button className="rounded border border-white px-4 py-2">
                More Info
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 px-8">
          <h3 className="mb-4 text-2xl font-bold">Trending Now</h3>
          <div className="flex space-x-4 overflow-x-auto">
            {trendingContent.map((item) => (
              <div
                key={item.Id}
                className="flex-shrink-0"
                onClick={() => handleTrendingClick(item)}
              >
                <Image
                  src={`/assets/${item.CoverImage}`}
                  alt={item.Title}
                  width={200}
                  height={300}
                  objectFit="cover"
                  className="rounded"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
