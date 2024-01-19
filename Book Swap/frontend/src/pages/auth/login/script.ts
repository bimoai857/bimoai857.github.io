import apiClient from "../../../axios/apiClient";

let loginInfo={
    userName:"",
    password:""
}

const userName=document.getElementById('userName') as HTMLInputElement;
const password=document.getElementById('password') as HTMLInputElement;
const login=document.getElementById('login') as HTMLButtonElement;

userName?.addEventListener('input',(e)=>{
    loginInfo={
        ...loginInfo,
        userName: (e.target as HTMLInputElement).value
    }
    console.log(loginInfo)

})

password?.addEventListener('input',(e)=>{
    loginInfo={
        ...loginInfo,
        password: (e.target as HTMLInputElement).value
    }
    console.log(loginInfo)

})

const onSubmit=async():Promise<void>=>{
    const response = await apiClient.post('/auth/login', loginInfo);
    
    if(response.data.status===200) {
        window.location.href="/src/pages/user/dashboard/"
       
    }
  
}

login.addEventListener('click',(e)=>{
    e.preventDefault();
    onSubmit();
})