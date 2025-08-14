import React from 'react';
import ProductImage from '../ProductImage';

export const ProductThumbnails = ({ product, onHoverImage }) => {
  return (
    <aside className="w-[80px] hidden lg:grid">
      <div className="grid gap-4">
        {product?.productGallery &&
          product?.productGallery
            .replace(/^\[|\]$/g, '')
            .split(',')
            .map((url, i) => (
              <div
                key={i}
                className="cursor-pointer w-[94px] h-[94px] flex flex-col gap-4 justify-center items-center rounded-2xl bg-[#F2F2F2]"
                onMouseEnter={() => onHoverImage(url.trim())}
              >
                <ProductImage>
                  <img
                    src={url.trim()}
                    alt={`Product Image ${i}`}
                    className="w-[77px] h-[77px] object-cover rounded flex justify-center items-center mx-auto"
                  />
                </ProductImage>
              </div>
            ))}
      </div>
    </aside>
  );
};
