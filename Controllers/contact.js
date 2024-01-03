import { Contact } from "../Model/contact.js";


const contact = async(req, res) => {
    try {
       await Contact.create({
        name: req.body.name,
        email: req.body.email,
        phoneNumber: req.body.phone,
        message: req.body.message
       })
        return res.status(201).json();
    } catch (error) {
        console.log(error)
        return res
        .status(500)
        .json({ status: false, msg: "server error" });
    }
}

export {contact};