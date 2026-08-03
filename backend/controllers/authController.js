import Account from "../models/account.js";

export async function addA(req,res)
{
    try
    {
    const {email,pass}=req.body;

    if (!email || !pass) {
        return res.status(400).json({
            message: "All fields are required."
        });
    }

    const existingA = await Account.findOne({email});

    if(existingA){
        return res.status(409).json({
            message: "An account with this email already exists."
        });
    }

    const account = await Account.create({
        email,
        pass
    });

    res.status(201).json({
        message: "Account created successfully."
        });
    }
    catch(error)
    {
        if(error.name === "ValidationError") 
            {
                return res.status(400).json({
                    message: error.message
                });
            }
            
        res.status(500).json({
            message:error.message
        });
    }
}

export async function checkL(req,res){
    try
    {
    const {email,pass}=req.body;

    if(!email||!pass){
        return res.status(400).json({
            message: "email or password are required."
        });
    }

    const account= await Account.findOne({email,pass});

    if(!account){
        return res.status(401).json({
            message: "Invalid email or password."
        });
    }

        res.status(200).json({
            message: "Login successful.",
            account
        });
    }
    catch(error){
    
        res.status(500).json({
            message: error.message
        });
    }
}

export async function show(req, res)
{
    try
    {
        const accounts= await Account.find();
        res.status(200).json(accounts);
    }
    catch(error)
    {
        res.status(500).json({
            message:error.message
        })
    }
}