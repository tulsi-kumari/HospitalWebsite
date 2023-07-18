import React,{useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import AdminRegistration from '../AdminRegistration';
import DoctorRegistration from '../DoctorRegistration';
import PateintRegister from '../PateintRegister';
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';
import AllPatients from './AllPatients';
import AllAdmins from './AllAdmins';
import AllDoctors from './AllDoctors';

const AdminPage = () => {

  const navigate=useNavigate();
  const[patients,setPatients]=useState([]);
  const[admins,setAdmins]=useState([]);
  const[doctors,setDoctors]=useState([]);

  const checkAdmin=async()=>{
    try{

      const res=await fetch('http://localhost:3000/adminPage',{
        method:"GET",
        headers:{
          Accept:'application/json',
          'Content-Type': 'application/json'
        },
        credentials:"include"
      })

    const data=await res.json();
    console.log(data);

    if(data.message!=="user is verified admin"){
        navigate('/');
        if(data.message!=="user is verified doctor"){
        navigate('/AccessDenied');
        
    }
  }else{

      try {
        const responsePatient = await axios.get('http://localhost:3000/getAllPatients');
        console.log(responsePatient.data);
        setPatients(responsePatient.data);

        const responseDoctor = await axios.get('http://localhost:3000/getAllDoctors');
        console.log(responseDoctor.data);
        setDoctors(responseDoctor.data);

        const responseAdmin = await axios.get('http://localhost:3000/getAllAdmins');
        console.log(responseAdmin.data);
        setAdmins(responseAdmin.data);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
        
    }

    }catch(err){

         console.log(err);

    }
  }
  
  useEffect(()=>{
     checkAdmin();
  },[]);
  
  useEffect(() => {
  }, [patients,admins,doctors]);


    const [selectedUserType, setSelectedUserType] = useState('');

  const handleUserTypeChange = (event) => {
    setSelectedUserType(event.target.value);
  };


  return (
    <div className="row bodyContainer ">
              
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

                 <Container className="d-flex align-items-center justify-content-center ">
                   <Row>
                     <Col className="text-center">
                       <h1 className="display-6 font-weight-bold">Doctor data</h1>
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
                                      <th scope="col">Speciality</th>
                                  </tr>
                                  </thead>
                                  <tbody>
                                        <AllDoctors doctors={doctors}/>
                                  </tbody>
                              </table>

                           
                        </div>

                     </Col>
                   </Row>
                 </Container>

                 <Container className="d-flex align-items-center justify-content-center ">
                   <Row>
                     <Col className="text-center">
                       <h1 className="display-6 font-weight-bold">Admin data</h1>
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
                                  </tr>
                                  </thead>
                                  <tbody>
                                        <AllAdmins admins={admins}/>
                                  </tbody>
                              </table>

                           
                        </div>

                     </Col>
                   </Row>
                 </Container>
      
              </div>
              <div className="col-lg-6 formLoginWrapper text-center border-p-4">
                    <div className='col-lg-6'>
                      <form>
                          <div className="form-group border p-4">
                            <h2 className='display-6 font-weight-bold' htmlFor="userType">User Type</h2>
                            <select className="form-control" id="userType" value={selectedUserType} onChange={handleUserTypeChange}>
                              <option value="">Select User Type</option>
                              <option value="doctor">Doctor</option>
                              <option value="admin">Admin</option>
                              <option value="patient">Patient</option>
                            </select>
                          </div>
                      </form> 
                    </div>
                    <div className='col-lg-12'>
                       {selectedUserType===''  && (<PateintRegister/>)} 
                       {selectedUserType === 'doctor' && ( <DoctorRegistration />)}
             
                       {selectedUserType === 'admin' && ( <AdminRegistration />)}
             
                       {selectedUserType === 'patient' && (<PateintRegister />)}
                    </div>
              </div>
          
      </div>
  )
}

export default AdminPage