import { Link } from 'react-router-dom';
import { termsSections } from '../../utils/data';

function MainContent() {
  return (
    <div className="ml-7">
      <div className="py-3 ">
        <h1>Terms of use</h1>
      </div>

      <p>Last Updated: July 7th, 2025</p>
      <div>
        <ol>
          {termsSections.map((term, i) => (
            <li key={i}>
              <span>{i + 1}</span>
              <Link className="mx-2" to={'/'}>
                {term}
              </Link>{' '}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default MainContent;
