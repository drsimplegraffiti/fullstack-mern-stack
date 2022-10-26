import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import FormData from 'form-data';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditProfile = () => {
  const navigate = useNavigate();
  const { user, dispatch } = useAuthContext();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const [profile, setProfile] = useState({
    bio: '',
    dob: '',
    age: '',
    address: '',
    phone: '',
    profilePic: '',
  });

  const updateProfile = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    let form = new FormData();
    form.append('bio', profile.bio);
    form.append('dob', profile.dob);
    form.append('age', profile.age);
    form.append('address', profile.address);
    form.append('phone', profile.phone);

    form.set('image', profile.profilePic[0]);

    console.log(form);
    try {
      const response = await axios.post(
        'http://localhost:4000/api/user/edit',
        form,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const json = await response.data;

      if (!response.data) {
        setIsLoading(false);
        // toast.error(response.data.message);
        setError(json.error);
        return;
      }

      if (response.data) {
        setError(null);
        console.log(json);
        dispatch({ type: 'UPDATE_PROFILE', payload: json });

        navigate('/profile');
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  return (
    <div className="profile">
      <ToastContainer />
      <button className="edit-button">
        <Link to="/profile">Back to Profile</Link>{' '}
      </button>

      <form onSubmit={updateProfile}>
        <div className="user-profile-card">
          <label htmlFor="bio">Bio</label>
          <input
            type="text"
            name="bio"
            placeholder="Enter your bio"
            value={profile.bio}
            onChange={handleChange}
          />

          <label htmlFor="dob">Date of Birth</label>
          <input
            type="date"
            name="dob"
            value={profile.dob}
            onChange={handleChange}
          />

          <label htmlFor="age">Age</label>
          <input
            type="number"
            name="age"
            placeholder="Enter your age"
            pattern="[0-9]*"
            value={profile.age}
            onChange={handleChange}
          />

          <label htmlFor="address">Address</label>
          <input
            type="text"
            name="address"
            placeholder="Enter your address"
            value={profile.address}
            onChange={handleChange}
          />

          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            placeholder="Enter your phone number"
            name="phone"
            value={profile.phone}
            onChange={handleChange}
          />

          <label htmlFor="profilePic">Profile Picture</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={(e) =>
              setProfile({ ...profile, profilePic: e.target?.files })
            }
          />

          {profile.profilePic.length > 0 && (
            <img
              src={URL.createObjectURL(profile.profilePic[0])}
              alt="profile"
              className="profile-preview"
            />
          )}

          <button type="submit" disabled={isLoading}>
            Update Profile
          </button>
          {error && <div className="error">{error}</div>}
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
