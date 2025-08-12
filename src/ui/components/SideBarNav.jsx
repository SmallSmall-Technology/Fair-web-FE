import { Link } from 'react-router-dom';

const dataContent = [
  { label: 'Lorem ipsum dolor sit amet, consec', link: '/' },
  { label: 'Lorem ipsum dolor sit amet, consec', link: '/' },
  { label: 'Lorem ipsum dolor sit amet, consec', link: '/' },
  { label: 'Lorem ipsum dolor sit amet, consec', link: '/' },
  { label: 'Lorem ipsum dolor sit amet, consec', link: '/' },
  { label: 'Lorem ipsum dolor sit amet, consec', link: '/' },
  { label: 'Lorem ipsum dolor sit amet, consec', link: '/' },
  { label: 'Lorem ipsum dolor sit amet, consec', link: '/' },
];

function SideBarNav({ data = dataContent, title }) {
  return (
    // <div className="py-10 mr-4 w-[25%]">
    <div className="py-10">
      <div>
        <h2>{title}</h2>
      </div>
      <nav className="">
        <ul>
          {data.map((dt) => (
            <li className="my-4 hover:underline ">
              <Link to={dt.link}>{dt.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default SideBarNav;
