import { ObjectId } from "mongodb";
export default interface Trial {
  _id?: ObjectId;
  to: string;
  from: string;
  text: string;
}
