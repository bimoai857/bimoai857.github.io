import apiClient from "../../../axios/apiClient";
import { redirectIfAuth } from "../../../utils/auth";

let signUpInfo={
    firstName:"",
    lastName:"",
    userName:"",
    password:"",
    latitude:0,
    longitude:0
  }


const firstName=document.getElementById('firstName') as HTMLInputElement;
const lastName=document.getElementById('lastName') as HTMLInputElement;
const userName=document.getElementById('userName') as HTMLInputElement;
const password=document.getElementById('password') as HTMLInputElement;
const signup=document.getElementById('signup') as HTMLButtonElement;

firstName?.addEventListener('input',(e)=>{
    signUpInfo={
        ...signUpInfo,
        firstName: (e.target as HTMLInputElement).value
    }
    console.log(signUpInfo)
})

lastName?.addEventListener('input',(e)=>{
    signUpInfo={
        ...signUpInfo,
        lastName: (e.target as HTMLInputElement).value
    }
    console.log(signUpInfo)

})

userName?.addEventListener('input',(e)=>{
    signUpInfo={
        ...signUpInfo,
        userName: (e.target as HTMLInputElement).value
    }
    console.log(signUpInfo)

})

password?.addEventListener('input',(e)=>{
    signUpInfo={
        ...signUpInfo,
        password: (e.target as HTMLInputElement).value
    }
    console.log(signUpInfo)

})

const onSubmit=async():Promise<void>=>{
    const data = await apiClient.post('/auth/signup', signUpInfo);
    if(data.status===200) {
        window.location.href="/src/pages/dashboard/"
    }
    console.log(data);
}

signup.addEventListener('click',(e)=>{
    e.preventDefault();
    onSubmit();
}
)
redirectIfAuth();