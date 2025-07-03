import { RealEstateSlide } from './RealEstateSlide';
import { useCarousel } from '../../../../../hooks/useCarousel';
import { ChevronLeft, ChevronRight, PauseIcon, Play } from 'lucide-react';

export default function RealEstateHeroBanner({
  slides = [],
  height = 360,
  autoSlideInterval = 3000,
}) {
  const { currentIndex, nextSlide, prevSlide, isPaused, togglePause } =
    useCarousel({ slideCount: slides.length, autoSlideInterval });

  return (
    <section className="mt-2">
      <div
        className="w-full relative rounded-xl overflow-hidden lg:bg-[#F5F5F7] bg-[#bebebf]"
        style={{ height }}
      >
        {slides.map((slide, index) => (
          <RealEstateSlide
            key={index}
            slide={slide}
            isActive={index === currentIndex}
          />
        ))}

        <div className="absolute bottom-4 right-4 flex gap-2 z-20">
          <button
            onClick={prevSlide}
            className="w-8 h-[22px] bg-white rounded-[10px] flex items-center justify-center"
          >
            <span className="sr-only">Go back to previous slide</span>
            <ChevronLeft size={10} />
          </button>
          <button
            onClick={nextSlide}
            className="w-8 h-[22px] bg-white rounded-[10px] flex items-center justify-center"
          >
            <span className="sr-only">Go to next slide</span>
            <ChevronRight size={10} />
          </button>
          <button
            onClick={togglePause}
            className="w-8 h-[22px] bg-white rounded-[10px] flex items-center justify-center"
          >
            {!isPaused ? (
              <PauseIcon size={10} fill="black" />
            ) : (
              <Play size={10} fill="black" />
            )}
            <span className="sr-only">Pause on current slide</span>
          </button>
        </div>
      </div>
    </section>
  );
}
