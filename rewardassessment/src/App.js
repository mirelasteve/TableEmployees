import React, { useState, useEffect } from 'react'
import axios from 'axios';
import EmployeeList from './table/employeelist.component';

const App = () => {
 
  const [ data, setData ] = useState([])
  useEffect( ()=>{
    const getData = async()=>{
      try{
        const res = await axios.get('/api');
        if(res.data){
        
        setData(res.data)
        }
      } catch(error){
        console.log(error)
      }
      
    }
    getData()
  },[])
 
  return (
    <div>
      {data.length
      ? <EmployeeList data={data}></EmployeeList>
      : <div>Loading</div>
    }
      
    </div>
  )
}
export default App;