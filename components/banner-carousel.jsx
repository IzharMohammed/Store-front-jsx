"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function BannerCarousel({ banners }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    if (banners.length > 0) {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }
  }, [banners.length]);

  const prevSlide = useCallback(() => {
    if (banners.length > 0) {
      setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);
    }
  }, [banners.length]);

  const goToSlide = useCallback((index) => {
    setCurrentIndex(index);
  }, []);

  // Auto-advance slides
  useEffect(() => {
    if (banners.length <= 1) return;

    const interval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    return () => clearInterval(interval);
  }, [nextSlide, banners.length]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  if (!banners || banners.length === 0) return null;

  const currentBanner = banners[currentIndex];

  return (
    // <div className="relative w-full h-[300px] md:h-[370px] lg:h-[460px] overflow-hidden rounded-lg shadow-xl group">
    <div className="relative w-full h-[400px] md:h-[500px] lg:h-[890px] overflow-hidden rounded-lg shadow-xl group">
      {/* Main Banner Image */}
      <div className="relative w-full  h-full">
        <Image
          src={currentBanner.image}
          alt={currentBanner.title || `Banner ${currentIndex + 1}`}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          priority={currentIndex === 0}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/20" />
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 md:p-3 shadow-lg transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 opacity-0 group-hover:opacity-100"
        aria-label="Previous banner"
      >
        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 md:p-3 shadow-lg transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 opacity-0 group-hover:opacity-100"
        aria-label="Next banner"
      >
        <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black/20 ${
              index === currentIndex
                ? "bg-white shadow-lg scale-125"
                : "bg-white/50 hover:bg-white/75"
            }`}
            aria-label={`Go to banner ${index + 1}`}
          />
        ))}
      </div>

      {/* Banner Counter */}
      <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm font-medium">
        {currentIndex + 1} / {banners.length}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-black/20">
        <div
          className="h-full bg-white transition-all duration-5000 ease-linear"
          style={{ width: `${((currentIndex + 1) / banners.length) * 100}%` }}
        />
      </div>
    </div>
  );
}
