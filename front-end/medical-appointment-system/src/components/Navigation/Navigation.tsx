import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [state, setState] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const userDataString = localStorage.getItem('userData');
      if (!userDataString) {
        console.error('userData not found in local storage');
        return;
      }

      const userData = JSON.parse(userDataString);
      const status = userData.status;
      setState(status);
    };
    fetchData();
  }, []);

  const logout = () => {
    const userConfirmed = window.confirm('Are you sure you want to logout?');
    if (userConfirmed) {
      localStorage.clear();
      navigate('/');
    }
  };

  return (
    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#0056b3' }}>
      <div className="container-fluid">
        <Link className="navbar-brand text-white" to="/">
          JAC MEDICAL
        </Link>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              {state === 0 ? (
                <Link className="nav-link text-white" to="/patient/app">
                  My Appointment
                </Link>
              ) : (
                <Link className="nav-link text-white" to="/doctor/appointment">
                  My Appointment
                </Link>
              )}
            </li>
            <li className="nav-item">
              {state === 0 ? (
                <Link className="nav-link text-white" to="/patient/profile">
                  My Profile
                </Link>
              ) : (
                <Link className="nav-link text-white" to="/doctor/schedule">
                  My Schedule
                </Link>
              )}
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" onClick={logout} style={{ cursor: 'pointer' }}>
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
