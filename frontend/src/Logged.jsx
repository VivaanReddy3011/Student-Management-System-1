import {useEffect,useState} from "react";

function Logged({setLog})
{
  const [name,setN]=useState("");//Parameter 1
  const [branch,setB]=useState("");//Parameter 2
  const [year,setY]=useState("");//Parameter 3

  const [message,setM]=useState("");//Operation Message

  const [student,setS]=useState([]);//Read

  //Create
  async function registerS()
  {
    const response=await fetch("http://localhost:3000/api/students",{
      method:"POST",
      headers:
      {
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        name,branch,year,})
        })
    const data=await response.json();

    if (response.ok){
      setN(""); setB(""); setY("");
      fetchS();
    }
      setM(data.message);
  }

  //Read
  async function fetchS()
  {
    const response=await fetch("http://localhost:3000/api/students");

    const data=await response.json();
    setS(data);
  };

    useEffect(()=>{
      fetchS();
    },[]);

  //Update
  async function updateS()
  {
    const response=await fetch(`http://localhost:3000/api/students/${editing}`,{
      method:"PUT",
      headers:
      {
        "Content-Type":"application/json"
      },
      body:JSON.stringify({name,branch,year,})
  })
    const data=await response.json();

    if (response.ok){
      setN(""); setB(""); setY("");
      setEId(null);
    }
      setM(data.message);
      fetchS();
  }

  //Delete
  async function delS(id)
  {
    const response=await fetch(`http://localhost:3000/api/students/${id}`,{
      method:"DELETE"
    });
    const data=await response.json();
    if (response.ok){
      fetchS();
    }
      setM(data.message);
  }

  //Switch Operation
  const [editing, setEId] = useState(null);
  function startE(student)
  {
    setN(student.name);
    setB(student.branch);
    setY(student.year);
    setEId(student.id)
  }

  return(
    <>
    <div className="dashboard">
      <header className="header">
      <h1>student management system</h1>
      <button className="logout-btn" onClick={()=>setLog(false)}>Logout</button>
      </header>

      <div className="content">
        <div className="form-card">
        <h2>Register Student</h2>
      <input className="input-field" type="text" placeholder="Name"
      value={name} onChange={(e)=>{setN(e.target.value);}}/>

      <input className="input-field" type="text" placeholder="Branch"
      value={branch} onChange={(e)=>{setB(e.target.value);}}/>

      <input className="input-field" type="number" placeholder="Year"
      value={year} onChange={(e)=>{setY(e.target.value);}}/>

      <button className="primary-btn" onClick={editing?updateS:registerS}>
      {editing?"Update Student":"Register Student"}
      </button>
      
    <p className="message">{message}</p>
    </div>
    
    <div className="table-card">
      <h2>Students</h2>
      <table className="student-table">
      <thead>
        <tr>
          <th>S.No</th>
          <th>Id</th>
          <th>Name</th>
          <th>Branch</th>
          <th>Year</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
      { 
      student.map((stud,index)=>{
        return(
            <tr key={stud.id}>
            <td>{index + 1}</td>  
            <td>{stud.id}</td>
            <td>{stud.name}</td>
            <td>{stud.branch}</td>
            <td>{stud.year}</td>
            <td>
              <button className="edit-btn" onClick={()=>startE(stud)}>Edit</button>
              <button className="delete-btn" onClick={()=>delS(stud.id)}>Delete</button>
            </td>
            </tr>);
          })
      }
      </tbody>
      </table>
            </div>
          </div>
        </div>
    </>    
  )
}

export default Logged;