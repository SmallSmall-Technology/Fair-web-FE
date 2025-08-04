import { Heart, Share2 } from 'lucide-react';
import { formatCurrency } from '../../../../../../utils/FormatCurrency';
import { useImageCarousel } from '../../../../../../hooks/useImageCarousel';

export const PropertyCard = ({ property }) => {
  const images = property?.images || [];
  const { currentImageIndex, setCurrentImageIndex } = useImageCarousel(images);
  const currentImage = images[currentImageIndex];

  return (
    <article className="w-[218px] grid gap-2">
      <div
        className="h-[218px] w-[276px] bg-cover bg-center rounded-[10px] relative transition-all duration-500"
        style={{ backgroundImage: `url(${currentImage})` }}
      >
        <div className="flex flex-col justify-between w-full h-full px-3 py-3 rounded-[10px]">
          <span className="bg-white p-1 pr-2 w-fit text-xs font-outfit ">
            Available
          </span>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button>
                <span className="sr-only">Add this property to favourite</span>

                <Heart size={18} color="white" />
              </button>
              <button className="rounded-full bg-white p-1">
                <span className="sr-only">Share this property</span>
                <Share2 size={13} fill="black" />
              </button>
            </div>

            <div className="flex gap-1 pr-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`h-2 w-2 rounded-full transition-all duration-300 ${
                    index === currentImageIndex
                      ? 'bg-white scale-125'
                      : 'bg-white/50'
                  }`}
                >
                  <span className="sr-only">
                    Currently showing properly in ${currentImageIndex} slide
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="font-inter font-normal">
        <p className="text-sm ">{property?.name}</p>
        <div className="flex space-x-2">
          <InfoIcon
            src="/images/bed-alt(1) 21.svg"
            text={`${property?.noOfBedroom} Bed`}
          />
          <InfoIcon
            src="/images/shower 20.svg"
            text={`${property?.noOfBathroom} Bath`}
          />
          <InfoIcon src="/images/marker-pin-01.svg" text={property?.location} />
        </div>
      </div>

      <div>
        <p className="font-semibold font-inter">
          {formatCurrency(property?.price)}{' '}
          <span className="text-sm font-normal">/month</span>
        </p>
        <p className="text-inter font-normal text-sm line-through text-[#96959F]">
          {formatCurrency(property?.discountedPrice)}/year
        </p>
      </div>
    </article>
  );
};

const InfoIcon = ({ src, text }) => (
  <div className="flex gap-[2px] items-center">
    <img src={src} alt={text} />
    <p className="text-sm">{text}</p>
  </div>
);
