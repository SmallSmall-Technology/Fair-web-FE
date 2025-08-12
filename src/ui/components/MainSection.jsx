function MainSection({ children }) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-4 md:gap-x-8 md:gap-y-3">
      {children}
    </section>
  );
}

export default MainSection;
