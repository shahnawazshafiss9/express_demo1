//import {getAllDoc} from '../models/User.js'
//let users = getAllDoc();
const users = [
    {
        name: "shahawaz",
        age: 26
    }
]
const aboutController = (req,  res) => {
   //console.log(users);
    res.render('about', {'title' : 'About', users: users})
}

export {aboutController}