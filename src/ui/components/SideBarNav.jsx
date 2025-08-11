import { Link } from 'react-router-dom';

const dataContent = [
  { label: 'Lorem ipsum dolor sit amet, consectetur', link: '/' },
  { label: 'Lorem ipsum dolor sit amet, consectetur', link: '/' },
  { label: 'Lorem ipsum dolor sit amet, consectetur', link: '/' },
  { label: 'Lorem ipsum dolor sit amet, consectetur', link: '/' },
  { label: 'Lorem ipsum dolor sit amet, consectetur', link: '/' },
  { label: 'Lorem ipsum dolor sit amet, consectetur', link: '/' },
  { label: 'Lorem ipsum dolor sit amet, consectetur', link: '/' },
  { label: 'Lorem ipsum dolor sit amet, consectetur', link: '/' },
];

function SideBarNav({ data = dataContent, title }) {
  return (
    <div className="py-10 mr-4 w-[25%]">
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
