import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

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
    medicalCondition: '',
    membership: '',
    firstName: '',
    lastName: '',
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

  const handleDownloadUserProfileCard = () => {
    const element = document.getElementById('download-profile-card');
    html2canvas(element).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'PNG', 0, 0);
      pdf.save(`${profile.firstName}.pdf`);
    });
  };

  return (
    <div className="profile">
      <div id="download-profile-card" className="user-profile-card">
        <img src={profile.profilePic} alt="profile" />
        {/* output first name and last name */}
        <h2>
          {profile.firstName} {profile.lastName}
        </h2>
        <h4>Email: {profile.email} </h4>
        <p>Bio: {profile.bio}</p>
        <p>Gender: {profile.gender}</p>
        <p>Date of Birth: {profile.dob}</p>
        <p>Age: {profile.age}</p>
        <p>Address: {profile.address}</p>
        <p>Phone: {profile.phone}</p>
        <p>
          Medical Condition:{' '}
          <span
            style={{
              // if none use color green
              color: profile.medicalCondition === 'None' ? 'green' : 'red',
            }}
          >
            {profile.medicalCondition}
          </span>
        </p>
        <p>Membership: {profile.membership}</p>
        <button className="edit-button">
          <Link to="/edit-profile">Edit</Link>
        </button>
        {/* download profile card */}
        <button className="edit-button" onClick={handleDownloadUserProfileCard}>
          Download
        </button>
      </div>
    </div>
  );
};

export default Profile;
