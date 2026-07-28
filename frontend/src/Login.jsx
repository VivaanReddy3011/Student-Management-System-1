import {useEffect,useState} from "react";

function Login({setLog})
{   
    const [choice,setC]=useState(true);

    const [email,setE]=useState("");
    const [user,setU]=useState("");
    const [pass,setP]=useState("");
    
    const [message,setM]=useState("");//Operation Message

    //Login Check
    async function Check1()
    {
        const response= await fetch("http://localhost:3000/api/auth/login",{
            method:"POST",
            headers:
            {
                "Content-Type":"application/json"
            },
            body:JSON.stringify({user,pass})
        })
        const data=await response.json();
        if(response.ok)
        {
            setLog(true);
        }
        setM(data.message);
    }

    //Registration Check
    async function Check2()
    {
        const response= await fetch("http://localhost:3000/api/auth/register",{
            method:"POST",
            headers:
            {
                "Content-Type":"application/json"
            },
            body:JSON.stringify({email,user,pass})
        })
        const data=await response.json();
        if(response.ok)
        {
            setE("");
            setU("");
            setP("");
            setC(true);
        }
        setM(data.message);
    }
    
    //Taking Inputs
    return(
    <>
        <div className="login-container">
        <div className="login-card">
        <h1>Student Management System</h1>
        <h2>{choice ? "Login" : "Register"}</h2>
            {choice?(<>
                    <label>Username</label>
                    <input className="input-field" placeholder="John Doe" type="text" value={user} onChange={(e)=>(setU(e.target.value))}/>
                    <label>Password</label>
                    <input className="input-field" placeholder="enter your password" type="password" value={pass} onChange={(e)=>(setP(e.target.value))}/>
                    <button className="primary-btn" onClick={Check1}>Login</button> 
                    <p>Don't Have a Account?</p>
                    <button className="link-btn" onClick={()=>setC(false)}>Register</button>
                    </>)
                    :(<>
                    <label>Email</label>
                    <input className="input-field" placeholder="Enter Email" type="text" value={email} onChange={(e)=>(setE(e.target.value))}/>
                    <label>Username</label>
                    <input className="input-field" placeholder="John Doe" type="text" value={user} onChange={(e)=>(setU(e.target.value))}/>
                    <label>Password</label>
                    <input className="input-field" placeholder="enter password" type="password" value={pass} onChange={(e)=>(setP(e.target.value))}/>
                    <button className="primary-btn" onClick={Check2}>Register</button>
                    <p>Already have a Account?</p>
                    <button className="link-btn" onClick={()=>setC(true)}>Login</button>
                    </>)}
                <p className="message">{message}</p>
        </div>
        </div>
    </>
    );
}

export default Login;