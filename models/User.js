import mongoose from "mongoose";

//Defining Schma
const userSchema = new mongoose.Schema({
    name: {type: String, required:true,trim:true},
    email: {type: String,unique:true, required:true,trim:true},
    password: {type: String, required:true, trim:true},
    age: {type: Number, required:true,min:18, max:50},
    fees: {type: mongoose.Decimal128, required:true,validate: v => v >= 5500.50},
    hobbies: {type: Array},
    isactive: {type: Boolean},
    comments: [{value: {type:String}, publish: {type: Date, default: Date.now}}],
    join:{type: Date, default:Date.now} 
});
const userModel =mongoose.model('user', userSchema);
// const createDoc = async () => {
//     try{
//         const userDoc = new userModel({
//             name: "Hina Alam",
//             email:"hina@gmail.com",
//             age: 25,
//             fees: 5800.40,
//             hobbies: ['Dancing'],
//             isactive: true,
//             comments: [{value: "Second insert data on mogoes"}]
//         });
//         const result = await userDoc.save();
//         //console.log(result);
//     }catch(err){

//         console.log(err.keyValue);
//         console.log('record dublicate');

//     }
// }
// // Retrive All Document
// const getAllDoc = async (req, res) =>{
//     try{
//         const result  = await userModel.find();
//         console.log(result);
//         res.render('home', {data: result});
//         // result.forEach((item) => console.log(
//         //     item.name,
//         //     item.age
//         // ));
//     }catch(error){
//     console.log(error);
//     }
// } 

// const updateDoc = async () => {
//     //con
// }
//export {getAllDoc, createDoc};
export default userModel;