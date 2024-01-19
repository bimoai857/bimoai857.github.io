// import { redirectIfAuth } from "../../../utils/auth";

import apiClient from "../../../axios/apiClient";
import '../../../../../frontend/style.css'
// redirectIfAuth();

const content= document.querySelector('#content > div > div') as HTMLDivElement;

const getHtml=  (book:any)=>{
    return `
    <!-- Card 1 -->
    <a class="rounded-sm w-1/2 grid grid-cols-12 bg-white shadow p-3 gap-2 items-center hover:shadow-lg transition delay-150 duration-300 ease-in-out hover:scale-105 transform" href="#">
      
      <!-- Icon -->
      <div class="col-span-12 md:col-span-1">
      
      </div>
      
      <!-- Title -->
      <div class="col-span-11 xl:-ml-5">
        <p class="text-blue-600 font-semibold"> ${book.title} </p>
      </div>
      
      <!-- Author -->
      <div class="md:col-start-2 col-span-11 xl:-ml-5">
        <p class="text-sm text-gray-800 font-light"> By ${book.author} </p>
      </div>
    </a> 
    `
}


const getBooks=async()=>{

    const response=await apiClient.get('/user/getBooks');
    if(response.status===200){
        const books=response.data.books;
    
        books.forEach((book: any) => {
            content.appendChild(document.createRange().createContextualFragment(getHtml(book)))
        });
    }
      
}
getBooks();
