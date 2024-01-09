const route=(event)=>{
    event=event || window.event;
    event.preventDefault();
    window.history.pushState({},"",event.target.href);
    handleLocation();
};

const routes={
    404:"frontend/component/pages/404.html",
    '/':"frontend/component/pages/home.html",
    '/signup':"frontend/component/pages/signup.html",
    '/login':"frontend/component/pages/login.html"
}

const handleLocation=async()=>{
    const path=window.location.pathname;
    const route=routes[path]|| routes[404];
    const html=await fetch(route).then((data)=>data.text());
    document.getElementById("body").innerHTML=html;
}

window.onpopstate=handleLocation;
window.route=route;

handleLocation();