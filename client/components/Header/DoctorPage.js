import React,{useEffect,useState} from 'react';
import { useNavigate } from 'react-router-dom';
import PateintRegister from '../PateintRegister'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';
import AllPatients from './AllPatients';

const DoctorPage = () => {
  
  const navigate=useNavigate();
  const[patients,setPatients]=useState([]);

  const checkDoctor=async()=>{
    try{

      const res=await fetch('http://localhost:3000/doctorPage',{
        method:"GET",
        headers:{
          Accept:'application/json',
          'Content-Type': 'application/json'
        },
        credentials:"include"
      })

    const data=await res.json();

    if(data.message!=="user is verified doctor"){
        navigate('/AccessDenied');
    }else{

      try {
        const response = await axios.get('http://localhost:3000/getAllPatients');
        console.log(response.data);
        setPatients(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }


    }

    }catch(err){
         console.log(err);

    }
  }
  
  useEffect(()=>{
     checkDoctor();
  },[]);

  useEffect(() => {
}, [patients]);
  

  return (
    <div className="row bodyContainer d-flex align-items-center justify-content-center ">
              
              <div className='col-lg-6'>
                <Container className="d-flex align-items-center justify-content-center ">
                   <Row>
                     <Col className="text-center">
                       <h1 className="display-6 font-weight-bold">Patient data</h1>
                        <div>
                          
                              <table class="table table-striped table-bordered table-hover table-responsive-sm table-responsive-md table-responsive-lg table-responsive-xl">
                                  <thead>
                                  <tr class="table-active">
                                      <th scope="col">#</th>
                                      <th scope="col">Username</th>
                                      <th scope="col">Email</th>
                                      <th scope="col">Address</th>
                                      <th scope="col">Contact</th>
                                      <th scope="col">Age</th>
                                      <th scope="col">disease</th>
                                  </tr>
                                  </thead>
                                  <tbody>
                                        <AllPatients patients={patients}/>
                                  </tbody>
                              </table>

                           
                        </div>

                     </Col>
                   </Row>
                 </Container>
              </div>
              <div className='col-lg-6'>
                 <PateintRegister/>
              </div>
          
    </div>
  )
}
// 

export default DoctorPage

