import 'dotenv/config';
//const express = require('express')
import express from 'express';
import session from 'express-session';
import MongoStore from 'connect-mongo';
const app  = express()
/*jwt token */
import jwt from 'jsonwebtoken';
app.use(express.json());

/*end jwt token */
const port = process.env.port || '3000'
import web from './routes/web.js';
//import {getAllDoc, createDoc} from './models/User.js';
import connectDB from './db/connectDB.js';
connectDB();
//createDoc();
//getAllDoc();
 const sessionStorge = MongoStore.create({
     mongoUrl: process.env.DATABASE_URL,
     dbName: 'schooldb',
     collectionName:'sessions',
     ttl:14*24*60*60,
     autoRemove: 'native'
 })

import path from 'node:path';
import { fileURLToPath } from 'node:url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.urlencoded({extended:false}))
app.use(express.static('public'));
app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use(express.static(__dirname + '/node_modules/jquery/dist'));


import underConstruction from './middlewares/uc-middleware.js';

//app.use(underConstruction);
app.use(session({
    name:"nmgtechno",
    secret:'iamkey',
    resave: false,
    saveUninitialized: true
}))

app.set('view engine', 'ejs')
app.use('/user', web)
/* jwt related*/

const posts = [
    {
        username: 'Shahnawaz',
        title: 'title 1'
    },
    {
        username: 'Javed',
        title: 'title 2'
    }

];
app.get('/posts',authenticateToken, (req, res) =>{
    res.json(posts.filter(post => post.username === req.user.name));
});
 
/*end jwt related*/
app.use((req, res, next) => {
    res.status(404).render('404', {'title' : 'Page not found!'})
})
function authenticateToken(req, res, next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(token == null) return res.sendStatus(401)
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) return res.sendStatus(403)
        req.user = user
        next()
    })


}
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
})

