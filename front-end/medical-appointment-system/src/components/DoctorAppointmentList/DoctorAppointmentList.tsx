import React from "react";
import { AppointmentModel } from "../../models/AppointmentModel";

type Props = {
    list: AppointmentModel[];
    changeClick: (app_id: number, status: string) => void;
};

export class DoctorAppointmentList extends React.Component<Props> {
    changeApp = (app_id: number, status: string) => {
        this.props.changeClick(app_id, status);
    };

    public render() {
        return (
            <div className="mt-5" style={{ width: '65%', marginLeft: 300 }}>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Appointment No.</th>
                            <th scope="col">Patient First Name</th>
                            <th scope="col">Patient Last Name</th>
                            <th scope="col">Health Insurance No.</th>
                            <th scope="col">Appointment Date</th>
                            <th scope="col">Appointment Time</th>
                            <th scope="col">Appointment Status</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.list?.length > 0 ? (
                            this.props.list.map(item => (
                                <tr key={item.app_id}>
                                    <th scope="row">{item.app_id}</th>
                                    <td>{item.first_name}</td>
                                    <td>{item.last_name}</td>
                                    <td>{item.health_insurance_no}</td>
                                    <td>{item.appdate.toISOString().substring(0, 10)}</td>
                                    <td>{item.apptime}</td>
                                    <td>{item.appstatus}</td>
                                    <td>
                                        {item.appstatus === 'confirmed' && (
                                            <button className="btn btn-danger btn-sm" onClick={() => this.changeApp(item.app_id, "canceled")}>
                                                Cancel
                                            </button>
                                        )}
                                        {item.appstatus === 'pending' && (
                                            <div className="d-flex">
                                                <button className="btn btn-success btn-sm me-2" onClick={() => this.changeApp(item.app_id, "confirmed")}>
                                                    Confirm
                                                </button>
                                                <button className="btn btn-danger btn-sm" onClick={() => this.changeApp(item.app_id, "canceled")}>
                                                    Cancel
                                                </button>
                                            </div>
                                        )}
                                        {item.appstatus === 'canceled' && null}
                                    </td>

                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={8} className="text-center">No appointments found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        );
    }
}
