import { NavLink } from "react-router-dom";

const Header = () => {
    return (
        <>
            <nav className="navbar">
                <ul>
                    <li className="linkLi">
                        <NavLink to='/'>Post</NavLink>
                    </li>
                    <li className="linkLi">
                        <NavLink to='/user'>User</NavLink>
                    </li>
                </ul>
            </nav>
        </>
    )
}
export default Header;
