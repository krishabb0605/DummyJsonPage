import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';
import { Navbar, Nav } from 'react-bootstrap';

const Header = () => {
  const params = useLocation();
  const navigate = useNavigate();

  return (
    <>
      {params.pathname === '/' || params.pathname === '/registration' ? (
        ''
      ) : (
        <div
          className='d-flex align-items-center justify-content-between'
          style={{
            gap: '8px',
          }}
        >
          <Navbar
            collapseOnSelect
            expand='lg'
            className='pt-4'
            style={{
              flex: '1',
              position: 'fixed',
              top: '-20px',
              width: '100%',
              zIndex: '10',
            }}
          >
            <Navbar.Toggle
              aria-controls='responsive-navbar-nav'
              style={{ background: 'white', marginLeft: '20px' }}
            />
            <Navbar.Collapse id='responsive-navbar-nav'>
              <Nav className='mr-auto a1 text-light'>
                <Nav.Link as={NavLink} to='/posts' className='text-light'>
                  Posts
                </Nav.Link>
                <Nav.Link as={NavLink} to='/quotes' className='text-light'>
                  Quotes
                </Nav.Link>
                <Nav.Link as={NavLink} to='/users' className='text-light'>
                  Users
                </Nav.Link>
                <Nav.Link as={NavLink} to='/food' className='text-light'>
                  Food
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>

          <div
            className='d-flex align-items-center btn btn-light'
            style={{
              position: 'fixed',
              right: '8px',
              top: '12px',
              zIndex: '10',
            }}
          >
            <button className='btn me-3 p-0' onClick={() => navigate('/')}>
              Logout
            </button>
            <FiLogOut />
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
