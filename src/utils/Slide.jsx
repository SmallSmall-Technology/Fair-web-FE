export default function Slide({ slide, isActive }) {
  return (
    <div
      className={`absolute inset-0 transition-opacity duration-500 ease-in-out text-white ${
        isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
      }`}
    >
      {slide.image ? (
        <img
          src={slide.image}
          alt="Slide image"
          className="w-full h-full object-contain"
        />
      ) : (
        <div
          className="w-full h-full rounded-xl flex items-center justify-center"
          style={{ backgroundColor: '#0D1BFF' }}
        >
          <p className="text-white">Image not available</p>
        </div>
      )}
      <div className="absolute inset-0 bg-black/40 rounded-xl" />
      <div className="absolute inset-0 p-6">{slide.content}</div>
    </div>
  );
}
