import apiClient from "../axios/apiClient";

export const redirectIfAuth =async () => {
   
    const response = await apiClient.get('/auth/me');
      
    if (response.data.status === 200) {
            window.location.href = `/src/pages/user/dashboard/`;
    }
        
    document.body.style.display = "block"; 

};

