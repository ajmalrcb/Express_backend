const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
    sellerName: {
        type: String,
        // required: true,
    },
    time: {
        type: String,
        // required: true,
    },
    date: {
        type: String,
        // required: true,
    },
    isConfirmed: {
        type: Boolean
    },
    custId: {
        type: String
    }
}, { collection: 'Appointments' });

const Appointment = mongoose.model('Appointment', appointmentSchema);
module.exports = Appointment;