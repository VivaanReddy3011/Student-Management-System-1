import { useEffect,useState } from "react";

function App()
{
  const [name,setN]=useState("");
  const [branch,setB]=useState("");
  const [year,setY]=useState("");

  const [message,setM]=useState("");

  async function registerS()
  {
    const response=await fetch("http://localhost:3000/api/register",{
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

  const [editing, setEId] = useState(null);
  function startE(student)
  {
    setN(student.name);
    setB(student.branch);
    setY(student.year);
    setEId(student.id)
  }

  const [student,setS]=useState([]);

  async function fetchS()
  {
    const response=await fetch("http://localhost:3000/api/students");

    const data=await response.json();
    setS(data);
  };

    useEffect(()=>{
      fetchS();
    },[]);

  return(
    <>
    <div>
      <h1>student management system</h1>
      <input type="text" placeholder="Name"
      value={name} onChange={(e)=>{setN(e.target.value);}}/>

      <input type="text" placeholder="Branch"
      value={branch} onChange={(e)=>{setB(e.target.value);}}/>

      <input type="number" placeholder="Year"
      value={year} onChange={(e)=>{setY(e.target.value);}}/>

    <button onClick={editing?updateS:registerS}>
    {editing?"Update Student":"Register Student"}
    </button>

    <p>{message}</p>

    <table>
      <thead>
        <tr>
          <th>S.No</th>
          <th>Id</th>
          <th>Name</th>
          <th>Branch</th>
          <th>Year</th>
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
              <button onClick={()=>startE(stud)}>Edit</button>
            </td>
            <td>
              <button onClick={()=>delS(stud.id)}>Delete</button>
            </td>
            </tr>);
          })
      }
      </tbody>
      </table>
    </div>
    </>    
  )
}

export default App;