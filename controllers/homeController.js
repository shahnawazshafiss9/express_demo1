import userModel from '../models/User.js';
import bcrypt from 'bcrypt'
class homeController{

static loginUser = async (req, res) =>{
    try{
        res.render('login', {title: 'login page'});
    }catch(err){
        console.log(err);
    }

}   
static verifiyUser = async (req, res) => {
    console.log(req.body);
    const {email, password} = req.body;
    const userFind = await userModel.findOne({email: email});
    if(userFind != null){
        const hashPwd = await bcrypt.compare(password, userFind.password);
        if(userFind.email == email && hashPwd){
            res.send(`<h1>login ${userFind}</h1>`);
        }else{
            res.send('login credential invalid');
        }    
    }else{
        res.send('You\'r not registered with us');
    }

}

static createDoc = async (req,  res) => { 
    try{
    //console.log(req.body.name);
    //destructure javascript objects
    const { name, age, fees, email,password } = req.body;
    const hashPwd = await bcrypt.hash(password, 10);
    const doc = new userModel({
        name: name,
        age:age,
        password:hashPwd,
        email: email,
        fees:fees
    });
    const result = await doc.save();
    console.log(result);
    res.redirect('user')
    }catch(err){
        console.log(err)
    }
}
static getAllDoc = async (req,  res) => { 
    try{
        
    const users = await userModel.find();
   
    res.render('home', {'title': 'home page', users: users})
    }catch(err){
        console.log(err);
    }
}
static editDoc = async (req,  res) => { 
    try{
    const getId =  req.params.id;
    console.log(getId);
    const findUser = await userModel.findById(getId);
    console.log(findUser)
    
    res.render('edit', {'title': 'edit page', user: findUser})
    }catch(err){
        console.log(err);
    }
}
static updateDocById = async (req,  res) => { 
    try{
        const {name, email, age, fees }= req.body;
        await userModel.findByIdAndUpdate(req.params.id, req.body);
        res.redirect('/user')
    }catch(err){
        console.log(err);
    }
}
static deleteDocById = async (req,  res) => { 
    try{
        await userModel.findByIdAndDelete(req.params.id);
        res.redirect('/user')
    }catch(err){
        console.log(err);
    }

}

}

export default homeController