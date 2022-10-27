import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSignup } from '../hooks/useSignup';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [bio, setBio] = useState('');
  const [gender, setGender] = useState('Male');
  const [medicalCondition, setMedicalCondition] = useState('');
  const [membership, setMembership] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(
      email,
      password,
      gender,
      bio,
      medicalCondition,
      membership,
      firstName,
      lastName
    );
  };

  const medicalConditionOptions = [
    'Diabetes',
    'Asthma',
    'Others',
    'Broken bones',
    'Chest pains',
    'High Blood Pressure',
    'Heart Disease',
    'Cancer',
    'None',
  ];

  const membershipOptions = ['1 month', '3 months', '6 months', '1 year'];
  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3> Sign up</h3>

      <label htmlFor="firstName">First Name</label>
      <input
        type="text"
        name="firstName"
        id="firstName"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <label htmlFor="lastName">Last Name</label>
      <input
        type="text"
        name="lastName"
        id="lastName"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />

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
      <label>Medical Condition: </label>
      <select
        name="medicalCondition"
        onChange={(e) => setMedicalCondition(e.target.value)}
        value={medicalCondition}
      >
        <option value="Choose Medical Condition" disabled>
          Choose Medical Condition
        </option>
        {medicalConditionOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {/* radio button for membership input */}
      <label>Membership: </label>
      <div className="membership">
        {membershipOptions.map((option) => (
          <div className="membership-radio-button" key={option}>
            <input
              type="radio"
              name="membership"
              value={option}
              onChange={(e) => setMembership(e.target.value)}
              checked={membership === option}
            />
            <label>{option}</label>
          </div>
        ))}
      </div>
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
