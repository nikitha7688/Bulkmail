import { useState } from "react";

import axios from 'axios';

import * as XLSX from "xlsx"


function App()
{

   const[msg,setmsg] = useState("")
   const[status,setstatus] = useState(false)
   const [emailList,setEmailList] = useState([])


   function handlemsg(evt)
   {
    setmsg(evt.target.value)
   }

   function send()
   {
     setstatus(true)
     axios.post("http://localhost:5000/sendemail",{msg:msg,emailList:emailList})
     .then(function(data)
    {
       if(data.data === true)
       {
        alert("Email Sent SuccessFully !")
        setstatus(false)
       }
       else{
        alert("Failed !")
       }
    })
   }

   function handlefile(event)
   {

    const file = event.target.files[0]
    console.log(file)
    const reader = new FileReader()

    reader.onload = function(event){
        const data = event.target.result;
        const workbook = XLSX.read(data, {type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const emailList = XLSX.utils.sheet_to_json(worksheet, {header:"A"})
        const totalemail = emailList.map(function(item){return item.A})
        console.log(totalemail)
        setEmailList(totalemail)
        

    };

    reader.readAsBinaryString(file);
    
     
   }


  return(
    <>
    <div className="card">

    <div className="card-1">
      <h1 className="h1">BulkMail</h1>
    </div>

    <div className="card-2">
      <h1 className="h1">We can help your business with sending multiple emails at once</h1>
    </div>

    <div className="card-3">
      <h1 className="h1">Drag and Drop</h1>
    </div>

    <div className="card-4">
      <textarea  onChange={handlemsg}  value={msg} placeholder="Enter the email text..."></textarea>
    </div>

    <div>
      <input  onChange={handlefile}  type="file"></input>
      
    </div>

    <p>Total Email in the file: {emailList.length}</p>
    <div>
      <button  onClick={send}  className="button">{status?"Sending...":"Send"}</button>
    </div>
    </div>
    </>
  )
}

export default App ;