import React from "react";
import { AppointmentModel } from "../../models/AppointmentModel";

type Props = {
    list: AppointmentModel[]
    cancelClick: (app_id: number) => void

}


export class AppointmentList extends React.Component<Props> {


    cancelApp = (id: number) => {
        this.props.cancelClick(id);
    }

    public render() {
        return (
            <div className="mt-5" style={{ width:'65%', marginLeft:300}}>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Appointment No.</th>
                            <th scope="col">Doctor Name</th>
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
                                    <td>{item.doctor_name}</td>
                                    <td>{item.appdate.toISOString().substring(0, 10)}</td>
                                    <td>{item.apptime}</td>
                                    <td>{item.appstatus}</td>
                                    <td>
                                    {item.appstatus !== 'canceled' && (
                                        
                                            <button className="btn btn-danger btn-sm" onClick={() => this.cancelApp(item.app_id)}>Cancel</button>
                                        
                                    )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="text-center">No appointments found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        )
    }
}