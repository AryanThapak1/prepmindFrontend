import { redirect } from "react-router-dom";

const getToken=()=>{
  const token=sessionStorage.getItem('token');
  return token;
}
const checkToken=()=>{
  if(getToken())
  {
    return true;
  }

  return false;
}
export function loader(){
   
  if(!checkToken())
   {
    return redirect('/');
   }

   else{
    return true;
   }
}