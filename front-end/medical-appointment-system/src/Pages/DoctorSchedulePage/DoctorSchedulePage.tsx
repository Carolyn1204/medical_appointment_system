import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Calendar from '@fullcalendar/react'; // Import Calendar and EventInput from @fullcalendar/react
import dayGridPlugin from '@fullcalendar/daygrid'; // Import dayGridPlugin from @fullcalendar/daygrid
import interactionPlugin from '@fullcalendar/interaction'; // Import interactionPlugin from @fullcalendar/interaction
import Navbar from '../../components/Navigation/Navigation';
import Footer from '../../components/Footer/Footer';
import { getUserDataFromLocalStorage } from '../../utils/getToken';

interface Appointment extends EventInit {
    extendedProps: {
        first_name: string;
        last_name: string;
        apptime: string;
        status: string;
    };
}

const DoctorSchedulePage: React.FC = () => {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const calendarRef = useRef<any>(null); // Ref for FullCalendar component

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                // Retrieve user data from localStorage
                const { uid, token } = getUserDataFromLocalStorage();
                // Set Authorization header for Axios
                axios.defaults.headers.common['Authorization'] = `${token}`;

                // Fetch appointments data
                const response = await axios.get(`http://127.0.0.1:3007/doctor/appointment${uid}`);
                const data = response.data.data;

                // Map fetched data to Appointment interface
                const appointmentsData: Appointment[] = data.map((appt: any) => ({
                    title: `${appt.first_name} ${appt.last_name} - ${appt.apptime} - ${appt.status}`,
                    start: appt.appdate,
                    extendedProps: {
                        first_name: appt.first_name,
                        last_name: appt.last_name,
                        apptime: appt.apptime,
                        status: appt.status,
                    },
                }));

                // Set appointments state
                setAppointments(appointmentsData);
            } catch (error) {
                console.error('Error fetching appointments:', error);
            }
        };

        fetchAppointments(); // Fetch appointments when component mounts

        // Cleanup function (if needed)
        return () => {
            // Cleanup logic (if any)
        };
    }, []);

    // Function to render event content (customize as needed)
    const renderEventContent = (info: any) => {
        return (
            <div>
                {info.event.title}
                {/* Customize event content here */}
            </div>
        );
    };

    return (
        <div>
            <Navbar />
            <div className="mt-5">
                <h2 className="text-center mb-4">Doctor Appointment Calendar</h2>
                <div style={{ width: '80%', marginLeft: 200 }}>
                    <Calendar
                        ref={calendarRef} // Ref for FullCalendar component
                        plugins={[dayGridPlugin, interactionPlugin]} // Plugins required by FullCalendar
                        initialView="dayGridMonth" // Initial view of the calendar
                        events={appointments} // Appointments data to display
                        eventContent={renderEventContent} // Custom event rendering function
                    />
                </div>
            </div>
            <Footer/>
        </div>

    );
};

export default DoctorSchedulePage;
