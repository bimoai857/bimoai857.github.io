import apiClient from "../../../axios/apiClient";

const logout=document.getElementById('logout') as HTMLButtonElement;

logout.addEventListener('click',async (e)=>{
    e.preventDefault();
    const response=await apiClient.get('/auth/logout');
   if(response.data.status===200){
    window.location.href = "/index.html/";
   }
})

