import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <>
      <nav className="navbar pt-4">
        <ul className="ul">
          <li className="link-li ps-5">
            <NavLink to="/">Posts</NavLink>
          </li>

          <li className="link-li">
            <NavLink to="/users">Users</NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
};
export default Header;
