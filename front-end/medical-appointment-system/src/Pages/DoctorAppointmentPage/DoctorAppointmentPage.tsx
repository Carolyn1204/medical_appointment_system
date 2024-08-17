import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AppointmentModel } from '../../models/AppointmentModel';
import { DoctorAppointmentList } from '../../components/DoctorAppointmentList/DoctorAppointmentList';
import Navbar from '../../components/Navigation/Navigation';
import Footer from '../../components/Footer/Footer';
import { getUserDataFromLocalStorage } from '../../utils/getToken';

const DoctorAppointmentPage: React.FC = () => {
    const [appList, setAppList] = useState<AppointmentModel[]>([]);
    
    const [refreshData, setRefreshData] = useState<boolean>(false);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const { uid, token } = getUserDataFromLocalStorage();

                axios.defaults.headers.common['Authorization'] = `${token}`;

                const response = await axios.get(`http://127.0.0.1:3007/doctor/appointment${uid}`);
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

                } else {
                    console.error('Unexpected response data:', response.data);
                }
            } catch (error) {
                console.error('Error fetching app list data:', error);
            }
        };

        fetchData();
    }, [refreshData]);


    const changeAppStatus = async (app_id: number, status: string) => {
        const statusdata = {
            app_id: app_id,
            status: status
        }

        try {
            const response = await axios.put('http://127.0.0.1:3007/patient/updateStatus', statusdata);

            if (response.data.status === 0) {
                if (status === "confirmed") {
                    const userConfirmed = window.confirm(`Do you want to confirm this appointment?`);
                    if (userConfirmed) {
                        setRefreshData(!refreshData);
                    }
                }
                if (status === "canceled") {
                    const userConfirmed = window.confirm(`Do you want to cancel this appointment?`);
                    if (userConfirmed) {
                        setRefreshData(!refreshData);
                    }

                }

            } else {
                console.error('Change appointment status failed:', response.data.message);
            }
        } catch (error) {
            console.error('Error during changing appointment status:', error);
        }

    }



    return (
        <div>
            <Navbar />

            <DoctorAppointmentList list={appList} changeClick={changeAppStatus} />

            <Footer/>
        </div>
    );
};

export default DoctorAppointmentPage;
