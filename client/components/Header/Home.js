import React,{useState} from 'react'
import AdminLoginForm from '../AdminLoginForm';
import DoctorLoginForm from '../DoctorLoginForm';
import PatientLoginForm from '../PatientLoginForm';
import PateintRegister from '../PateintRegister';
import 'bootstrap/dist/css/bootstrap.css';
const Home = () => {


  const [selectedUserType, setSelectedUserType] = useState('');

  const handleUserTypeChange = (event) => {
    setSelectedUserType(event.target.value);
  };


  return (
     <div className="row bodyContainer ">
              <div className='col-lg-6'>
                    <PateintRegister/>
              </div>
              <div className="col-lg-6 formLoginWrapper text-center border-p-4">
                    <div className='col-lg-6'>
                      <form>
                          <div className="form-group border p-4">
                            <h2 htmlFor="userType" className='display-6 '>User Type</h2>
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
                       {selectedUserType===''  && (<PatientLoginForm/>)} 
                       {selectedUserType === 'doctor' && ( <DoctorLoginForm />)}
             
                       {selectedUserType === 'admin' && ( <AdminLoginForm />)}
             
                       {selectedUserType === 'patient' && (<PatientLoginForm />)}
                    </div>
              </div>
              
          
      </div>
   
  )
};

export default Home