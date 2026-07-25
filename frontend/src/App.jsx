import {useEffect,useState} from "react";
import Logged from './Logged.jsx'
import Login from './Login.jsx'

function App()
{
  const [log,setL]=useState(false);

  return(
    <>
      {(log)?<Logged setLog={setL}/>:<Login setLog={setL}/>}
    </>  
  )
}

export default App;