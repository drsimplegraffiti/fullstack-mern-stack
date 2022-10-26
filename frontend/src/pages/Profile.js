import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';

const Profile = () => {
  const { user } = useAuthContext();
  const [profile, setProfile] = useState({
    email: '',
    bio: '',
    gender: '',
    dob: '',
    age: '',
    address: '',
    phone: '',
    profilePic: '',
  });

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch('/api/user/profile', {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        console.log(json);
        setProfile(json);
      }
    };

    if (user) {
      fetchUser();
    }
  }, [user]);

  return (
    <div className="profile">
      <button className="edit-button">
        <Link to="/edit-profile">Edit Profile</Link>{' '}
      </button>
      <div className="user-profile-card">
      <img src={profile.profilePic} alt="profile" />
        <h4>Email: {profile.email} </h4>
        <p>Bio: {profile.bio}</p>
        <p>Gender: {profile.gender}</p>
        <p>Date of Birth: {profile.dob}</p>
        <p>Age: {profile.age}</p>
        <p>Address: {profile.address}</p>
        <p>Phone: {profile.phone}</p>
      </div>
    </div>
  );
};

export default Profile;
