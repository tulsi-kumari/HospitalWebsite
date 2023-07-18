import React,{useEffect} from 'react'
import { useNavigate } from 'react-router-dom';

const LogoutPage = () => {

    const navigate=useNavigate();


    const logoutfunc=async()=>{
        try{

            const res=await fetch('http://localhost:3000/logout',{
                method:"GET",
                headers:{
                   Accept:'application/json',
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            })

            const data=await res.json();

            if(data.message!=="cookie cleared"){
                if(data.message==="not a user"){
                    navigate('/');
                   setTimeout(()=>{
                   window.alert("Not a user");
                },500); 
                }else{
                   navigate('/')
                }
            }else{
                navigate('/');
                setTimeout(()=>{
                   window.alert("User Logged out");
                },500); 
            }

        }catch(err){
            console.log(err);
        }
    }

    useEffect(()=>{
      
        logoutfunc();

    },[])

  return (
    <div>LogoutPage</div>
  )
}

export default LogoutPage