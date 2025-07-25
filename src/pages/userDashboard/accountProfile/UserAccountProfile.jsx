import { Outlet } from 'react-router-dom';
import { AccountProfileSideBar } from './AccountProfileSideBar';

const UserAccountProfile = () => {
  return (
    <>
      <section className="grid grid-cols-1 xl:grid-cols-[18%_80%] mt-8">
        <AccountProfileSideBar />
        <Outlet />
      </section>
    </>
  );
};

export default UserAccountProfile;
