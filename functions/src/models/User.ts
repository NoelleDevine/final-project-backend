import { ObjectId } from "mongodb";
export default interface User {
  _id?: ObjectId;
  to: string;
  from: string;
  text: string;
}
