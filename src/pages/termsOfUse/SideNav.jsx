import { Link } from 'react-router-dom';

function SideNav() {
  return (
    <div className="mr-4 w-[25%]">
      <div className="py-3 border-b-[1px] ">
        <h2>Browse policies</h2>
      </div>
      <nav>
        <ul>
          <li className="my-4 text-[#1668E3] hover:underline ">
            <Link to={'#'}>Privacy Policy</Link>
          </li>
          <li className="my-4 text-[#1668E3] hover:underline ">
            <Link to={'#'}>Legal</Link>
          </li>
          <li className="my-4 text-[#1668E3] hover:underline ">
            <Link to={'#'}>Press</Link>
          </li>
          <li className="my-4 text-[#1668E3] hover:underline ">
            <Link to={'#'}>Marketplace guidelines</Link>
          </li>
          <li className="my-4 text-[#1668E3] hover:underline ">
            <Link to={'#'}>Renting terms & conditions</Link>
          </li>
          <li className="my-4 text-[#1668E3] hover:underline ">
            <Link to={'#'}>FAQ</Link>
          </li>
          <li className="my-4 text-[#1668E3] hover:underline ">
            <Link to={'#'}>Knowledge base</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default SideNav;
