import { User } from "../Model/user.js";
import bcrypt from "bcrypt";

const createUser = async(req, res) => {
    try {
        const emailCheck = await User.findOne({email:req.body.email})
        if(emailCheck){
            return res
                .status(401)
                .json({ status: false, msg: "email id already exits" });
        }
        const phoneNumberCheck = await User.findOne({phoneNumber:req.body.phoneNumber})
        if(phoneNumberCheck){
            return res
                .status(401)
                .json({ status: false, msg: "Phone Number already exits" });
        }
        const salt = await bcrypt.genSalt(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        await User.create({name:req.body.name, phoneNumber:req.body.phoneNumber, email:req.body.email, password:hash});
        return res.status(201).json();
    } catch (error) {
        console.log(error)
        return res
        .status(500)
        .json({ status: false, msg: "server error" });
    }
}


const logIn = async(req, res) => {
    try {
        const user = await User.findOne({email:req.body.email})
        if(!user){
            return res
                .status(401)
                .json({ status: false, msg: "User not found" });
        }
        const result = await bcrypt.compare(req.body.password, user.password);
        console.log(req.body, result, user);
        if (!result) {
        return res
            .status(401)
            .json({ status: false, msg: "Password does not match" });
        }
        return res.status(201).json();
    } catch (error) {
        console.log(error)
        return res
        .status(500)
        .json({ status: false, msg: "server error" });
    }
}


export {createUser, logIn};