import {useEffect,useState} from "react";
export default Login;

function Login({setLog})
{   
    const [choice,setC]=useState(true);

    const [email,setE]=useState("");
    const [user,setU]=useState("");
    const [pass,setP]=useState("");
    
    async function Check1()
    {
        const response=fetch("http://localhost:3000/api/loginUser",{
            method:"POST",
            headers:
            {
                "Content-Type":"application/json"
            },
            body:JSON.stringify({user,pass})
        })
    }

    async function Check2()
    {
        const response=fetch("http://localhost:3000/api/registerUser",{
            method:"POST",
            headers:
            {
                "Content-Type":"application/json"
            },
            body:JSON.stringify({email,user,pass})
        })
    }
    
    return (
    <>
        <div>
            {choice?(<>
                    <p>Username</p>
                    <input placeholder="John Doe" type="text" onChange={setU((e)=>(e.target.value))}/>
                    <p>Password</p>
                    <input placeholder="enter your password" type="text" onChange={setP((e)=>(e.target.value))}/>
                    <button onClick={()=>Check1()}>Login</button> 
                    <p>Don't Have a Account?</p>
                    <button onClick={()=>setC(false)}>Register</button>
                    </>)
                    :(<>
                    <p>Email</p>
                    <input placeholder="Enter Email" type="text" onChange={setE((e)=>(e.target.value))}/>
                    <p>Username</p>
                    <input placeholder="John Doe" type="text" onChange={setU((e)=>(e.target.value))}/>
                    <p>Password</p>
                    <input placeholder="enter password" type="text" onChange={setP((e)=>(e.target.value))}/>
                    <button  onClick={()=>Check2()}>Register</button>
                    <p>Already have a Account?</p>
                    <button onClick={()=>setC(true)}>Login</button>
                    </>)}
        </div>
    </>
    );
}