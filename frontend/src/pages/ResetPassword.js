import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import '../loading.css';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setVisible] = useState(false);

  const { token } = useParams();

  const toggle = () => {
    setVisible(!isVisible);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    console.log('========================================');
    try {
      if (password !== confirmPassword) {
        throw new Error('Passwords do not match');
      }

      const response = await fetch(
        `http://localhost:4000/api/user/reset-password`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            password,
            confirmPassword,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      console.log(data);

      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form className="reset-password">
        <h1>Reset Password</h1>
        <div class="password-container">
          <input
            type={isVisible ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <i onClick={toggle} className="fa-eye">
            {isVisible ? <FaEyeSlash /> : <FaEye />}
          </i>
        </div>
        <div class="password-container">
          <input
            type={isVisible ? 'text' : 'password'}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <i onClick={toggle} className="fa-eye">
            {isVisible ? <FaEyeSlash /> : <FaEye />}
          </i>
        </div>
        <button onClick={handleResetPassword}>Reset Password</button>
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
        {error && (
          <p className="error" style={{ color: 'red' }}>
            {error}
          </p>
        )}
      </form>
    </div>
  );
};

export default ResetPassword;
