const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Replace with your email credentials
const transporter = nodemailer.createTransport({
    service: 'gmail', // e.g., Gmail
    auth: {
        user: 'vladimir.yarovoy.jr@gmail.com',
        pass: 'YOUR_APP_PASSWORD' // Use an App Password if using Gmail
    }
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/order', (req, res) => {
    const robux = parseInt(req.body.robux, 10);
    if (isNaN(robux) || robux < 1 || robux > 100) {
        return res.status(400).send('Invalid amount');
    }

    const mailOptions = {
        from: 'vladimir.yarovoy.jr@gmail.com',
        to: 'vladimir.yarovoy.jr@gmail.com',
        subject: 'New Robux Order',
        text: `Someone ordered ${robux} Robux.`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Email failed:', error);
            return res.status(500).send('Failed to send email');
        }
        res.send('Order submitted!');
    });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
