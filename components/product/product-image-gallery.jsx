"use client";

import Image from "next/image";
import { Badge } from "../ui/badge";

function ProductImageGallery({ images, productName, isInStock }) {
  const pics = Array.isArray(images) ? images : [images];

  return (
    <div className="space-y-4">
      {/* Grid of all images (no thumbnail selector) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {pics.map((src, idx) => (
          <div
            key={idx}
            className="relative w-full h-[400px] sm:h-[500px] overflow-hidden border"
          >
            <Image
              src={src}
              alt={`${productName} - Image ${idx + 1}`}
              fill
              className="h-full w-full object-cover object-center"
              priority={idx === 0}
            />
            {!isInStock && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <Badge variant="destructive" className="text-lg px-4 py-2">
                  Out of Stock
                </Badge>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductImageGallery;
