import React, { useState, useEffect} from 'react';
import axios from 'axios';
import Navbar from '../../components/Navigation/Navigation';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import UpdatePatientProfile from '../../components/UpdatePatientProfile/UpdatePatientProfile';
import { getUserDataFromLocalStorage } from '../../utils/getToken';


const PatientProfileUpdatePage: React.FC = () => {

    const [profileData, setProfileData] = useState({
        id:0,
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        health_insurance_no: '',
        token:''
      });
    
      useEffect(() => {
        const fetchData = async () => {
          try {
            
            const { uid, token } = getUserDataFromLocalStorage();
    
            
            axios.defaults.headers.common['Authorization'] = `${token}`;
    
            
            const response = await axios.get(`http://127.0.0.1:3007/patient/profile${uid}`);
            const data = response.data.data;
    
            setProfileData({
              id:uid,
              first_name: data.first_name,
              last_name: data.last_name,
              email: data.email,
              phone: data.phone,
              health_insurance_no: data.health_insurance_no,
              token:token
            });
          } catch (error) {
            console.error('Error fetching profile data:', error);
          }
        };
    
        fetchData();
      }, []);



      const navigate = useNavigate();
      
      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProfileData(prevState => ({
          ...prevState,
          [name]: value
        }));
      };
      
      const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

       
        axios.defaults.headers.common['Authorization'] = `${profileData.token}`;

        

        const updateDataFiltered:any = { ...profileData };
        delete updateDataFiltered.token;

        console.log(updateDataFiltered)
    
        axios.put('http://127.0.0.1:3007/patient/update', updateDataFiltered)
          .then(response => {
            if (response.data.status === 0) {
              
              const userConfirmed = window.confirm('Update successful!');
              if (userConfirmed) {
                navigate('/patient/profile');
              }
            } else {
              
              console.error('Update failed:', response.data.message);
              
            }
          })
          .catch(error => {
            console.error('Error during update:', error);
            
          });
      };





  return (
    <div>
      <Navbar />
      <UpdatePatientProfile profileData={profileData} handleChange={handleChange} handleSubmit={handleSubmit} />
        <Footer/>
    </div>


  );
};

export default PatientProfileUpdatePage;