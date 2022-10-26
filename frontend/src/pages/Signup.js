import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSignup } from '../hooks/useSignup';


const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [bio, setBio] = useState('');
  const [gender, setGender] = useState('Male');
  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(email, password, gender, bio);
  };

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3> Sign up</h3>

      <label>Email: </label>
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />

      <label>Bio: </label>
      <input type="text" onChange={(e) => setBio(e.target.value)} value={bio} />

      <label>Gender: </label>
      <select
        name="gender"
        onChange={(e) => setGender(e.target.value)}
        value={gender}
      >
        <option value="Choose Gender" disabled>
          Choose Gender
        </option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>

      <label>Password: </label>
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />

      <button disabled={isLoading}>Sign up</button>
      <div className="register-login-redirect">
        Already have an account? <Link to="/login">Login</Link>
      </div>

      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Signup;
