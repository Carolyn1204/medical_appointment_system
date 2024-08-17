export class AppointmentModel {
    constructor(
        private _app_id: number,
        private _first_name: string,
        private _last_name: string,
        private _health_insurance_no: string,
        private _doctor_name: string,
        private _appdate: Date,
        private _apptime: string,
        private _appstatus: string,
        private _patient_id: number,
        private _doctor_id:number
    ) {}

    // Getter and Setter for _app_id
    get app_id(): number {
        return this._app_id;
    }

    set app_id(value: number) {
        this._app_id = value;
    }

    // Getter and Setter for _first_name
    get first_name(): string {
        return this._first_name;
    }

    set first_name(value: string) {
        this._first_name = value;
    }

    // Getter and Setter for _last_name
    get last_name(): string {
        return this._last_name;
    }

    set last_name(value: string) {
        this._last_name = value;
    }

    // Getter and Setter for _health_insurance_no
    get health_insurance_no(): string {
        return this._health_insurance_no;
    }

    set health_insurance_no(value: string) {
        this._health_insurance_no = value;
    }

    // Getter and Setter for _doctor_name
    get doctor_name(): string {
        return this._doctor_name;
    }

    set doctor_name(value: string) {
        this._doctor_name = value;
    }

    // Getter and Setter for _date
    get appdate(): Date {
        return this._appdate;
    }

    set appdate(value: Date) {
        this._appdate = value;
    }

    // Getter and Setter for _time
    get apptime(): string {
        return this._apptime;
    }

    set apptime(value: string) {
        this._apptime = value;
    }

    get appstatus(): string {
        return this._appstatus;
    }

    set appstatus(value: string) {
        this._appstatus = value;
    }

    get patient_id(): number {
        return this._patient_id;
    }

    set patient_id(value: number) {
        this._patient_id = value;
    }

    get doctor_id(): number {
        return this._doctor_id;
    }

    set doctor_id(value: number) {
        this._doctor_id = value;
    }

    
}
