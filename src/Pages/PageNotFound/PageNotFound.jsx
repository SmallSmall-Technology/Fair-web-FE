function PageNotFound() {
  return (
    <div>
      Ooops!!! page not found <button onClick={() => navigate(-1)}>&larr;go back home</button>
    </div>
  );
}

export default PageNotFound;
