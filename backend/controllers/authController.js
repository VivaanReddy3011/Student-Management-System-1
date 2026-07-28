import {addAccount,checkLogin,findAccountByEmail,getA} from "../data/accounts.js";

export function addA(req, res) {
    const {email,user,pass} = req.body;

    if (!email || !user || !pass) {
        return res.status(400).json({
            message: "All fields are required."
        });
    }

    if (findAccountByEmail(email)) {
        return res.status(409).json({
            message: "An account with this email already exists."
        });
    }

    const account = addAccount(req.body);

    res.status(201).json({
        message: "Account created successfully."
    });
}

export function checkL(req,res) {
    const {user,pass}=req.body;

    if(!user||!pass){
        return res.status(400).json({
            message: "username or password are required."
        });
    }

    const account=checkLogin(user,pass);

    if(!account){
        return res.status(401).json({
            message: "Invalid username or password."
        });
    }

    res.status(200).json({
        message: "Login successful.",
        account
    });
}

export function show(req, res)
{
    res.status(200).json(getA());
}