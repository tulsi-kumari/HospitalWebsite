import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import PatientProfile from '../Header/PatientProfile'

const PatientPage = () => {

  const navigate=useNavigate();

  const[patientInfo,setPatientInfo]=useState({});

  const checkPatient=async()=>{
    try{

      const res=await fetch('http://localhost:3000/patientPage',{
        method:"GET",
        headers:{
          Accept:'application/json',
          'Content-Type': 'application/json'
        },
        credentials:"include"
      })

    const data=await res.json();
    setPatientInfo(data.data);
    

    if(data.message!=="user is verified patient"){
        navigate('/AccessDenied');
        
    }

    }catch(err){

         console.log(err);

    }
  }
  
  useEffect(()=>{
     checkPatient();
  },[]);

    useEffect(() => {
}, [patientInfo]);
  

  return (
    <div><PatientProfile user={patientInfo}/></div>
  )
}

export default PatientPage

