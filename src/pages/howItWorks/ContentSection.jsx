function ContentSection({ title, description, children }) {
  return (
    <section className="text-center px-4 pb-8">
      {children && <div className="mt-8">{children}</div>}
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        {title}
      </h2>
      <p className="text-gray-700 max-w-2xl mx-auto text-base md:text-lg">
        {description}
      </p>
    </section>
  );
}

export default ContentSection;
