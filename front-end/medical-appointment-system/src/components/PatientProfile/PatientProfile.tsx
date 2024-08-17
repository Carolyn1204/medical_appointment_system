import React from 'react';

interface ProfileData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    healthInsuranceNo: string;
  }
  
  interface ProfileDetailsProps {
    profileData: ProfileData;
    onEditClick: () => void;
  }

const PatientProfile: React.FC<ProfileDetailsProps> = ({ profileData, onEditClick }) => {
  
  return (
    <div className="container d-flex justify-content-center mt-5">
        <div className="card shadow" style={{ width: '60%' }}>
          <div className="card-body">
            <h3 className="card-title mb-4 text-center">User Profile Information</h3>
            <button className="btn btn-primary" onClick={onEditClick} style={{ marginBottom: '10px', float: 'right' }}>Edit</button>
            <table className="table table-bordered">
              <tbody>
                <tr>
                  <th scope="row" className="bg-light" style={{ width: '30%' }}>First Name</th>
                  <td id="firstname">{profileData.firstName}</td>
                </tr>
                <tr>
                  <th scope="row" className="bg-light">Last Name</th>
                  <td id="lastname">{profileData.lastName}</td>
                </tr>
                <tr>
                  <th scope="row" className="bg-light">Email</th>
                  <td id="email">{profileData.email}</td>
                </tr>
                <tr>
                  <th scope="row" className="bg-light">Phone</th>
                  <td id="phone">{profileData.phone}</td>
                </tr>
                <tr>
                  <th scope="row" className="bg-light">Health Insurance No</th>
                  <td id="health-insurance-no">{profileData.healthInsuranceNo}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    
  );
};

export default PatientProfile;
