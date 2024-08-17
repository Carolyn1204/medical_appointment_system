const db = require('../db/db_config')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../config')


exports.register = (req, res) => {
    const patientinfo = req.body
    const sql = `select * from patient where user_name=?`
    // if (!patientinfo.user_name || !patient_info.password) {
    //     return res.send({ status: 1, message: 'username and password cannot be empty!' })
    // }



    db.query(sql, [patientinfo.user_name], (err, results) => {

        // if (err) {
        //     return res.send({ status: 1, message: err.message })
        // }

        if (err) return res.cc(err)

        // if (results.length > 0) {
        //     return res.send({ status: 1, message: 'username has been occupied!' })
        // }

        if (results.length > 0) return res.cc('username has been occupied!')


        patientinfo.password = bcrypt.hashSync(patientinfo.password, 10)

        const sql = 'insert into patient set ?'


        db.query(sql, { user_name: patientinfo.user_name, password: patientinfo.password, first_name: patientinfo.first_name, last_name: patientinfo.last_name, email: patientinfo.email, phone: patientinfo.phone, health_insurance_no: patientinfo.health_insurance_no, identity: patientinfo.identity }, (err, results) => {

            //if (err) return res.send({ status: 1, message: err.message })
            if (err) return res.cc(err)

            //if (results.affectedRows !== 1) return res.send({ status: 1, message: 'Cannot register now, please try again!' })
            if (results.affectedRows !== 1) return res.cc('Cannot register now, please try again!')

            //res.send({ status: 0, message: 'register success!' })
            res.cc('register success!', 0)

        })

    })


}

exports.login = (req, res) => {
    const patientinfo = req.body

    if (patientinfo.role === 'patient') {
        const sql = `select * from patient where user_name=?`
        db.query(sql, [patientinfo.username], function (err, results) {

            if (err) return res.cc(err)

            if (results.length !== 1) return res.cc('Your account is not existing!')

            const compareResult = bcrypt.compareSync(patientinfo.password, results[0].password)

            if (!compareResult) {
                return res.cc('Password is not correct!')
            }

            const patient = { ...results[0], password: '' }
            const tokenStr = jwt.sign(patient, config.jwtSecretKey, {
                expiresIn: '10h',
            })

            res.send({
                status: 0,
                message: 'Login success!',
                uid: results[0].patient_id,
                first_name: results[0].first_name,
                last_name: results[0].last_name,
                health_insurance_no: results[0].health_insurance_no,
                token: 'Bearer ' + tokenStr,
            })



        })
    }
    else if (patientinfo.role === 'doctor') {

        const sql = `select * from doctor where user_name=?`
        db.query(sql, [patientinfo.username], function (err, results) {

            if (err) return res.cc(err)

            if (results.length !== 1) return res.cc('Your account is not existing!')

            const compareResult = bcrypt.compareSync(patientinfo.password, results[0].password)

            if (!compareResult) {
                return res.cc('Password is not correct!')
            }

            const patient = { ...results[0], password: '' }


            const tokenStr = jwt.sign(results[0], config.jwtSecretKey, {
                expiresIn: '10h',
            })

            res.send({
                status: 2,
                message: 'Doctor login success!',
                uid: results[0].doctor_id,
                doctor_name: results[0].doctor_name,
                token: 'Bearer ' + tokenStr,
            })



        })
    }

}

exports.showprofile = (req, res) => {

    const sql = `select * from patient where patient_id=?`
    db.query(sql, [req.params.id], (err, results) => {

        if (err) return res.cc(err)

        if (results.length !== 1) return res.cc('Fail to load the user profile!')

        res.send({
            status: 0,
            message: 'get profile successfully',
            data: results[0],
        })
    })

}


exports.updateprofile = (req, res) => {
    const patientinfo = req.body;
    const id = patientinfo.id;

    // Ensure that `id` is provided
    if (!id) {
        return res.cc('ID is required to update the profile');
    }

    const sql = `UPDATE patient SET ? WHERE patient_id = ?`;

    const updateData = {
        first_name: patientinfo.first_name,
        last_name: patientinfo.last_name,
        email: patientinfo.email,
        phone: patientinfo.phone,
        health_insurance_no: patientinfo.health_insurance_no
    };

    db.query(sql, [updateData, id], (err, results) => {
        if (err) return res.cc(err);

        if (results.affectedRows !== 1) return res.cc('Cannot update now, please try again!');

        res.cc('Update success!', 0);
    });
};


