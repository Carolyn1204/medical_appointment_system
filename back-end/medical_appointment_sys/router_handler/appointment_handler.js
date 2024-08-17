const { response } = require('express')
const db = require('../db/db_config')

exports.show_appointment = (req, res) => {

    const sql = `select * from appointment where patient_id=?`
    const sql1 = `select * from appointment`
    db.query(sql, [req.params.id], (err, results) => {

        if (err) return res.cc(err)
        let total_app;

        db.query(sql1, (req, results1) => {

            if (err) return res.cc(err)

            total_app = results1.length


            res.send({
                status: 0,
                message: 'get appointment list successfully',
                data: results,
                total_app_length: total_app,
            })
        })
    })


}


exports.addAppointment = (req, res) => {
    const appInfo = req.body
    const sql = 'insert into appointment set ?'
    //console.log(appInfo)

    db.query(sql, {
        app_id: appInfo._app_id, first_name: appInfo._first_name, last_name: appInfo._last_name, health_insurance_no: appInfo._health_insurance_no,
        doctor_name: appInfo._doctor_name, appdate: appInfo._appdate.substring(0, 10), apptime: appInfo._apptime, status: appInfo._appstatus,
        patient_id: appInfo._patient_id,doctor_id:appInfo._doctor_id
    }, (err, results) => {


        if (err) return res.cc(err)


        if (results.affectedRows !== 1) return res.cc('Cannot add new appointment now, please try again!')


        res.cc('register success!', 0)

    })
}

exports.updateStatus = (req, res) => {
    const statusinfo = req.body;
    const app_id = statusinfo.app_id;
    const status = statusinfo.status;
    console.log(app_id)
    console.log(status)


    if (!app_id) {
        return res.cc('appId is required to update the status');
    }

    const sql = `UPDATE appointment SET status = ? WHERE app_id = ?`;

    db.query(sql, [status, app_id], (err, results) => {
        if (err) return res.cc(err);

        if (results.affectedRows !== 1) return res.cc('Cannot update now, please try again!');

        res.cc('Update status success!', 0);
    });
}

exports.doctor_appointment = (req, res) => {

    const sql = `select * from appointment where doctor_id=?`
    db.query(sql, [req.params.id], (err, results) => {

        if (err) return res.cc(err)

        res.send({
            status: 0,
            message: 'get doctor appointment list successfully',
            data: results
        })



    })


}