const express = require('express');
const mongoose = require('mongoose');
const Seller = require('./models/Sellers')
const Appointment = require('./models/Appointments')

// express app
const app = express();
app.use(express.json())

// connect to mongodb & listen for requests
const dbURI = "mongodb+srv://ajmalrcb:Srrec2016@@capstone-pxb4d.mongodb.net/Scheduler?retryWrites=true&w=majority";

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => {
        console.log('connected to db')
        app.listen(3000)
    })
    .catch(err => console.log(err));

app.get('/sellers', (req, res) => {
    Seller.find()
        .then(result => {
            res.send(result);
        })
        .catch(err => {
            console.log(err);
        });
});

app.get('/appointments/:seller_id', (req, res) => {
    let seller_id = req.params.seller_id.split('_')[0].toUpperCase() + ' ' + req.params.seller_id.split('_')[1];
    console.log(req, seller_id)
    Appointment.find({ "sellerName": seller_id })
        .then(result => {
            res.send(result);
        })
        .catch(err => {
            console.log(err.response);
        });
});

app.put('/appointments/confirm', (req, res) => {
      console.log(req.params)
     
    Appointment.findAndModify({
        "sellerName": req.params.sellerName,
        "custId": req.params.custId,
        "time": req.params.time,
        "isConfirmed": true,
        new: true
    })
        .then(result => {
            res.send(result);
        })
        .catch(err => {
            console.log(err.response);
        });
});
app.post('/seller/add', (req, res) => {
    const seller = new Seller({ sellerName: req.body.sellerName, timeSlots: req.body.timeSlots });

    seller.save()
        .then(result => {
            res.send('created..!');
        })
        .catch(err => {
            console.log(err);
        });
});
app.post('/appointment/new', (req, res) => {
    console.log(req.body)
    const appointment = new Appointment({
        sellerName: req.body.sellerName,
        time: req.body.time,
        date: req.body.date
    });

    appointment.save()
        .then(result => {
            res.send('created..!');
        })
        .catch(err => {
            console.log(err);
        });
});

// 404 page
app.use((req, res) => {
    res.status(404);
});