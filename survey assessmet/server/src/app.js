const express = require("express");
// const cors = require('cors');
const app = express();

// const db = require('./db/connection')
// require("./db/connection")

const port = process.env.PORT || 5000;
const mongoose = require('mongoose')

const uri = "mongodb+srv://pawan_kumar:pawan12345@cluster0.zhlw6vv.mongodb.net/?retryWrites=true&w=majority"
const Form = require(("./models/form"))


app.get('/', (req, res) => {
    res.send("Jai Shree Ram")
})

app.get("/form", (req, res) => {
    res.render("Form")
})

app.post("/form", async (req, res) => {
    try {
        const formData = req.body;
        const newForm = new Form(formData);
        await newForm.save();
        console.log("Form submitted successfully");
        res.status(200).json({ status: 'success', message: 'Form submitted successfully' });
    } catch (error) {
        console.error("Error submitting form:", error);
        res.status(400).json({ status: 'error', message: 'Failed to submit form' });
    }
});




app.listen(port, () => {
    console.log(`Server is runing at port : ${port}`)
})

mongoose.connect(uri)
    .then(() => {
        console.log('Connected to MongoDB Atlas');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB Atlas:', err);
    });