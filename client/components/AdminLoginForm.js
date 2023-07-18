import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

const AdminLoginForm = () => {

   const navigate=useNavigate();

   const [emailError, setEmailError] = useState('');
   const [passError, setPassError] = useState('');
   
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');

  const handleSubmission=async(e)=>{
    e.preventDefault();

    const res=await fetch('http://localhost:3000/signinAdmin',{
      method:"POST",
      credentials: 'include',
      headers:{
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(
        {email,password}
      )
    });

    const data=await res.json();

    if(data.message==="Logged in successfully"){
      console.log(data);
       console.log("Admin Login Successfull")
       
       navigate('/AdminPage');
       window.alert("Admin logged in successfully")

     }else{ 
      console.log(data);
         window.alert("Invalname Credentials")

    }
  }

  const handleEmailChange=(e)=>{
     if (!validateEmail(e.target.value)) {
      setEmail(e.target.value);
      setEmailError('Invalid email format');
    } else {
      setEmailError('');
      setEmail(e.target.value);
    }
  };
  const handlePasswordChange=(e)=>{
       if(e.target.value==='') {
        setPassword(e.target.value);
        setPassError('Field cannot be empty');
       }else{
        setPassError('');
        setPassword(e.target.value);
       }
  }
  const validateEmail = (email) => {
    // Use a regular expression to validate the email format
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  return (
    <div className="row formLoginWrapper">


      <div className="col-lg-9">


        <form>


          <h2 className='display-6 font-weight-bold' >Admin Login</h2>


          <div className="form-floating p-2">
            <input type="email" className="form-control" name="email" placeholder="name@example.com" onChange={handleEmailChange}  style={{ borderColor: emailError ? 'red' : 'green' }}/>
            <label htmlFor="email">Email</label>
            {emailError && <div style={{ color: 'red' ,textAlign:'left'}}>{emailError}</div>}
          </div>


          <div className="form-floating p-2">
            <input type="password" className="form-control" name="password" placeholder='Password' onChange={handlePasswordChange} style={{ borderColor: passError ? 'red' : 'green' }}/>
            <label htmlFor="password">Password</label>
            {passError && <div style={{ color: 'red' ,textAlign:'left'}}>{passError}</div>}
          </div>


          <button type="submit" className="btn btn-primary" onClick={handleSubmission}>Login</button>


        </form>


      </div>


    </div>
  );
};

export default AdminLoginForm;
