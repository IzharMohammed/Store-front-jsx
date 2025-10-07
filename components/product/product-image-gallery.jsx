// "use client";

// import Image from "next/image";
// import { Badge } from "../ui/badge";
// import { useState } from "react";

// function ProductImageGallery({ images, productName, isInStock }) {
//   const [selectedImageIndex, setSelectedImageIndex] = useState(0);

//   return (
//     <div className="flex flex-col-reverse">
//       {/* Main Image */}
//       <div className="aspect-w-1 aspect-h-1 w-full">
//         <div className="relative h-96 w-full overflow-hidden rounded-lg border">
//           <Image
//             src={images[selectedImageIndex]}
//             alt={`${productName} - Image ${selectedImageIndex + 1}`}
//             fill
//             className="h-full w-full object-cover object-center"
//             priority={selectedImageIndex === 0}
//           />
//           {!isInStock && (
//             <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//               <Badge variant="destructive" className="text-lg px-4 py-2">
//                 Out of Stock
//               </Badge>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Thumbnail Gallery */}
//       {images.length > 1 && (
//         <div className="mt-4 grid grid-cols-4 gap-2 mb-4">
//           {images.map((image, index) => (
//             <button
//               key={index}
//               onClick={() => setSelectedImageIndex(index)}
//               className={`relative h-20 w-full overflow-hidden rounded-md border-2 transition-all ${
//                 selectedImageIndex === index
//                   ? "border-primary ring-2 ring-primary"
//                   : "border-gray-200 hover:border-gray-300"
//               }`}
//             >
//               <Image
//                 src={image}
//                 alt={`${productName} thumbnail ${index + 1}`}
//                 fill
//                 className="h-full w-full object-cover object-center"
//               />
//             </button>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default ProductImageGallery;

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
