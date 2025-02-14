export const Button = ({ children, onClick, className }) => {
  return (
    <button onClick={onClick} className={className}>
      {children}
    </button>
  );
};

{
  /* 
  Hover on white
  <Button className="group relative inline-flex items-center overflow-hidden rounded-full bg-black  border-2 border-black px-6 md:px-12 py-3 text-base font-medium text-white hover:bg-gray-50 hover:text-black">
<span className="duration-400 ease absolute left-0 top-1/2 block h-0 w-full bg-white opacity-100 transition-all group-hover:top-0 group-hover:h-full "></span>

<span className="relative transform duration-700 group-hover:-translate-x-1">
  Shop
</span>
</Button>


Hover on black
<Button className="group relative inline-flex items-center overflow-hidden rounded-full bg-white  border-2 border-black px-6 md:px-12 py-3 text-base font-medium text-black hover:bg-gray-50 hover:text-white">
<span className="duration-400 ease absolute left-0 top-1/2 block h-0 w-full bg-black opacity-100 transition-all group-hover:top-0 group-hover:h-full "></span>

<span className="relative transform duration-700 group-hover:-translate-x-1">
  Small small
</span>
</Button> */
}
