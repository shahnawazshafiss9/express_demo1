//const express = require('express')
import express from 'express';
const app  = express()
const port = process.env.port || '3000'
import web from './routes/web.js';

app.use('/', web)
app.set('view engine', 'ejs')

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
})

