import Image from "next/image";
import { getBanners } from "@/actions/banner";
import { BannerCarousel } from "./banner-carousel";

export async function HeroBanner() {
  const response = await getBanners();

  if (!response.success || response.data.length === 0) {
    return (
      <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto bg-gray-200 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-600">
            No Banners Available
          </h3>
          <p className="text-gray-500">Check back later for exciting offers!</p>
        </div>
      </div>
    );
  }

  const banners = response.data;

  // Single banner - no carousel needed
  if (banners.length === 1) {
    const banner = banners[0];
    return (
      <div className="relative w-full h-[500px] lg:h-[890px] xl:h-[1000px] 2xl:h-[850px] overflow-hidden rounded-lg shadow-xl group">
        <div className="relative w-full h-full">
          <Image
            src={banner.image}
            alt={banner.title || "Banner"}
            fill
            className="object-cover  transition-transform duration-700 ease-out"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/20" />

          {/* Banner Title */}
          {/* {banner.title && (
            <div className="absolute bottom-8 left-8 right-8 md:bottom-12 md:left-12 md:right-12">
              <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 md:p-6 shadow-lg">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-2">
                  {banner.title}
                </h2>
                <div className="w-16 h-1 bg-blue-500 rounded-full"></div>
              </div>
            </div>
          )} */}
        </div>
      </div>
    );
  }

  // Multiple banners - use carousel
  return <BannerCarousel banners={banners} />;
}
