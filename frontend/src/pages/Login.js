import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLogin } from '../hooks/useLogin';
import { FaEyeSlash, FaEye } from 'react-icons/fa';

import '../loading.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isVisible, setVisible] = useState(false);

  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(email, password);
  };

  const toggle = () => {
    setVisible(!isVisible);
  };

  return (
    <form className="login" onSubmit={handleSubmit}>
      <h3> Log in</h3>

      <label>Email: </label>
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />

      <label>Password: </label>

      <div class="password-container">
        <input
          type={isVisible ? 'text' : 'password'}
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <i onClick={toggle} className="fa-eye">
          {isVisible ? <FaEyeSlash /> : <FaEye />}
        </i>
      </div>
      <button disabled={isLoading}>Log in</button>

      <div className="register-login-redirect">
      <br />
        Don't have an account? <Link to="/signup">Signup</Link>
      </div>
      <div className="forgot-password">
        <Link to="/forgot-password">Forgot Password?</Link>
      </div>

      {isLoading && (
        <div class="loadingio-spinner-reload-e5sgld2eww">
          <div class="ldio-1td4xktwchm">
            <div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
      )}

      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Login;
