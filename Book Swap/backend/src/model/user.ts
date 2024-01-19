import { IBook } from "../interface/book";
import { INotification } from "../interface/notification";
import BaseModel from "./baseModel";

export default class UserModel extends BaseModel {
  static async getBooks(userId: string) {
    try {
      const query = await this.queryBuilder()
        .select("book.*")
        .from("users")
        .join("book", "users.id", "=", "book.user_id")
        .where("users.id", "=", userId);
      return query;
    } catch (error) {
      throw new Error("Error Getting Books!!");
    }
  }
  static async addBook(bookDetails: IBook) {
    try {
      const query = this.queryBuilder()
        .insert(bookDetails)
        .table("book")
        .returning("*");
      return query;
    } catch (error) {
      throw new Error("Error Adding Book!!");
    }
  }
  static async sendNotification(notificationDetails: INotification) {
    try {
      const notificationData = await this.queryBuilder()
        .insert({
          notificationFrom: notificationDetails.notificationFrom,
          notificationTo: notificationDetails.notificationTo,
          swapbookId: notificationDetails.swapbookId,
        })
        .table("notification")
        .returning("*");

      const dataToInsert = notificationDetails.senderBooksList.map(
        (bookId) => ({
          bookId,
          notificationId: parseInt(notificationData[0].id),
        })
      );

      const booksListData = await this.queryBuilder()
        .insert(dataToInsert)
        .table("books_list")
        .returning("*");

      return { notificationData, booksListData };
    } catch (error) {
      throw new Error("Error Adding Book!!");
    }
  }
  static async getNotification(userId: number) {
    try {
     const query = this.queryBuilder();

      const conditions = { notification_checked: false };
      const orConditions = {
        "notification.notificationFrom": userId,
        "notification.notificationTo": userId,
      };

      const notifications = await query
        .select(
          "id",
          "notification_from",
          "notification_to",
          "swapbook_id",
          "code"
        )
        .from("notification")
        .where(conditions)
        .orWhere(orConditions);

      const swapBook = await query
        .select("book.*")
        .from("notification")
        .join("book", "notification.swapbook_id", "book.id")
        .where(conditions)
        .orWhere(orConditions);

      const booksList = await query
        .select("book.*", "notification_id")
        .from("notification")
        .join("books_list", "notification.id", "books_list.notification_id")
        .join("book", "book.id", "books_list.book_id")
        .where(conditions)
        .orWhere(orConditions);

      // const friendId=notificationData.notificationFrom==userId?notificationData.notificationTo:notificationData.notificationFrom;
      // const friend=await query.select('id','firstName','lastName').from('users').where('id','=',friendId).first();
      console.log(notifications, swapBook, booksList);
      return {
        notifications,
        swapBook,
        booksList,
      };
    } catch (error) {
      throw new Error("Error Adding Book!!");
    }
  }
}
