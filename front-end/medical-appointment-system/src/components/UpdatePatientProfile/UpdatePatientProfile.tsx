import React from 'react';

interface ProfileData {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  health_insurance_no: string;
}

interface ProfileFormProps {
  profileData: ProfileData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const UpdatePatientProfile: React.FC<ProfileFormProps> = ({ profileData, handleChange, handleSubmit }) => {
  return (
    <div className="container d-flex justify-content-center mt-5">
      <div className="card shadow" style={{ width: '60%', height: '600px'}}>
        <div className="card-body">
          <h3 className="card-title mb-4 d-flex justify-content-between align-items-center">
            User Profile Information
          </h3>
          <form>
            <div className="mb-3">
              <label htmlFor="first_name" className="form-label">First Name</label>
              <input type="text" className="form-control" id="first_name" name="first_name" value={profileData.first_name} onChange={handleChange}/>
            </div>
            <div className="mb-3">
              <label htmlFor="last_name" className="form-label">Last Name</label>
              <input type="text" className="form-control" id="last_name" name="last_name" value={profileData.last_name} onChange={handleChange}/>
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" className="form-control" id="email" name="email" value={profileData.email} onChange={handleChange}/>
            </div>
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">Phone</label>
              <input type="text" className="form-control" id="phone" name="phone" value={profileData.phone} onChange={handleChange}/>
            </div>
            <div className="mb-3">
              <label htmlFor="health_insurance_no" className="form-label">Health Insurance No</label>
              <input type="text" className="form-control" id="health_insurance_no" name="health_insurance_no" value={profileData.health_insurance_no} onChange={handleChange}/>
            </div>
            <button type="button" className="btn btn-primary" onClick={handleSubmit} style={{ float: 'right' }}>Save</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdatePatientProfile;
