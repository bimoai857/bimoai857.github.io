import apiClient from "../../../axios/apiClient";
import "../../../../../frontend/style.css";

const content = document.querySelector(
  "#content > div > div"
) as HTMLDivElement;

const getHtml = (swapBook: any) => {
  return `
    <!-- Card 1 -->
    <a class="rounded-sm w-1/2 grid grid-cols-12 bg-white shadow p-3 gap-2 items-center hover:shadow-lg transition delay-150 duration-300 ease-in-out hover:scale-105 transform" href="#">
      
      <!-- Icon -->
      <div class="col-span-12 md:col-span-1">
      
      </div>
      
      <!-- Title -->
      <div class="col-span-11 xl:-ml-5">
        <p class="text-blue-600 font-semibold"> ${swapBook.title} </p>
      </div>
      
      <!-- Author -->
      <div class="md:col-start-2 col-span-11 xl:-ml-5">
        <p class="text-sm text-gray-800 font-light"> You have sent a request to  to swap this book
        </p>
      </div>
    
    </a> 
    `;
};

const getNotification = async () => {
  const response = await apiClient.get("/user/getNotification");
  console.log(response);
  if (response.status === 200) {
    const notificationData = response.data.notificationData;

      const swapBooks = notificationData.swapBook;
      const notifications = notificationData.notifications;

      notifications.forEach((notification: any) => {
        const swapBook = swapBooks.find(
          (book: any) => book.id == notification.swapbookId
        );
        if(notification.code==1){
          content.appendChild(
            document.createRange().createContextualFragment(getHtml(swapBook))
          );
        }
        if(notification.code==2){
          
        }
       
      });
    }
  }


getNotification();
