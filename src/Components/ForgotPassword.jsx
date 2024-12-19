import { useRef, useState } from "react";
import BASE_URL from "../utils/Constant";
import { useNavigate } from "react-router-dom";

const ForgotPassword=()=>{
    const navigate=useNavigate();
    const emailRef=useRef();
    const [successful,setSuccessful]=useState(false);
    const [failed,SetFailed]=useState(false);
    const onClickHandler=async(e)=>{
        e.preventDefault()
        SetFailed(false);
        const email=emailRef.current.value;
        console.log(email)
        const res=await fetch(`${BASE_URL}/api/v1/user/forgotPassword`,{
            method:"POST",
            body:JSON.stringify({email}),
            headers:{
                "Content-Type":"application/json"
            }
        });

        if(!res.ok){
            SetFailed(true)
            return;
        }
        setSuccessful(true);
        setTimeout(()=>{
            navigate("/");
        },4000)

        
    }
    return(
        <div className="flex flex-1 justify-center items-center">
            <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="current-email"
                  required
                  ref={emailRef}
                  placeholder="Email"
                  className="block w-full rounded-md border-0 px-4 py-1.5 bg-transparent outline-none text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
                />
                 <button
                 onClick={onClickHandler}
                 type="submit"
                className="flex w-full justify-center rounded-md bg-teal-500 hover:bg-teal-600 text-white px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
              {successful && <p className="text-teal-500">Successfully sent the link to email</p>}
              </div>
        </div>
    )
}

export default ForgotPassword;