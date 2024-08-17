import React from "react";
import { AppointmentModel } from "../../models/AppointmentModel";

type Props = {
    patient_id: number;
    total_app: number;
    addClick: (newApp: AppointmentModel) => void;
};

type FormState = {
    app_id: number;
    first_name: string;
    last_name: string;
    health_insurance_no: string;
    doctor_name: string;
    appdate: Date;
    apptime: string;
    appstatus: string;
    patient_id: number;
    doctor_id:number;
};

export class AddAppForm extends React.Component<Props, FormState> {
    state: FormState = {
        app_id: 0,
        first_name: '',
        last_name: '',
        health_insurance_no: '',
        doctor_name: '',
        appdate: new Date(),
        apptime: '',
        appstatus: 'pending',
        patient_id: 0,
        doctor_id:1
    };

    componentDidMount() {
        const userDataString = localStorage.getItem('userData');
        
        if (userDataString) {
            try {
                const userData = JSON.parse(userDataString);
                this.setState({

                    first_name: userData.first_name,
                    last_name: userData.last_name,
                    health_insurance_no: userData.health_insurance_no,
                });
            } catch (error) {
                console.error('Error parsing userData:', error);
            }
        } else {
            console.error('userData not found in local storage');
        }
    }

    addAppHandler = () => {
        const newApp = new AppointmentModel(
            this.props.total_app + 1,
            this.state.first_name,
            this.state.last_name,
            this.state.health_insurance_no,
            this.state.doctor_name,
            this.state.appdate,
            this.state.apptime,
            this.state.appstatus,
            this.props.patient_id,
            this.state.doctor_id
        );
        
        this.props.addClick(newApp);
        this.setState({
            app_id: 0,
            first_name: '',
            last_name: '',
            health_insurance_no: '',
            doctor_name: '',
            appdate: new Date(),
            apptime: '',
            appstatus: 'pending',
            patient_id: 0,
            doctor_id:1
        });
    };

    handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        } as unknown as Pick<FormState, keyof FormState>);
    };

    handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        this.setState({
            appdate: new Date(value)
        });
    };

    handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        } as unknown as Pick<FormState, keyof FormState>);
    };

    public render() {
        return (
            <form className="mt-5">
                <div className="mb-3">
                    <label htmlFor="doctor_name" className="form-label">Select Doctor</label>
                    <select className="form-control" id="doctor_name" name="doctor_name" value={this.state.doctor_name} onChange={this.handleSelectChange}>
                        <option value=""></option>
                        <option value="dr.David">dr.David</option>
                        <option value="dr.Gin">dr.Gin</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="appdate" className="form-label">Appointment Date</label>
                    <input type="date" className="form-control" id="appdate" name="appdate" value={this.state.appdate.toISOString().substring(0, 10)} onChange={this.handleDateChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="apptime" className="form-label">Appointment Time</label>
                    <select className="form-control" id="apptime" name="apptime" value={this.state.apptime} onChange={this.handleSelectChange}>
                        <option value=""></option>
                        <option value="09:00">09:00</option>
                        <option value="10:00">10:00</option>
                        <option value="11:00">11:00</option>
                        <option value="12:00">12:00</option>
                        <option value="14:00">14:00</option>
                        <option value="15:00">15:00</option>
                        <option value="16:00">16:00</option>
                    </select>
                </div>

                <button type="button" className="btn btn-primary" onClick={this.addAppHandler}>Submit</button>
            </form>
        );
    }
}

export default AddAppForm;
