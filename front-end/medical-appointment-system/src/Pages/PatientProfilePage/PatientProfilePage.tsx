import React, { useState, useEffect} from 'react';
import axios from 'axios';
import Navbar from '../../components/Navigation/Navigation';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import PatientProfile from '../../components/PatientProfile/PatientProfile';
import { getUserDataFromLocalStorage } from '../../utils/getToken';



const PatientProfilePage: React.FC = () => {
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    healthInsuranceNo: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const { uid, token } = getUserDataFromLocalStorage();

        
        axios.defaults.headers.common['Authorization'] = `${token}`;

        
        const response = await axios.get(`http://127.0.0.1:3007/patient/profile${uid}`);
        const data = response.data.data;

        setProfileData({
          firstName: data.first_name,
          lastName: data.last_name,
          email: data.email,
          phone: data.phone,
          healthInsuranceNo: data.health_insurance_no
        });
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchData();
  }, []);

  const navigate = useNavigate();
  const handleEditClick = () => {
    navigate('/patient/profile_update'); 
  };

  return (
    <div>
      <Navbar />
      <PatientProfile profileData={profileData} onEditClick={handleEditClick}/>
      <Footer/>
    </div>
  );
};

export default PatientProfilePage;
