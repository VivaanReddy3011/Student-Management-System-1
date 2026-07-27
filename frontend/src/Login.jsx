import {useEffect,useState} from "react";
export default Login;

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
            setLog(true);
        }
        setM(data.message);
    }
    
    //Taking Inputs
    return(
    <>
        <div>
            {choice?(<>
                    <p>Username</p>
                    <input placeholder="John Doe" type="text" value={user} onChange={(e)=>(setU(e.target.value))}/>
                    <p>Password</p>
                    <input placeholder="enter your password" type="text" value={pass} onChange={(e)=>(setP(e.target.value))}/>
                    <button onClick={Check1}>Login</button> 
                    <p>Don't Have a Account?</p>
                    <button onClick={()=>setC(false)}>Register</button>
                    </>)
                    :(<>
                    <p>Email</p>
                    <input placeholder="Enter Email" type="text" value={email} onChange={(e)=>(setE(e.target.value))}/>
                    <p>Username</p>
                    <input placeholder="John Doe" type="text" value={user} onChange={(e)=>(setU(e.target.value))}/>
                    <p>Password</p>
                    <input placeholder="enter password" type="text" value={pass} onChange={(e)=>(setP(e.target.value))}/>
                    <button  onClick={Check2}>Register</button>
                    <p>Already have a Account?</p>
                    <button onClick={()=>setC(true)}>Login</button>
                    </>)}
                <p>{message}</p>
        </div>
    </>
    );
}