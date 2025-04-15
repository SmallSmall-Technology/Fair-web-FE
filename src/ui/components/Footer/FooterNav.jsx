import { Link } from 'react-router-dom';

function FooterNav({ menuFooter }) {
  return (
    <nav className="grid grid-cols-2 md:grid-cols-4 gap-8">
      {menuFooter?.map((section) => (
        <div key={section.title}>
          <p className="font-semibold mb-4">{section.title}</p>
          <nav className="font-light">
            <ul>
              {section.links.map((item) => (
                <li key={item.name} className="mb-4">
                  <Link to={item.link}>{item.name}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      ))}
    </nav>
  );
}

export default FooterNav;
