import { Outlet, Link } from "react-router-dom";

const Header = () => {
    return (
        <>
            <nav className="navbar">
                <ul>
                    <li>
                        <Link to='/'>Post</Link>
                    </li>
                    <li>
                        <Link to='/user'>User</Link>
                    </li>
                </ul>
            </nav>
            <Outlet />
        </>
    )
}
export default Header;
