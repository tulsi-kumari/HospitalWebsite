import React,{useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import {useNavigate} from 'react-router-dom';

const AdminRegistration = () => {
  const navigate=useNavigate();

  const [userError, setUserError] = useState('');
  const [passError, setPassError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');  
  const [ageError, setAgeError] = useState('');
  const [conpassError, setConPassError] = useState('');
   
  const [user,setUser]=useState({
    username:"",
    email:"",
    password:"",
    cpassword:"",
    age:"",
    address:"adminaddress",
    contact:""
  })

    let n;
  let value;
  const handleInputs=(e)=>{
      n=e.target.name;
      value=e.target.value;


      if(n==='email'){
        if(validateEmail(value)){
           setEmailError('');
        }else{
           setEmailError('Please enter a valid email!!')
        }
      }
      if(n==='password'){
         if(validatePassword(value)){
            setPassError('');
         }else{
            setPassError("Password must contain only alphanumeric characters with atleast one numerical character!!")
         }
      }
      if(n==='cpassword'){
           if(value===user.password){
              setConPassError('');
           }else{
              setConPassError("Both passwords must match!!");
           }
      }
      if(n==='age'){
           if(validateAge(value)){
               setAgeError('');
           }else{
               setAgeError('Age must be in appropriate range!!');
           }
      }
      if(n==='contact'){
          if(validateContact(value)){
              setPhoneError('');
          }else{
              setPhoneError("Phone number must be exactly ten digits!!");
          }
      }
      if(n==='username'){
          if(validateUserName(value)){
             setUserError('');
          }else{
              setUserError("Not a valid Username!!Must contain atleast one digit");
          }
      }     

      setUser({
        ...user,
        [n]:value
      })
  }
  const validateEmail = (email) => {
    // Use a regular expression to validate the email format
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };
  const validatePassword=(password)=>{
    const passRegex=/^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]+$/i;
    return passRegex.test(password);
  }
  const validateContact=(contact)=>{
    const contactRegex=/^[1-9]\d{9}$/i;
    return contactRegex.test(contact);
  }
  const validateAge=(age)=>{
    const ageRegex=/^(?:0?[1-9]|[1-9][0-9]|1[01][0-9]|120)$/i;
    return ageRegex.test(age);
  }
  const validateUserName=(username)=>{
    const usernameRegex=/^[a-zA-Z0-9]+$/i;
    return usernameRegex.test(username);
  }




  const postData=async(e)=>{
     e.preventDefault();
    const {username,email,password,cpassword,address,contact,age}=user;
    const res=await fetch('http://localhost:3000/registerAdmin',{
      method:"POST",
      headers:{
         'Content-Type': 'application/json'
      },
      body: JSON.stringify({
      username,email,password,cpassword,address,age,contact
    })
  });

    const data=await res.json();

    if(data.message==="Admin registered successfully"){
       console.log("Registration Successfull")
       window.alert("Admin registered successfully")
                navigate('/AdminPage');
     }else{ 
      console.log(data);
         window.alert("Invalid Credentials")

    }
  }

  return (
     <div className="row formWrapper border p-4">


      <div className="col-lg-9">


        <form>


          <h2 className='display-6 font-weight-bold'>Admin Registration</h2>


          <div className="form-floating p-2">
            <input type="text" className="form-control" name="username" placeholder='User Name' onChange={handleInputs} style={{ borderColor: userError ? 'red' : 'green' }}/>
            <label htmlFor="username" >Userame</label>
            {userError && <div style={{ color: 'red' ,textAlign:'left'}}>{userError}</div>}
          </div>


          <div className="form-floating p-2">
            <input type="email" className="form-control" name="email" placeholder="name@example.com" onChange={handleInputs} style={{ borderColor: emailError ? 'red' : 'green' }}/>
            <label htmlFor="email">Email</label>
            {emailError && <div style={{ color: 'red' ,textAlign:'left'}}>{emailError}</div>}
          </div>


          <div className="form-floating p-2">        
              <input type="tel" className="form-control" name="contact"  placeholder='Phone Number' onChange={handleInputs} style={{ borderColor: phoneError ? 'red' : 'green' }}/>
              <label htmlFor="contact">Phone Number</label>
              {phoneError && <div style={{ color: 'red' ,textAlign:'left'}}>{phoneError}</div>}
          </div>

           
           <div className="form-floating p-2">
            <input type="number" name='age' min="0" max="120" className="form-control" placeholder='Age' onChange={handleInputs} style={{ borderColor: ageError ? 'red' : 'green' }}/>
            <label htmlFor="age">Age</label>
            {ageError && <div style={{ color: 'red' ,textAlign:'left'}}>{ageError}</div>}
          </div>


          {/* <div className="form-floating p-2">
            <input type="text" className="form-control" name="address" placeholder='Address' onChange={handleInputs} />
            <label htmlFor="address">Address</label>
          </div> */}


          <div className="form-floating p-2">
            <input type="password" className="form-control" name="password" placeholder='Password' onChange={handleInputs} style={{ borderColor: passError ? 'red' : 'green' }}/>
            <label htmlFor="password">Password</label>
            {passError && <div style={{ color: 'red' ,textAlign:'left'}}>{passError}</div>}
          </div>


          <div className="form-floating p-2">
            <input type="password" className="form-control" name="cpassword" placeholder='Confirm Password' onChange={handleInputs} style={{ borderColor: conpassError ? 'red' : 'green' }}/>
            <label htmlFor="cpassword">Confirm Password</label>
            {conpassError && <div style={{ color: 'red' ,textAlign:'left'}}>{conpassError}</div>}
          </div>


          <button type="submit" className="btn btn-primary p-2" onClick={postData}>Register</button>


        </form>


      </div>


    </div>
  )
}

export default AdminRegistration