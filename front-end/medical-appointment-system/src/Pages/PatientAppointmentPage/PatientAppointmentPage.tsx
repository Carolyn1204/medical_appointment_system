import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AppointmentModel } from '../../models/AppointmentModel';
import { AppointmentList } from '../../components/AppoitmentList/AppointmentList';
import { AddAppForm } from '../../components/AddAppForm/AddAppForm';
import Navbar from '../../components/Navigation/Navigation';
import Footer from '../../components/Footer/Footer';
import { getUserDataFromLocalStorage } from '../../utils/getToken';

const PatientAppointmentPage: React.FC = () => {
    const [appList, setAppList] = useState<AppointmentModel[]>([]);
    const [appTotal, setAppTotal] = useState<number>(0);
    const [addFormShow, setAddFormShow] = useState<boolean>(true);
    const [patient_id, setPatient_id] = useState<number>(0);
    const [refreshData, setRefreshData] = useState<boolean>(false);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const { uid, token } = getUserDataFromLocalStorage();
                setPatient_id(uid);


                axios.defaults.headers.common['Authorization'] = `${token}`;

                const response = await axios.get(`http://127.0.0.1:3007/patient/appointment${uid}`);
                const appData = response.data.data;

                if (appData && Array.isArray(appData)) {
                    const appointments = appData.map((item: any) => new AppointmentModel(
                        item.app_id,
                        item.first_name,
                        item.last_name,
                        item.health_insurance_no,
                        item.doctor_name,
                        new Date(item.appdate),
                        item.apptime,
                        item.status,
                        item.patient_id,
                        item.doctor_id
                    ));
                    setAppList(appointments);
                    setAppTotal(response.data.total_app_length);
                    console.log(response.data.total_app_length)
                } else {
                    console.error('Unexpected response data:', response.data);
                }
            } catch (error) {
                console.error('Error fetching app list data:', error);
            }
        };

        fetchData();
    }, [refreshData]);

    const addAppHandler = async (newApp: AppointmentModel) => {
        

        try {
            const response = await axios.post('http://127.0.0.1:3007/patient/addApp', newApp);

            if (response.data.status === 0) {
                const userConfirmed = window.confirm('Add Appointment successful!');
                if (userConfirmed) {
                    setRefreshData(!refreshData);
                }
            } else {
                console.error('Add appointment failed:', response.data.message);
            }
        } catch (error) {
            console.error('Error during adding appointment:', error);
        }

    };

    const cancelApp = async (app_id:number) =>{
        const statusdata = {
            app_id : app_id,
            status : "canceled"
        }

        try {
            const response = await axios.put('http://127.0.0.1:3007/patient/updateStatus', statusdata);

            if (response.data.status === 0) {
                const userConfirmed = window.confirm('Do you want to cancel this appointment?');
                if (userConfirmed) {
                    setRefreshData(!refreshData);
                }
            } else {
                console.error('Cancel appointment failed:', response.data.message);
            }
        } catch (error) {
            console.error('Error during canceling appointment:', error);
        }

        
        

    }



    const toggleForm = () => {
        setAddFormShow(!addFormShow);
    };

    return (
        <div>
            <Navbar />
            <div className="mt-5" style={{ width: '40%', marginLeft: 500 }}>
                <center><h1>Your Appointment</h1></center>
                <button type="button" className="btn btn-primary offset-md-10" onClick={toggleForm}>&nbsp;&nbsp;Add&nbsp;&nbsp;</button>
                {addFormShow && (
                    <AddAppForm total_app={appTotal} patient_id={patient_id} addClick={addAppHandler} />
                )}
            </div>
            <AppointmentList list={appList} cancelClick={cancelApp}/>
            <Footer/>
        </div>
    );
};

export default PatientAppointmentPage;
