import Home from "./views/ts/Home.ts";
import Login from "./views/dist/Login.js";
import Signup from "./views/dist/Signup.js";

const navigateTo=url=>{
    history.pushState(null,null,url);
    router();
}

const router=async()=>{
    const routes=[
        {path:'/',view:Home},
        {path:'/signup',view:Signup},
        {path:'/login',view:Login}
    ];

    // Test each route for potential match
    const potentialMatches=routes.map((route)=>{
        return {
            route:route,
            isMatch:location.pathname=== route.path
        }
    })

    let match=potentialMatches.find((potentialMatch)=>potentialMatch.isMatch);

    if(!match){
        match={
            route:routes[0],
            isMatch:true
        }
    }

    const view= new match.route.view();

    document.querySelector('#body').innerHTML=await view.getHtml();

}

window.addEventListener("popState",router);

document.addEventListener('DOMContentLoaded',()=>{
    document.body.addEventListener("click",e=>{
        if(e.target.matches("[data-link]")){
            e.preventDefault();
            navigateTo(e.target.href);
        }
    })
    router();
})