import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  };

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>
            {/* use react-icons/fa  FaGym */}
            <i className="fas fa-dumbbell">
              Fitne
              <span
                style={{
                  color: '#e7195a',
                }}
              >
                X
              </span>
            </i>
          </h1>
        </Link>
        <nav>
          {user && (
            <div>
              <p
                style={{
                  display: 'inline-block',
                  margin: '0 1rem',
                  width: '50px',
                  height: '50px',
                  backgroundColor: 'black',
                  color: 'white',
                  borderRadius: '50%',
                  textAlign: 'center',
                  lineHeight: '50px',
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                }}
              >
                {user.email.split('@')[0][0].toUpperCase()}
              </p>
              <Link to="/profile">Profile</Link>
              <button onClick={handleClick}>Log out</button>
            </div>
          )}
          {!user && (
            <div>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
