/* eslint-disable react/prop-types */
// import classNames from 'classnames';
 ';
export const Button = ({ children, onClick, className }) => {
  return (
    <button onClick={onClick} className={className}>
      {children}
    </button>
  );
};

export const YellowButton = ({ children, onClick }) => {
  return (
    <button
      type="submit"
      onClick={onClick}
      className=" group relative inline-flex items-center overflow-hidden rounded-[20px] bg-[var(--yellow-primary)]  border-2 border-bg-[var(--yellow-primary)]  w-full mx-auto  md:px-12 py-2 text-lg font-medium text-black hover:bg-gray-50 hover:text-black"
    >
      <span className="duration-400 ease absolute left-0 top-1/2 block h-0 w-full bg-white opacity-100 transition-all group-hover:top-0 group-hover:h-full hover:border-bg-[var(--yellow-primary)] "></span>

      <span className="relative transform duration-700 group-hover:-translate-x-1 mx-auto font-medium text-base">
        {children}
      </span>
    </button>
  );
};

export const CheckoutDeliveryAddressButton = ({ children, onClick }) => {
  return (
    <button
      type="submit"
      onClick={onClick}
      className=" group relative inline-flex items-center overflow-hidden rounded-[20px] bg-[var(--yellow-primary)]  border-2 border-bg-[var(--yellow-primary)]  w-full md:w-[30%] mx-auto   py-2 text-lg font-medium text-black hover:bg-gray-50 hover:text-black"
    >
      <span className="duration-400 ease absolute left-0 top-1/2 block h-0 w-full bg-white opacity-100 transition-all group-hover:top-0 group-hover:h-full hover:border-bg-[var(--yellow-primary)] "></span>

      <span className="relative transform duration-700 group-hover:-translate-x-1 mx-auto font-medium text-base">
        {children}
      </span>
    </button>
  );
};

export const CustomButton = ({
  text,
  bgColor = 'var(--yellow-primary)',
  hoverColor = 'var(--btn-hover-bg-primary)',
  width = '100%',
  fontWeight = '600',
  textSize = '1rem',
  type = 'button',
  onClick,
  disabled = false,
  className = '',
  style = {},
}) => {
  const buttonStyles = {
    backgroundColor: bgColor,
    width,
    fontWeight,
    fontSize: textSize,
    ...style,
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={buttonStyles}
      onMouseOver={(e) => {
        e.target.style.backgroundColor = hoverColor;
      }}
      onMouseOut={(e) => {
        e.target.style.backgroundColor = bgColor;
      }}
      className={`text-black py-2 px-4 rounded transition-colors duration-300 ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      } ${className}`}
    >
      {text}
    </button>
  );
};
