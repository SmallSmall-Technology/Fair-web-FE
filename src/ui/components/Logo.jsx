import { Link } from 'react-router-dom';

function Logo({ width = 120, height = 40, className = '' }) {
  return (
    <Link
      to="/"
      aria-label="Small small Home"
      // className={className}
      // className="transition-transform focus:scale-105 focus:outline-none"
    >
      <img
        src="/images/SST_LOGO_HORIZONTAL_WEB_DARK.svg"
        alt="Smallsmall Logo"
        width={width}
        height={height}
        loading="eager"
        decoding="defer"
        className={className}
        // className="motion-safe:transition-transform"
      />
    </Link>
  );
}

export default Logo;
