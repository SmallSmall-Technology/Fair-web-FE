import Slide from '../../utils/Slide';
import { useCarousel } from '../../hooks/useCarousel';
import { ChevronLeft, ChevronRight, PauseIcon, Play } from 'lucide-react';

export default function HeroBanner({
  slides = [],
  height = 360,
  autoSlideInterval = 3000,
}) {
  const { currentIndex, nextSlide, prevSlide, isPaused, togglePause } =
    useCarousel({ slideCount: slides.length, autoSlideInterval });

  return (
    <section className="mt-2">
      <div
        className="w-full relative rounded-xl overflow-hidden bg-[#F5F5F7]"
        style={{ height }}
      >
        {slides.map((slide, index) => (
          <Slide key={index} slide={slide} isActive={index === currentIndex} />
        ))}

        <div className="absolute bottom-4 right-4 flex gap-2 z-20">
          <button
            onClick={prevSlide}
            className="w-8 h-[22px] bg-white rounded-[10px] flex items-center justify-center"
          >
            <ChevronLeft size={10} />
          </button>
          <button
            onClick={nextSlide}
            className="w-8 h-[22px] bg-white rounded-[10px] flex items-center justify-center"
          >
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
          </button>
        </div>
      </div>
    </section>
  );
}
