export class PatientProfileModel {
    constructor(
        private _patient_id: number,
        private _user_name: string,
        private _first_name: string,
        private _last_name: string,
        private _password: string,
        private _email: string,
        private _phone: string,
        private _health_insurance_no: string,
        private _identity: string
    ) { }

    // Getter and Setter for _patient_id
    get patient_id(): number {
        return this._patient_id;
    }

    set patient_id(value: number) {
        this._patient_id = value;
    }

    // Getter and Setter for _user_name
    get user_name(): string {
        return this._user_name;
    }

    set user_name(value: string) {
        this._user_name = value;
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

    // Getter and Setter for _password
    get password(): string {
        return this._password;
    }

    set password(value: string) {
        this._password = value;
    }

    // Getter and Setter for _email
    get email(): string {
        return this._email;
    }

    set email(value: string) {
        this._email = value;
    }

    // Getter and Setter for _phone
    get phone(): string {
        return this._phone;
    }

    set phone(value: string) {
        this._phone = value;
    }

    // Getter and Setter for _health_insurance_no
    get health_insurance_no(): string {
        return this._health_insurance_no;
    }

    set health_insurance_no(value: string) {
        this._health_insurance_no = value;
    }

    // Getter and Setter for _identity
    get identity(): string {
        return this._identity;
    }

    set identity(value: string) {
        this._identity = value;
    }
}
